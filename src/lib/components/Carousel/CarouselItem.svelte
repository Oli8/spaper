<script lang="ts">
import { onDestroy, getContext } from 'svelte'
import type { CarouselItemsData } from './types'
import { configureTransition } from '../../utils'
interface Props {
  children?: import('svelte').Snippet
  [key: string]: any
}

let { children, ...rest }: Props = $props()

const key = Symbol()
let active: boolean = $state(false)

const itemsData: CarouselItemsData = getContext('carouselItems')

if (!itemsData)
  throw new Error('CarouselItem should be nested inside a Carousel')

// Register during init so the parent can show the first slide without racing onMount.
itemsData.items.update((list) => [
  ...list,
  {
    key,
    show: () => (active = true),
    hide: () => (active = false),
  },
])

onDestroy(() => {
  itemsData.items.update((list) => list.filter((item) => item.key !== key))
})

let { transition } = $derived(itemsData)
</script>

{#if active}
  <div
    {...rest}
    class={['carousel-item', rest.class]}
    in:configureTransition={{
      name: $transition,
      disabled: !$transition,
    }}
  >
    {@render children?.()}
  </div>
{/if}
