<div class="content margin"
     class:content--active={active}
     aria-hidden={!active}>
  {#if $$slots.header}
    <div bind:this={header}
         style="display: none">
      <slot name="header" />
    </div>
  {/if}
  <slot />
</div>

<script lang="ts">
import { onMount, getContext } from 'svelte';
import type { TabDataType } from './index';

export let label: string;

const key = {};
let active: boolean = false;
let header: HTMLElement;

$: if (header) {
  (header.firstChild as HTMLElement)
    .removeAttribute('slot');
}

const tabsData: TabDataType = getContext('tabs');

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
</script>

<style>
.content--active {
  display: block !important;
}
</style>
