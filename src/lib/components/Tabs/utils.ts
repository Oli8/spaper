import type { Writable } from 'svelte/store';

interface iTab {
  key: Object;
  label: string;
  header?: HTMLElement;
  show: () => void;
  hide: () => void;
}

export interface TabDataType {
  activeTab: number | string;
  tabs: Writable<iTab[]>;
}

export function genControlLabel(label: string): string {
  return `paper-tab-${label}`;
}
