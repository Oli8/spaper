<script lang="ts">
import { setContext, tick } from 'svelte'
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
let tablist = $state<HTMLDivElement | undefined>()
let focused = $state(0)

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

function selectTab(index: number) {
  focused = index
  showContent(index)
}

async function onTabKeydown(event: KeyboardEvent, index: number) {
  const count = $tabs.length
  if (!count) return

  let next: number | null = null
  if (event.key === 'ArrowRight') next = (index + 1) % count
  else if (event.key === 'ArrowLeft') next = (index - 1 + count) % count
  else if (event.key === 'Home') next = 0
  else if (event.key === 'End') next = count - 1
  else if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    showContent(index)
    return
  } else return

  event.preventDefault()
  focused = next
  await tick()
  tablist?.querySelectorAll<HTMLElement>('[role="tab"]')[next]?.focus()
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

$effect(() => {
  const idx = Number(activeTab)
  if (!Number.isNaN(idx)) focused = idx
})
</script>

<div
  {...rest}
  class={['tabs-paper', placementClass, rest.class]}
  style="text-align: {contentAlign}"
>
  <div bind:this={tablist} role="tablist" aria-orientation="horizontal">
    {#each $tabs as { label, header, icon }, index}
      {@const selected = index == activeTab}
      <div
        class={['tabs-paper-header', { 'tabs-paper-header-active': selected }]}
        id={getId(label, 'label')}
        aria-selected={selected}
        aria-controls={getId(label, 'content')}
        role="tab"
        tabindex={index === focused ? 0 : -1}
        onclick={() => selectTab(index)}
        onkeydown={(event) => onTabKeydown(event, index)}
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
  </div>

  {@render children?.()}
</div>
