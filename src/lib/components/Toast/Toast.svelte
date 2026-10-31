<script lang="ts">
import { onMount } from 'svelte'
import { fly, fade } from 'svelte/transition'
import { typeIcons } from '../../type-icons'
import type { ToastProps } from './'
import { computeClasses } from '../../utils'
import CloseButton from '../CloseButton.svelte'
import Icon from '../Icon.svelte'

let {
  icon = null,
  hideIcon = false,
  title = '',
  message = '',
  content,
  type = 'primary',
  duration = 2000,
  position = 'top',
  pauseOnHover = false,
  dismissible = false,
  indefinite = false,
  closeAriaLabel = 'close',
  class: className = '',
  onClose = null,
}: ToastProps = $props()

const TRANSITION_OUT_DURATION: number = 300
let active: boolean = $state(false)
let timeoutId: number

let shownIcon = $derived(hideIcon ? null : (icon ?? typeIcons[type]))

let classes = $derived([
  'alert-paper',
  'relative',
  'm-0',
  'shadow-paper',
  'w-[min(250px,calc(100vw-2rem))]',
  computeClasses('alert-paper', { type }),
  className,
])

onMount(() => {
  // A local `in:` transition does not run on the first paint. Flip after mount.
  active = true
  if (indefinite) return
  timeoutId = window.setTimeout(() => close(), duration)
  return () => clearTimeout(timeoutId)
})

function pause() {
  if (!pauseOnHover || indefinite) return
  clearTimeout(timeoutId)
}

function dismiss() {
  if (!pauseOnHover || indefinite) return
  close()
}

export function close() {
  if (!active) return
  active = false
  clearTimeout(timeoutId)
  onClose?.()
}
</script>

{#if active}
  <div
    class={classes}
    onmouseenter={pause}
    onmouseleave={dismiss}
    in:fly={{ y: position.includes('top') ? -100 : 100 }}
    out:fade={{ duration: TRANSITION_OUT_DURATION }}
    role="alert"
  >
    <div
      class={['flex items-start gap-2', { 'pe-6': dismissible || indefinite }]}
    >
      {#if shownIcon}
        <span class={['inline-flex shrink-0', { 'h-7 items-center': title }]}>
          <Icon name={shownIcon} size={22} />
        </span>
      {/if}
      <div>
        {#if title}
          <p class="font-paper-heading text-xl font-bold mb-1">{title}</p>
        {/if}
        {#if content}
          {@render content(close)}
        {:else}
          {@html message}
        {/if}
      </div>
    </div>
    {#if dismissible || indefinite}
      <CloseButton
        class="absolute top-4 right-4"
        ariaLabel={closeAriaLabel}
        onclick={() => close()}
      />
    {/if}
  </div>
{/if}
