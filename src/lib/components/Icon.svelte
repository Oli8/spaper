<script lang="ts">
import { SketchyIcon } from '@sketchyicons/svelte'
import type { IconNode } from '@sketchyicons/svelte'
import type { PaperColor } from '../types'

interface Props {
  /** Icon geometry (`IconNode` from `spaper/icons` or `@sketchyicons/svelte`). */
  name?: IconNode | null
  /** Sketchyicons prop name — same as `name`. */
  img?: IconNode | null
  /** Paper color token. Overridden by `color` when both are set. */
  type?: PaperColor | null
  /**
   * Stroke color: a paper token (`primary`, `muted`, …) or any CSS color.
   * Wins over `type` when both are set.
   */
  color?: PaperColor | (string & {}) | null
  size?: number | string
  strokeWidth?: number | string
  absoluteStrokeWidth?: boolean
  /**
   * Path fill: a paper token (`primary`, `danger`, …) or any CSS color
   * (e.g. `currentColor`). SketchyIcon has no fill — drawn locally when set.
   */
  fill?: PaperColor | (string & {}) | null
  [key: string]: any
}

let {
  name = null,
  img = null,
  type = null,
  color = null,
  size = 24,
  strokeWidth = 2,
  absoluteStrokeWidth = false,
  fill = null,
  ...rest
}: Props = $props()

const TOKEN_COLORS = new Set<string>([
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
  'muted',
])

function resolveColor(raw: string | null | undefined): string {
  if (!raw) return 'currentColor'
  if (TOKEN_COLORS.has(raw)) return `var(--paper-${raw})`
  return raw
}

let node = $derived(name ?? img)
let resolvedColor = $derived(
  resolveColor((color ?? type) as string | null | undefined),
)
let resolvedFill = $derived(!fill ? null : resolveColor(fill as string))
let width = $derived(
  absoluteStrokeWidth ? (Number(strokeWidth) * 24) / Number(size) : strokeWidth,
)
let ariaHidden = $derived(
  rest['aria-label'] || rest['aria-labelledby'] ? undefined : ('true' as const),
)
</script>

{#if node}
  {#if resolvedFill}
    <!-- SketchyIcon has no `fill` prop — draw locally when a fill is requested. -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      width={size}
      height={size}
      stroke={resolvedColor}
      stroke-width={width}
      aria-hidden={ariaHidden}
      {...rest}
      class={['inline-block', rest.class]}
    >
      {#each node as [, attributes], i (i)}
        <path d={String(attributes.d)} fill={resolvedFill} />
      {/each}
    </svg>
  {:else}
    <SketchyIcon
      img={node}
      {size}
      color={resolvedColor}
      {strokeWidth}
      {absoluteStrokeWidth}
      aria-hidden={ariaHidden}
      {...rest}
      class={['inline-block', rest.class]}
    />
  {/if}
{/if}
