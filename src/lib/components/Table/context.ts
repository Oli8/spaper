import type { Writable } from 'svelte/store'

export interface RegisteredColumn {
  field: string
  label: string
  sortable?: boolean
  key: object
}

export interface TableContext {
  registerColumn: (col: RegisteredColumn) => void
  unregisterColumn: (key: object) => void
  columns: Writable<RegisteredColumn[]>
}

export const TABLE_CONTEXT = 'paper-table'
