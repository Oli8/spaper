<script lang="ts">
import type { PaperSize, PaperColor } from '../types'

interface Props {
  /** When false, the spinner is not rendered. */
  active?: boolean
  /** When false, the spinner is not animated. */
  animated?: boolean
  /** Sits inside a line of text. */
  inline?: boolean
  type?: PaperColor
  size?: PaperSize
  ariaLabel?: string
  [key: string]: any
}

let {
  active = true,
  animated = true,
  inline = false,
  type = 'secondary',
  size = 'default',
  ariaLabel = 'Loading...',
  ...rest
}: Props = $props()

const sizeClass: Record<PaperSize, string> = {
  small: 'spinner-paper-sm',
  default: '',
  large: 'spinner-paper-lg',
}

const typeClass: Record<PaperColor, string> = {
  primary: 'spinner-paper-primary',
  secondary: 'spinner-paper-secondary',
  success: 'spinner-paper-success',
  warning: 'spinner-paper-warning',
  danger: 'spinner-paper-danger',
  muted: 'spinner-paper-muted',
}
</script>

{#if active}
  <div
    {...rest}
    role="status"
    aria-label={ariaLabel}
    class={[
      'spinner-paper',
      typeClass[type],
      sizeClass[size],
      {
        'spinner-paper-static': !animated,
        'spinner-paper-inline': inline,
      },
      rest.class,
    ]}
  ></div>
{/if}
