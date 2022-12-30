import * as transition from 'svelte/transition';
export { default as Carousel } from './Carousel.svelte';
export { default as CarouselItem } from './CarouselItem.svelte';

export function configureTransition(node, { name, disabled }) {
  if (disabled
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  return transition[name](node)
}
