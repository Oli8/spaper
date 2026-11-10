<script lang="ts">
import { onMount, setContext } from 'svelte'
import { writable } from 'svelte/store'
import type { Transition } from '../../types'
import type {
  CarouselControls,
  CarouselItemsStore,
  CarouselItemsData,
  TransitionStore,
} from './types'
import Pagination from '../Pagination/Pagination.svelte'

interface Props {
  index?: number
  /** The interval in milliseconds between slides. */
  interval?: number
  autoplay?: boolean
  repeat?: boolean
  pauseOnHover?: boolean
  bullets?: boolean
  keyNavigation?: boolean
  transition?: Transition | null
  onchange?: (index: number) => void
  onclick?: (e: MouseEvent) => void
  onkeydown?: (e: KeyboardEvent) => void
  onmouseover?: (e: MouseEvent) => void
  onmouseenter?: (e: MouseEvent) => void
  onmouseleave?: (e: MouseEvent) => void
  onfocus?: (e: FocusEvent) => void
  /** Replaces the default bullets. Receives 0-based index helpers. */
  controls?: import('svelte').Snippet<[CarouselControls]>
  children?: import('svelte').Snippet
  [key: string]: any
}

let {
  index = $bindable(0),
  interval = 2500,
  autoplay = true,
  repeat = true,
  pauseOnHover = true,
  bullets = true,
  keyNavigation = true,
  transition = 'fade',
  onchange,
  onclick,
  onkeydown,
  onmouseover,
  onmouseenter,
  onmouseleave,
  onfocus,
  controls,
  children,
  ...rest
}: Props = $props()

let intervalId: number

const items: CarouselItemsStore = writable([])
const transitionStore: TransitionStore = writable(null)
$effect(() => {
  // Use .set() — `$store =` inside an effect re-subscribes and loops forever.
  transitionStore.set(transition)
})
const itemsData: CarouselItemsData = {
  activeItem: index,
  items,
  transition: transitionStore,
}

setContext('carouselItems', itemsData)

onMount(() => {
  $items[index]?.show()
  if (autoplay) {
    setUpAutoplay()
    return () => clearInterval(intervalId)
  }
})

function setUpAutoplay() {
  if (intervalId) clearInterval(intervalId)
  if (!autoplay) return

  intervalId = window.setInterval(() => {
    if (!length) return
    index = (index + 1) % length
    if (!repeat && index === length - 1) {
      clearInterval(intervalId)
    }
  }, interval)
}

function navigationHandler(value: number) {
  goToItem(value - 1)
}

function goToItem(idx: number) {
  if (autoplay) {
    setUpAutoplay()
  }
  index = idx
}

function next() {
  if (!length) return
  goToItem((index + 1) % length)
}

function previous() {
  if (!length) return
  goToItem((length + index - 1) % length)
}

function pause() {
  if (!pauseOnHover || !autoplay) return

  clearInterval(intervalId)
}

function resume() {
  if (!pauseOnHover || !autoplay) return

  setUpAutoplay()
}

function handleKeydown(e: KeyboardEvent) {
  onkeydown?.(e)
  if (!keyNavigation || !length) return

  switch (e.key) {
    case 'ArrowRight':
      next()
      break
    case 'ArrowLeft':
      previous()
      break
  }
}

function handleMouseEnter(e: MouseEvent) {
  onmouseenter?.(e)
  pause()
}

function handleMouseLeave(e: MouseEvent) {
  onmouseleave?.(e)
  resume()
}

function updateTabsVisility() {
  $items.forEach((item, idx) => {
    if (idx === index) item.show()
    else item.hide()
  })
}

$effect(() => {
  if (index > -1) {
    updateTabsVisility()
    onchange?.(index)
  }
})
let { length } = $derived($items)
</script>

<section
  {...rest}
  class={['outline-none', rest.class]}
  {onclick}
  onkeydown={handleKeydown}
  {onmouseover}
  {onfocus}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
>
  <div
    class={[
      'relative inline-block',
      'min-h-(--min-height,120px) h-(--height,auto) max-h-(--max-height,none)',
      'min-w-(--min-width,0) w-(--width,auto) max-w-(--max-width,none)',
    ]}
  >
    {@render children?.()}
    {#if controls}
      {@render controls({
        index,
        length,
        goTo: goToItem,
        next,
        previous,
      })}
    {:else if bullets}
      <Pagination
        class="mt-2 flex w-full justify-center"
        total={length}
        pageSize={1}
        current={index + 1}
        bullets
        onchange={navigationHandler}
      />
    {/if}
  </div>
</section>
