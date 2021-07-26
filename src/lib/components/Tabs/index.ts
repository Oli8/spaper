import type { Writable } from 'svelte/store';
import Tabs from './Tabs.svelte';
import Tab from './Tab.svelte';

export interface iTab {
  key: Object,
  label: string;
  header?: HTMLElement;
  show: () => void;
  hide: () => void;
}

export interface TabDataType {
  activeTab: number | string,
  tabs: Writable<iTab[]>
}

export { Tabs, Tab };
