<section {...$$restProps} tabindex="0"
         class="{$$restProps.class ?? ''} carousel"
         on:click
         on:keydown
         on:keydown={handleKeydown}
         on:mouseover
         on:focus
         on:mouseenter
         on:mouseenter={pause}
         on:mouseleave
         on:mouseleave={resume}>
  <div class="carousel-panel">
    <slot />
    {#if bullets}
      <Pagination class="carousel-bullets margin-top-small"
                  total={length}
                  pageSize={1}
                  current={index + 1}
                  bullets
                  on:change={navigationHandler} />
    {/if}
  </div>
</section>

<script lang="ts">
import { onMount, setContext, createEventDispatcher } from 'svelte';
import { writable } from 'svelte/store';
import type { Transition } from '../../types';
import type {
  CarouselItemsStore,
  CarouselItemsData,
  TransitionStore
} from './types';
import Pagination from '../Pagination/Pagination.svelte';

export let index: number = 0;
export let interval: number = 2500;
export let autoplay: boolean = true;
export let repeat: boolean = true;
export let pauseOnHover: boolean = true;
export let bullets: boolean = true;
export let keyNavigation: boolean = true;
export let transition: Transition|null = 'fade';

const dispatch = createEventDispatcher();
let intervalId: number;

const items: CarouselItemsStore = writable([]);
const transitionStore: TransitionStore = writable(transition);
const itemsData: CarouselItemsData = {
  activeItem: index,
  items,
  transition: transitionStore,
};

setContext('carouselItems', itemsData);

onMount(() => {
  $items[index].show();
  if (autoplay) {
    setUpAutoplay();

    return () => clearInterval(intervalId);
  }
})

function setUpAutoplay() {
  if (intervalId) clearInterval(intervalId);

  intervalId =  window.setInterval(() => {
    index = (index + 1) % length;
    if (!repeat && index === length - 1) {
      clearInterval(intervalId);
    }
  }, interval);
}

function navigationHandler({ detail: value }) {
  goToItem(value - 1);
}

function goToItem(idx: number) {
  if (autoplay) {
    setUpAutoplay();
  }
  index = idx;
}

function pause() {
  if (!pauseOnHover || !autoplay) return;

  clearInterval(intervalId);
}

function resume() {
  if (!pauseOnHover || !autoplay) return;

  setUpAutoplay()
}

function handleKeydown({ key }) {
  if (!keyNavigation) return;

  switch(key) {
    case 'ArrowRight':
      goToItem((index + 1) % length);
      break;
    case 'ArrowLeft':
      goToItem((length + index - 1) % length);
      break;
  }
}

function updateTabsVisility() {
  $items.forEach((item, idx) => {
    if (idx === index)
      item.show();
    else
      item.hide();
  });
}

$: if (index > -1) {
  updateTabsVisility();
  dispatch('change', index)
}
$: $transitionStore = transition;
$: ({ length } = $items);
</script>

<style lang="scss">
.carousel {
  outline: none;
  &-panel {
    position: relative;
    display: inline-block;
    min-height: var(--min-height, 120px);
    height: var(--height, auto);
    max-height: var(--max-height, none);
    min-width: var(--min-width, 0);
    width: var(--width, auto);
    max-width: var(--min-width, none);
  }
}
:global(.carousel-bullets) {
  text-align: center;
}
</style>
