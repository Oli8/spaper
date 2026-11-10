<script lang="ts">
import { setContext } from 'svelte'
import { writable } from 'svelte/store'
import type {
  TableColumnObj as ColumnObj,
  TableColumn as Column,
  TableSort,
} from '../../types'
import Icon from '../Icon.svelte'
import {
  ArrowDownWideNarrow,
  ArrowUpDown,
  ArrowUpNarrowWide,
} from '../../icons'
import {
  TABLE_CONTEXT,
  type RegisteredColumn,
  type TableContext,
} from './context'

interface Props {
  columns?: Column[]
  data?: Record<string, any>[]
  striped?: boolean
  hoverable?: boolean
  showHeader?: boolean
  /** Header clicks cycle the sort. */
  sortable?: boolean
  /**
   * Active sort. `1` is ascending, `-1` is descending.
   * Click a header to cycle ascending, descending, then unsorted.
   */
  sort?: TableSort | null
  headerCLass?: string
  cellCLass?: string
  children?: import('svelte').Snippet<[any]>
  header?: import('svelte').Snippet<[any]>
  cell?: import('svelte').Snippet<[any]>
  empty?: import('svelte').Snippet
  [key: string]: any
}

let {
  columns = [],
  data = [],
  striped = false,
  hoverable = false,
  showHeader = true,
  sortable = false,
  sort = $bindable(null),
  headerCLass = '',
  cellCLass = '',
  children,
  header,
  cell,
  empty,
  ...rest
}: Props = $props()

const registeredColumns = writable<RegisteredColumn[]>([])
const counts = new Map<string, number>()
const keyToField = new Map<object, string>()

const tableContext: TableContext = {
  columns: registeredColumns,
  registerColumn(col) {
    keyToField.set(col.key, col.field)
    const n = (counts.get(col.field) ?? 0) + 1
    counts.set(col.field, n)
    if (n === 1) {
      registeredColumns.update((list) => [...list, col])
    }
  },
  unregisterColumn(key) {
    const field = keyToField.get(key)
    if (!field) return
    keyToField.delete(key)

    const n = (counts.get(field) ?? 1) - 1
    if (n <= 0) {
      counts.delete(field)
      registeredColumns.update((list) => list.filter((c) => c.field !== field))
    } else {
      counts.set(field, n)
    }
  },
}

setContext(TABLE_CONTEXT, tableContext)

function isColumnObj(arg: Column): arg is ColumnObj {
  return typeof arg === 'object' && arg !== null && 'field' in arg
}

function columnField(column: Column | RegisteredColumn): string {
  return typeof column === 'string' ? column : column.field
}

function columnLabel(column: Column | RegisteredColumn): string {
  if (typeof column === 'string') return column
  return column.label ?? column.field
}

function columnSortable(column: Column | RegisteredColumn): boolean {
  if (typeof column === 'string') return sortable
  return column.sortable ?? sortable
}

const deprecatedColumnFields = new Set<string>()

$effect(() => {
  for (const column of columns) {
    if (!isColumnObj(column) || (!column.content && !column.html)) continue
    if (deprecatedColumnFields.has(column.field)) continue
    deprecatedColumnFields.add(column.field)
    console.warn(
      `[spaper] Table column "${column.field}": \`content\` and \`html\` are deprecated. Use <TableColumn> instead.`,
    )
  }
})

let useColumnChildren = $derived(!!children)
let propColumns = $derived(
  columns.length ? columns : data[0] ? Object.keys(data[0]) : [],
)
let headerColumns = $derived(
  useColumnChildren ? $registeredColumns : propColumns,
)
let columnCount = $derived(
  Math.max(headerColumns.length, propColumns.length, 1),
)

function compareValues(a: unknown, b: unknown): number {
  if (typeof a === 'number' && typeof b === 'number') return a - b
  return String(a ?? '').localeCompare(String(b ?? ''), undefined, {
    numeric: true,
    sensitivity: 'base',
  })
}

let sortedData = $derived.by(() => {
  if (!sort) return data
  const { field, order } = sort
  return data.toSorted((a, b) => compareValues(a[field], b[field]) * order)
})

/** Columns opened by a presort stay clickable after the sort is cleared. */
let stickySortable = $state<string[]>([])

$effect(() => {
  const field = sort?.field
  if (!field || stickySortable.includes(field)) return
  stickySortable.push(field)
})

function toggleSort(field: string) {
  if (sort?.field !== field) {
    sort = { field, order: 1 }
    return
  }
  if (sort.order === 1) {
    sort = { field, order: -1 }
    return
  }
  sort = null
}

function ariaSort(field: string): 'ascending' | 'descending' | 'none' {
  if (sort?.field !== field) return 'none'
  return sort.order === 1 ? 'ascending' : 'descending'
}

function sortIcon(field: string) {
  if (sort?.field !== field) return ArrowUpDown
  return sort.order === 1 ? ArrowUpNarrowWide : ArrowDownWideNarrow
}
</script>

<table
  {...rest}
  class={[
    'table-paper',
    {
      'table-paper-alternating': striped,
      'table-paper-hover': hoverable,
    },
    rest.class,
  ]}
>
  {#if showHeader}
    <thead>
      <tr>
        {#each headerColumns as column, columnIndex}
          {@const field = columnField(column)}
          {@const canSort =
            columnSortable(column) ||
            stickySortable.includes(field) ||
            sort?.field === field}
          <th
            class={[
              {
                'hover:bg-(--paper-table-header-hover,var(--paper-table-hover-bg))':
                  canSort,
              },
              headerCLass,
            ]}
            aria-sort={canSort ? ariaSort(field) : undefined}
          >
            {#if canSort}
              <button
                type="button"
                class="inline-flex w-full cursor-pointer items-center gap-1 bg-transparent p-0 text-left font-[inherit] text-inherit"
                onclick={() => toggleSort(field)}
              >
                {#if header}
                  {@render header?.({ column, columnIndex })}
                {:else}
                  {columnLabel(column)}
                {/if}
                <Icon
                  name={sortIcon(field)}
                  size={16}
                  aria-hidden="true"
                  type={sort?.field === field ? null : 'muted'}
                />
              </button>
            {:else if header}
              {@render header?.({ column, columnIndex })}
            {:else}
              {columnLabel(column)}
            {/if}
          </th>
        {/each}
      </tr>
    </thead>
  {/if}
  <tbody>
    {#if useColumnChildren}
      {#if !data.length}
        <tr class="hidden" aria-hidden="true">
          {@render children?.({ row: {}, rowIndex: -1 })}
        </tr>
      {/if}
      {#each sortedData as row, rowIndex}
        <tr>
          {@render children?.({ row, rowIndex })}
        </tr>
      {/each}
    {:else}
      {#each sortedData as row, rowIndex}
        <tr>
          {#each propColumns as column, columnIndex}
            {@const field = columnField(column)}
            {@const value = row[field]}
            <td class={cellCLass}>
              {#if cell}
                {@render cell?.({
                  row,
                  column,
                  value,
                  field,
                  rowIndex,
                  columnIndex,
                })}
              {:else}
                {@const colObj = isColumnObj(column) ? column : null}
                {#if colObj?.content}
                  {#if colObj.html}
                    {@html colObj.content(value)}
                  {:else}
                    {colObj.content(value)}
                  {/if}
                {:else if colObj?.html}
                  {@html value}
                {:else}
                  {value}
                {/if}
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    {/if}
    {#if !data.length && empty}
      <tr>
        <td colspan={columnCount}>
          {@render empty()}
        </td>
      </tr>
    {/if}
  </tbody>
</table>
