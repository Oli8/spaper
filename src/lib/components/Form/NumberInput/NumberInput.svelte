<script lang="ts">
import { DecrementButton, IncrementButton } from './'
import { getDomAttributes } from '../../../utils'
import type { Attributes, PaperType } from '../../../types'

interface Props {
  label?: string
  value?: number | null
  step?: number
  min?: number | null
  max?: number | null
  disabled?: boolean
  controls?: boolean
  controlsType?: PaperType
  /** @deprecated Use `class="w-full"` instead. */
  block?: boolean
  /** Receives the value and returns `true` if it is valid. */
  valid?: ((val: number | null) => boolean) | null
  prefix?: string
  suffix?: string
  /**
   * Either an `Intl` locale, or a function that receives the value and returns
   * the text. `"locale"` uses the browser locale. Any other string is a locale
   * tag (`"fr-FR"`).
   */
  format?: string | ((val: number | null) => string) | null
  /** Passed to `Intl.NumberFormat` when `format` is a locale string. */
  formatOptions?: Intl.NumberFormatOptions
  class?: string
  oninput?: (value: string) => void
  onfocus?: (e: FocusEvent) => void
  onblur?: (e: FocusEvent) => void
  onchange?: (e: Event) => void
  [key: string]: unknown
}

let {
  label = '',
  value = $bindable(null),
  step = 1,
  min = null,
  max = null,
  disabled = false,
  controls = true,
  controlsType = 'secondary',
  block = false,
  valid = null,
  prefix = '',
  suffix = '',
  format = null,
  formatOptions = undefined,
  class: className = '',
  oninput,
  onfocus,
  onblur,
  onchange,
  ...rest
}: Props = $props()

const isValid = $derived(valid ? valid(value) : true)

const classes = $derived([
  'input-paper',
  {
    'w-full': block,
    'border-danger': !isValid && value !== null,
    'border-success': isValid && value !== null && !!valid,
  },
  className,
])

const attr: Attributes = $derived(
  getDomAttributes({
    props: { ...rest, disabled },
    classes: '',
    toOmit: [
      'block',
      'value',
      'valid',
      'noResize',
      'min',
      'max',
      'label',
      'step',
      'controls',
      'controlsType',
      'prefix',
      'suffix',
      'format',
      'formatOptions',
      'oninput',
      'onfocus',
      'onblur',
      'onchange',
    ],
  }),
)

const canDecrement = $derived(
  !disabled && (min !== null && value !== null ? value - step >= min : true),
)
const canIncrement = $derived(
  !disabled && (max !== null && value !== null ? value + step <= max : true),
)

const formattedValue = $derived.by(() => {
  if (value === null) return ''

  let next = String(value)

  if (format) {
    if (typeof format === 'string') {
      next = new Intl.NumberFormat(
        format === 'locale' ? undefined : format,
        formatOptions,
      ).format(value)
    } else {
      next = format(value)
    }
  }

  return [prefix, next, suffix].join(' ').trim()
})

function parseInput(raw: string): number | null {
  let text = raw.trim()
  if (prefix && text.startsWith(prefix)) text = text.slice(prefix.length).trim()
  if (suffix && text.endsWith(suffix))
    text = text.slice(0, -suffix.length).trim()
  text = text.replace(/\s/g, '')
  if (text === '' || text === '-' || text === '.' || text === '-.') return null
  const n = Number(text)
  return Number.isFinite(n) ? n : null
}

function clamp(n: number) {
  if (max !== null && n > max) return max
  if (min !== null && n < min) return min
  return n
}

function commit(target: HTMLInputElement) {
  const n = parseInput(target.value)
  if (n === null) {
    target.value = formattedValue
    return
  }
  value = clamp(n)
  target.value = formattedValue
}

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement
  oninput?.(target.value)
  const n = parseInput(target.value)
  if (n !== null && max !== null && n > max) commit(target)
}

function handleBlur(e: FocusEvent) {
  commit(e.currentTarget as HTMLInputElement)
  onblur?.(e)
}
</script>

<div class="flex gap-1">
  {#if controls}
    <DecrementButton
      class="self-end! p-2!"
      clickHandler={() => {
        if (value !== null) value -= step
      }}
      type={controlsType}
      disabled={!canDecrement}
    />
  {/if}

  {#snippet field()}
    <input
      {...attr}
      class={classes}
      inputmode="numeric"
      value={formattedValue}
      aria-valuemin={min ?? undefined}
      aria-valuemax={max ?? undefined}
      aria-valuenow={value ?? undefined}
      oninput={handleInput}
      {onfocus}
      onblur={handleBlur}
      {onchange}
    />
  {/snippet}

  {#if label}
    <label>
      {label}
      {@render field()}
    </label>
  {:else}
    {@render field()}
  {/if}

  {#if controls}
    <IncrementButton
      class="self-end! p-2!"
      clickHandler={() => {
        if (value !== null) value += step
      }}
      type={controlsType}
      disabled={!canIncrement}
    />
  {/if}
</div>
