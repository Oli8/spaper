<div {...$$restProps}
     class="{$$restProps.class ?? ''} content margin"
     class:content--active={active}
     id={controlLabel}
     aria-hidden={!active}
     aria-labelledby={controlLabel}
     role="tabpanel"
     tabindex={active ? 0 : -1}>
  {#if $$slots.header}
    <div bind:this={header}
         style="display: none">
      <slot name="header" />
    </div>
  {/if}
  <slot />
</div>

<script lang="ts">
import { onMount, onDestroy, getContext } from 'svelte';
import type { TabDataType } from './utils';
import { genControlLabel } from './utils';

export let label: string;

const key = {};
let active: boolean = false;
let header: HTMLElement;

$: if (header) {
  (header.firstChild as HTMLElement)
    .removeAttribute('slot');
}

const tabsData: TabDataType = getContext('tabs');

if (!tabsData)
  throw new Error('Tab should be nested inside a Tabs');

$: tabsData.tabs.update(tabs => (
  tabs.map(t => t.key === key ? {...t, label, header } : t)
));

onMount(() => {
  tabsData.tabs.update(tabs =>
    [...tabs, {
      key,
      label,
      header,
      show: () => active = true,
      hide: () => active = false,
    }
  ]);
});

onDestroy(() => {
  tabsData.tabs.update(tabs => (
    tabs.filter(t => t.key !== key)
  ));
});

$: controlLabel = genControlLabel(label);
</script>

<style>
.content--active {
  display: block !important;
}
</style>
