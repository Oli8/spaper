<script lang="ts">
type Shape = 'rectangle' | 'square' | 'circle'

interface Props {
  active?: boolean
  count?: number
  animated?: boolean
  shape?: Shape
  /** Width and height for `square` and `circle`. */
  size?: string | number | null
  /** @deprecated Use `shape="circle"`. */
  circle?: boolean
  inline?: boolean
  /** Class on each skeleton. When `count` is greater than 1, `class` is on the group. */
  itemClass?: string
  ariaLabel?: string
  /** @deprecated Use `ariaLabel`. */
  ariaValueText?: string
  [key: string]: any
}

let {
  active = true,
  count = 1,
  animated = true,
  shape = 'rectangle',
  size = null,
  circle = false,
  inline = false,
  itemClass = '',
  ariaLabel,
  ariaValueText,
  class: className = '',
  ...rest
}: Props = $props()

const statusLabel = $derived(ariaLabel ?? ariaValueText ?? 'Loading...')

const circleClasses = [
  'skeleton-paper-circle-1',
  'skeleton-paper-circle-2',
  'skeleton-paper-circle-3',
  'skeleton-paper-circle-4',
  'skeleton-paper-circle-5',
  'skeleton-paper-circle-6',
]

const resolvedShape = $derived<Shape>(
  shape === 'rectangle' && circle ? 'circle' : shape,
)

const cssSize = $derived.by(() => {
  if (resolvedShape === 'rectangle' || size == null || size === '') return null
  return typeof size === 'number' ? `${size}px` : size
})

const boxStyle = $derived(
  cssSize
    ? `--paper-skeleton-width: ${cssSize}; --paper-skeleton-height: ${cssSize};`
    : `--paper-skeleton-width: var(--width, auto); --paper-skeleton-height: var(--height, 100%);`,
)
const mergedStyle = $derived(
  typeof rest.style === 'string' && rest.style
    ? `${rest.style}; ${boxStyle}`
    : boxStyle,
)
</script>

{#if active}
  <div
    class={[
      count > 1 && (inline ? 'inline-flex flex-wrap' : 'flex flex-col'),
      count > 1 && resolvedShape !== 'circle' && 'skeleton-paper-group',
      count > 1 ? className : inline ? 'inline-block h-full' : 'h-full',
    ]}
    role="status"
    aria-busy="true"
    aria-label={statusLabel}
  >
    {#each { length: count } as _, i}
      {@const shapeVariant =
        resolvedShape === 'circle'
          ? circleClasses[i % 6]
          : count === 1
            ? 'skeleton-paper-1'
            : ''}
      <div
        {...rest}
        aria-hidden="true"
        class={[
          'skeleton-paper',
          shapeVariant,
          {
            'skeleton-paper-static': !animated,
            'skeleton-paper-inline': inline,
          },
          itemClass,
          count === 1 && className,
        ]}
        style={mergedStyle}
      ></div>
    {/each}
  </div>
{/if}
