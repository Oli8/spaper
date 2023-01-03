import type { Transition } from '../../types';
import type { Writable } from 'svelte/store';

export interface iCarouselItem {
  key: Symbol;
  show: () => void;
  hide: () => void;
}

export type CarouselItemsStore = Writable<iCarouselItem[]>;
export type TransitionStore = Writable<Transition>;

export interface CarouselItemsData {
  activeItem: number;
  items: CarouselItemsStore;
  transition: TransitionStore;
}
