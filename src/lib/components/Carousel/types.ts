import type { Transition } from '../../types'
import type { Writable } from 'svelte/store'

export interface iCarouselItem {
  key: symbol
  show: () => void
  hide: () => void
}

export type CarouselItemsStore = Writable<iCarouselItem[]>
export type TransitionStore = Writable<Transition | null>

export interface CarouselItemsData {
  activeItem: number
  items: CarouselItemsStore
  transition: TransitionStore
}

/** Arguments passed to the Carousel `controls` snippet. Index is 0-based. */
export interface CarouselControls {
  index: number
  length: number
  goTo: (index: number) => void
  next: () => void
  previous: () => void
}
