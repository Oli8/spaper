<script lang="ts">
import type { PaperColor } from '../types'

interface Props {
  value?: number | string
  type?: PaperColor
  showValue?: boolean
  striped?: boolean
  /** Loops the bar. Ignores `value`. */
  indeterminate?: boolean
  /** @deprecated Use `indeterminate`. */
  infinite?: boolean
  /** @deprecated Use `class="mb-4"` instead. */
  marginBottom?: boolean
  barClass?: string
  children?: import('svelte').Snippet
  [key: string]: any
}

let {
  value = 50,
  type = 'primary',
  showValue = false,
  striped = false,
  indeterminate = false,
  infinite = false,
  marginBottom = true,
  barClass = '',
  children,
  ...rest
}: Props = $props()

const barTypeClass: Record<Exclude<PaperColor, 'primary'>, string> = {
  secondary: 'progress-paper-bar-secondary',
  success: 'progress-paper-bar-success',
  warning: 'progress-paper-bar-warning',
  danger: 'progress-paper-bar-danger',
  muted: 'progress-paper-bar-muted',
}

const stripedClass: Record<PaperColor, string> = {
  primary: 'progress-paper-striped',
  secondary: 'progress-paper-striped-secondary',
  success: 'progress-paper-striped-success',
  warning: 'progress-paper-striped-warning',
  danger: 'progress-paper-striped-danger',
  muted: 'progress-paper-striped-muted',
}

let cappedValue: number = $derived(Math.max(Math.min(+value, 100), 0))
const isIndeterminate = $derived(indeterminate || infinite)

let variantClass = $derived(
  striped
    ? (stripedClass[type] ?? '')
    : type === 'primary'
      ? ''
      : (barTypeClass[type] ?? ''),
)
</script>

<div
  {...rest}
  class={[
    'progress-paper',
    {
      'progress-paper-indeterminate': isIndeterminate,
      'mb-4': marginBottom,
    },
    rest.class,
  ]}
>
  {#if isIndeterminate || cappedValue > 0}
    <div
      class={['progress-paper-bar', variantClass, barClass]}
      style={isIndeterminate ? undefined : `width: ${cappedValue}%`}
    >
      {#if children}
        {@render children?.()}
      {:else if showValue}
        {cappedValue}%
      {/if}
    </div>
  {/if}
</div>
