import type { Snippet } from 'svelte'

export type PaperSize = 'small' | 'default' | 'large'

export type PaperType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'

export type PaperColor = PaperType | 'muted'

export type PaperFlexPlacement =
  | 'spaces'
  | 'edges'
  | 'right'
  | 'center'
  | 'left'

export type PaperAlign = 'left' | 'center' | 'right'

export type Attributes = Record<string, string | boolean>

export type PositionY = 'top' | 'bottom'
export type PositionX = 'left' | 'right'
export type Position = PositionX | PositionY

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type StringOrSnippet = string | Snippet

export interface TableColumnObj {
  field: string
  label?: string
  /** Overrides the table `sortable` prop for this column. */
  sortable?: boolean
  /** @deprecated Use `<TableColumn>` to render the cell. */
  content?: (val?: any) => string
  /** @deprecated Use `<TableColumn>` to render the cell. */
  html?: boolean
}

export type TableColumn = TableColumnObj | string

/** `order` is `1` for ascending and `-1` for descending. */
export interface TableSort {
  field: string
  order: 1 | -1
}

export type Transition =
  | 'blur'
  | 'fade'
  | 'fly'
  | 'slide'
  | 'scale'
  | 'draw'
  | 'crossfade'
