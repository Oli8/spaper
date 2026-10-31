<script lang="ts">
import { setContext } from 'svelte'
import { writable } from 'svelte/store'
import type { TabDataType, iTab } from './utils'
import type { PaperFlexPlacement } from '../../types'
import { getId } from './utils'
import Icon from '../Icon.svelte'

interface Props {
  activeTab?: number | string
  placement?: PaperFlexPlacement
  contentAlign?: string
  onchange?: (index: number) => void
  onkeypress?: (e: KeyboardEvent) => void
  children?: import('svelte').Snippet
  [key: string]: any
}

let {
  activeTab = $bindable(0),
  placement = 'spaces',
  contentAlign = 'left',
  onchange,
  onkeypress,
  children,
  ...rest
}: Props = $props()

const placementMap: Record<PaperFlexPlacement, string> = {
  spaces: 'tabs-paper-around',
  edges: 'tabs-paper-between',
  right: 'tabs-paper-end',
  center: 'tabs-paper-center',
  left: 'tabs-paper-start',
}

let placementClass = $derived(placementMap[placement] ?? 'tabs-paper-around')

const tabs = writable<iTab[]>([])

const tabsData: TabDataType = {
  activeTab,
  tabs,
}

setContext('tabs', tabsData)

function showContent(index: number) {
  onchange?.(index)
  activeTab = index
}

$effect(() => {
  const list = $tabs
  const idx = Number(activeTab)
  if (isNaN(idx)) {
    activeTab = 0
    return
  }
  list.forEach((tab, i) => {
    if (i === idx) tab.show()
    else tab.hide()
  })
})
</script>

<div
  {...rest}
  class={['tabs-paper', placementClass, rest.class]}
  style="text-align: {contentAlign}"
>
  {#each $tabs as { label, header, icon }, index}
    {@const selected = index == activeTab}
    <div
      class={['tabs-paper-header', { 'tabs-paper-header-active': selected }]}
      id={getId(label, 'label')}
      aria-selected={selected}
      aria-controls={getId(label, 'content')}
      role="tab"
      tabindex={selected ? 0 : -1}
      onclick={showContent.bind(null, index)}
      {onkeypress}
    >
      {#if icon}
        <span class="inline-flex items-center gap-1.5">
          <Icon name={icon} size={18} />
          {#if header}
            {@html header.innerHTML}
          {:else}
            {label}
          {/if}
        </span>
      {:else if header}
        {@html header.innerHTML}
      {:else}
        {label}
      {/if}
    </div>
  {/each}

  {@render children?.()}
</div>
