<script lang="ts">
import type { PaperColor, Position } from '../types'

interface Props {
  label?: string
  position?: Position
  inline?: boolean
  type?: PaperColor | null
  /** @deprecated Use `type`. */
  background?: PaperColor | null
  active?: boolean
  /** When true, the popover is always shown. */
  always?: boolean
  children?: import('svelte').Snippet
  [key: string]: any
}

let {
  label = '',
  position = 'top',
  inline = true,
  type = null,
  background = 'primary',
  active = false,
  always = false,
  children,
  ...rest
}: Props = $props()

const positionClass: Record<Position, string> = {
  top: 'popover-paper-top',
  bottom: 'popover-paper-bottom',
  left: 'popover-paper-left',
  right: 'popover-paper-right',
}

const color = $derived(type ?? background)

const backgroundClass: Record<PaperColor, string> = {
  primary: 'popover-paper-primary',
  secondary: 'popover-paper-secondary',
  success: 'popover-paper-success',
  warning: 'popover-paper-warning',
  danger: 'popover-paper-danger',
  muted: 'popover-paper-muted',
}
</script>

<div
  {...rest}
  data-popover={label}
  class={[
    'popover-paper',
    positionClass[position],
    color && backgroundClass[color],
    {
      inline,
      active: always || active,
    },
    rest.class,
  ]}
>
  {@render children?.()}
</div>
