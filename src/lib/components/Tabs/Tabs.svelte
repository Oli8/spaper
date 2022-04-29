<div {...$$restProps}
     class={`row flex-${placement} tabs ${$$restProps.class ?? ''}`}
     style={`text-align: ${contentAlign}`}>
  {#each $tabs as { label, header }, index}
    {@const selected = index == activeTab}
    <div class="tabs-label-header"
         class:tabs-label-header--active={selected}
         aria-selected={selected}
         aria-controls={genControlLabel(label)}
         role="tab"
         tabindex={selected ? 0 : -1}
         on:click={showContent.bind(null, index)}>
      {#if header}
        {@html header.innerHTML}
      {:else}
        {label}
      {/if}
    </div>
  {/each}

  <slot />
</div>

<script lang="ts">
import { onMount, setContext,
         createEventDispatcher } from 'svelte';
import { writable } from 'svelte/store';
import type { TabDataType } from './utils';
import type { PaperFlexPlacement } from '../../types';
import { genControlLabel } from './utils';

export let activeTab: number | string = 0;
export let placement: PaperFlexPlacement = 'spaces';
export let contentAlign: string = 'left';

const dispatch = createEventDispatcher();
const tabs = writable([])

const tabsData: TabDataType = {
  activeTab,
  tabs,
}

setContext('tabs', tabsData);

onMount(() => {
  if (isNaN(Number(activeTab)))
    activeTab = 0;

  if (!$tabs.length) return;
  $tabs[activeTab].show();
});

function showContent(index: number) {
  dispatch('change', index);
  activeTab = index;
  updateTabsVisility();
}

function updateTabsVisility() {
  $tabs.forEach((tab, idx) => {
    if (idx == activeTab)
      tab.show()
    else
      tab.hide();
  });
}

$: activeTab && updateTabsVisility();
</script>

<style lang="scss">
.tabs {
  &-label-header {
    cursor: pointer;
    color: var(--primary-light);
    display: inline-block;
    font-weight: 600;
    margin: 0 0 -1px;
    padding: .75rem;
    text-align: center;
    &:hover:not(&--active) {
      color: var(--muted);
    }
    &--active {
      color: var(--primary);
      border-bottom: 3px solid var(--secondary);
    }
  }
}
// Restore input display in tabs
:global(.tabs input) {
  display: block;
}
:global(.tabs label) {
  all: inherit;
  &:hover {
    all: inherit;
  }
}
</style>
