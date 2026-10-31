import type { Writable } from 'svelte/store'
import type { IconNode } from '../../icons'

export interface iTab {
  key: object
  label: string
  header?: HTMLElement
  icon?: IconNode | null
  show: () => void
  hide: () => void
}

export interface TabDataType {
  activeTab: number | string
  tabs: Writable<iTab[]>
}

export function getId(label: string, part: 'label' | 'content'): string {
  return `paper-tab-${label}-${part}`
}
