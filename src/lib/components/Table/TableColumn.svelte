<script lang="ts">
import { getContext, onMount, onDestroy } from 'svelte'
import { TABLE_CONTEXT, type TableContext } from './context'

interface Props {
  field: string
  label?: string
  row?: Record<string, any>
  rowIndex?: number
  /** Overrides the table `sortable` prop for this column. */
  sortable?: boolean
  html?: boolean
  content?: ((val?: any) => string) | null
  cellClass?: string
  children?: import('svelte').Snippet<[any]>
}

let {
  field,
  label = undefined,
  row = undefined,
  rowIndex = undefined,
  sortable = undefined,
  html = false,
  content = null,
  cellClass = '',
  children,
}: Props = $props()

const table = getContext<TableContext>(TABLE_CONTEXT)

if (!table) throw new Error('<TableColumn> must be used inside <Table>')

const key = {}

let value = $derived(row?.[field])
let headerLabel = $derived(label ?? field)

onMount(() => {
  table.registerColumn({ field, label: headerLabel, sortable, key })
})

onDestroy(() => {
  table.unregisterColumn(key)
})
</script>

<td class={cellClass}>
  {#if children}
    {@render children?.({ row, value, rowIndex, field })}
  {:else if content}
    {#if html}
      {@html content(value)}
    {:else}
      {content(value)}
    {/if}
  {:else if html}
    {@html value}
  {:else}
    {value}
  {/if}
</td>
