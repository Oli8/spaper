<script lang="ts">
import { onDestroy, getContext } from 'svelte'
import type { Snippet } from 'svelte'
import type { IconNode } from '../../icons'
import type { TabDataType } from './utils'
import { getId } from './utils'

interface Props {
  label: string
  /** Icon shown to the left of the header text. */
  icon?: IconNode | null
  children?: Snippet
  header?: Snippet
  class?: string
  [key: string]: unknown
}

let {
  label,
  icon = null,
  children,
  header: headerSnippet,
  class: className = '',
  ...rest
}: Props = $props()

const key = {}
let active = $state(false)
let headerEl = $state<HTMLElement | undefined>()

const tabsData: TabDataType = getContext('tabs')

if (!tabsData) throw new Error('Tab should be nested inside a Tabs')

function show() {
  active = true
}
function hide() {
  active = false
}

// Register during init (not onMount) so labels exist for SSR + first paint.
tabsData.tabs.update((tabs) => [
  ...tabs,
  { key, label, header: headerEl, icon, show, hide },
])

$effect(() => {
  const nextLabel = label
  const nextHeader = headerEl
  const nextIcon = icon
  tabsData.tabs.update((tabs) => {
    const current = tabs.find((t) => t.key === key)
    if (
      !current ||
      (current.label === nextLabel &&
        current.header === nextHeader &&
        current.icon === nextIcon)
    ) {
      return tabs
    }
    return tabs.map((t) =>
      t.key === key
        ? { ...t, label: nextLabel, header: nextHeader, icon: nextIcon }
        : t,
    )
  })
})

onDestroy(() => {
  tabsData.tabs.update((tabs) => tabs.filter((t) => t.key !== key))
})
</script>

<div
  {...rest}
  class={['tabs-paper-content', { 'block!': active }, className]}
  id={getId(label, 'content')}
  aria-hidden={!active}
  aria-labelledby={getId(label, 'label')}
  role="tabpanel"
  tabindex={active ? 0 : -1}
>
  {#if headerSnippet}
    <div bind:this={headerEl} style="display: none">
      {@render headerSnippet()}
    </div>
  {/if}
  {@render children?.()}
</div>
