<script lang="ts">
import type { PaperSize, PaperColor } from '../../types'

const NAMED_SIZES = new Set<PaperSize>(['small', 'default', 'large'])

interface Props {
  src?: string | null | undefined
  label?: string
  title?: string
  type?: PaperColor
  /** Size of the avatar. PapierCSS size or any CSS length. */
  size?: PaperSize | string
  /** Imperfect circle variant (`avatar-paper-circle-1` … `6`). */
  circle?: number
  children?: import('svelte').Snippet
  [key: string]: any
}

let {
  src = undefined,
  label = '',
  title = '',
  type = 'primary',
  size = 'default',
  circle = 1,
  children,
  ...rest
}: Props = $props()

let failed = $state(false)
let previousSrc: string | null | undefined

$effect.pre(() => {
  if (src === previousSrc) return
  previousSrc = src
  failed = false
})

let titleAttr = $derived(title || label)
let fallbackText = $derived(label.slice(0, 2))

const sizeClass: Record<PaperSize, string> = {
  small: 'avatar-paper-sm',
  default: '',
  large: 'avatar-paper-lg',
}

const typeClass: Record<PaperColor, string> = {
  primary: 'avatar-paper-primary',
  secondary: 'avatar-paper-secondary',
  success: 'avatar-paper-success',
  warning: 'avatar-paper-warning',
  danger: 'avatar-paper-danger',
  muted: 'avatar-paper-muted',
}

let isNamedSize = $derived(
  typeof size === 'string' && NAMED_SIZES.has(size as PaperSize),
)
let resolvedSizeClass = $derived(
  isNamedSize ? sizeClass[size as PaperSize] : '',
)
let customSizeStyle = $derived(
  !isNamedSize && size
    ? `--paper-avatar-size: ${size}; --paper-avatar-font-size: calc(${size} * 0.45);`
    : '',
)
const circleClasses = [
  'avatar-paper-circle-1',
  'avatar-paper-circle-2',
  'avatar-paper-circle-3',
  'avatar-paper-circle-4',
  'avatar-paper-circle-5',
  'avatar-paper-circle-6',
]
let circleClass = $derived(circleClasses[((circle || 1) - 1) % 6])
</script>

<span
  {...rest}
  class={[
    'avatar-paper',
    typeClass[type],
    circleClass,
    resolvedSizeClass,
    rest.class,
  ]}
  style={customSizeStyle}
  title={titleAttr}
  aria-label={label || undefined}
>
  {#if src && !failed}
    <img
      {src}
      alt={label}
      referrerpolicy="no-referrer"
      onerror={() => (failed = true)}
    />
  {:else}
    {#if children}{@render children()}{:else}{fallbackText}{/if}
  {/if}
</span>
