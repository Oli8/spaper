<script lang="ts">
import { fade, slide } from 'svelte/transition'
import type { SlideParams, TransitionConfig } from 'svelte/transition'
import type { PaperType } from '../types'
import type { IconNode } from '../icons'
import { typeIcons } from '../type-icons'
import CloseButton from './CloseButton.svelte'
import Icon from './Icon.svelte'

/** One outro: collapse from `slide`, opacity from `fade`. */
function slideFade(node: Element, params: SlideParams = {}): TransitionConfig {
  const slideTrans = slide(node, params)
  const fadeTrans = fade(node, params)
  return {
    delay: slideTrans.delay,
    duration: slideTrans.duration,
    easing: slideTrans.easing,
    css: (t, u) =>
      [slideTrans.css?.(t, u), fadeTrans.css?.(t, u)].filter(Boolean).join(';'),
  }
}

interface Props {
  type?: PaperType
  /** Replaces the icon chosen from `type`. */
  icon?: IconNode | null
  /** Hides the icon, including the one chosen from `type`. */
  hideIcon?: boolean
  dismissible?: boolean
  children?: import('svelte').Snippet
  [key: string]: any
}

let {
  type = 'primary',
  icon = null,
  hideIcon = false,
  dismissible = false,
  children,
  ...rest
}: Props = $props()

const typeClass: Record<PaperType, string> = {
  primary: 'alert-paper-primary',
  secondary: 'alert-paper-secondary',
  success: 'alert-paper-success',
  warning: 'alert-paper-warning',
  danger: 'alert-paper-danger',
}

let shownIcon = $derived(hideIcon ? null : (icon ?? typeIcons[type]))
let closed: boolean = $state(false)

function close(): void {
  closed = true
}
</script>

{#if !closed}
  <div
    {...rest}
    class={[
      'alert-paper',
      { 'alert-paper-dismissible': dismissible },
      typeClass[type],
      rest.class,
    ]}
    role="alert"
    out:slideFade={{ duration: 500 }}
  >
    <div class="flex items-center gap-2">
      {#if shownIcon}
        <Icon name={shownIcon} size={22} class="shrink-0" />
      {/if}
      <div>
        {@render children?.()}
      </div>
    </div>
    {#if dismissible}
      <CloseButton onclick={close} />
    {/if}
  </div>
{/if}
