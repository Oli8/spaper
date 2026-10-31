<script lang="ts">
import { fade } from 'svelte/transition'
import Button from './Button.svelte'
import Icon from './Icon.svelte'
import { ArrowUp, type IconNode } from '../icons'

interface Props {
  /** Element to scroll. The page, when unset. */
  target?: HTMLElement | null
  /** Scroll animation. */
  behavior?: ScrollBehavior
  rounded?: boolean
  /** Icon geometry. `ArrowUp` when unset. */
  icon?: IconNode | null
  ariaLabel?: string
  onclick?: (e: MouseEvent) => void
  children?: import('svelte').Snippet
  [key: string]: any
}

let {
  target = null,
  behavior = 'smooth',
  rounded = false,
  icon = ArrowUp,
  ariaLabel = 'To top',
  onclick,
  children,
  class: className = '',
  ...rest
}: Props = $props()

let scrolled = $state(false)

$effect(() => {
  const node = target ?? window

  function read() {
    return target ? target.scrollTop : window.scrollY
  }

  function onScroll() {
    scrolled = read() > 0
  }

  onScroll()
  node.addEventListener('scroll', onScroll, { passive: true })
  return () => node.removeEventListener('scroll', onScroll)
})

function scrollTop(e: MouseEvent) {
  onclick?.(e)
  ;(target ?? window).scrollTo({ top: 0, behavior })
}
</script>

{#if scrolled}
  <div transition:fade={{ duration: 200 }}>
    <Button
      {...rest}
      class={[
        'fixed right-6 bottom-6 inline-flex items-center justify-center',
        {
          'aspect-square rounded-paper-circle!': rounded,
        },
        className,
      ]}
      aria-label={ariaLabel}
      nativeType="button"
      onclick={scrollTop}
    >
      {#if children}
        {@render children()}
      {:else}
        <Icon name={icon} size={22} />
      {/if}
    </Button>
  </div>
{/if}
