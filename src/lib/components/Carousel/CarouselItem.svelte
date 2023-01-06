{#if active}
  <div {...$$restProps}
       class="{$$restProps.class ?? ''} carousel-item"
       in:configureTransition={{
         name: $transition,
         disabled: !$transition,
       }}>
    <slot />
  </div>
{/if}

<script lang="ts">
import { onMount, onDestroy, getContext } from 'svelte';
import type { CarouselItemsData } from './types';
import { configureTransition } from '../../utils';

const key = Symbol();
let active: boolean = false;

const itemsData: CarouselItemsData = getContext('carouselItems');

if (!itemsData)
  throw new Error('CarouselItem should be nested inside a Carousel');

onMount(() => {
  itemsData.items.update(items =>
    [...items, {
      key,
      show: () => active = true,
      hide: () => active = false,
    }
  ]);
});

onDestroy(() => {
  itemsData.items.update(items => (
    items.filter(item => item.key !== key)
  ));
});

$: ({ transition } = itemsData)
</script>
