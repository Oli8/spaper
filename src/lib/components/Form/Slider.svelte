<script lang="ts">
import { onMount } from 'svelte'
import type { PaperType, PaperColor } from '../../types'

interface Props {
  label?: string
  min?: number | string
  max?: number | string
  step?: number | string
  /** @deprecated Use `class="w-full"` instead. */
  block?: boolean
  hideValue?: boolean
  value?: number | string | null
  type?: PaperColor | null
  /** @deprecated Use `type` — maps to `slider-paper-{color}`. */
  background?: PaperType | null
  percentage?: boolean
  disabled?: boolean
  children?: import('svelte').Snippet
  output?: import('svelte').Snippet<[number | string | null]>
  [key: string]: any
}

let {
  label = '',
  min = 0,
  max = 100,
  step = 1,
  block = false,
  hideValue = false,
  value = $bindable(null),
  type = null,
  background = null,
  percentage = false,
  disabled = false,
  children,
  output,
  ...rest
}: Props = $props()

const typeClass: Record<PaperColor, string> = {
  primary: 'slider-paper-primary',
  secondary: 'slider-paper-secondary',
  success: 'slider-paper-success',
  warning: 'slider-paper-warning',
  danger: 'slider-paper-danger',
  muted: 'slider-paper-muted',
}

let rangeEl: HTMLInputElement | undefined = $state()
let outputValue: string = $state('')

function syncFill(el = rangeEl) {
  if (!el) return
  const lo = Number(min)
  const hi = Number(max)
  const span = hi - lo
  const pct =
    !Number.isFinite(span) || span === 0
      ? 0
      : Math.min(100, Math.max(0, ((el.valueAsNumber - lo) / span) * 100))
  el.style.setProperty('--value', `${pct}%`)
}

function formatOutput(raw: string | number) {
  return percentage
    ? String(Math.round((Number(raw) / Number(max)) * 100))
    : String(raw)
}

function syncOutput() {
  if (value !== null && value !== '') {
    outputValue = formatOutput(value)
    return
  }
  outputValue = rangeEl ? formatOutput(rangeEl.value) : ''
}

function onInput() {
  syncFill()
  outputValue = formatOutput(rangeEl!.value)
}

onMount(() => {
  syncFill()
  syncOutput()
})

let color = $derived(type ?? background)

$effect(() => {
  syncFill()
  syncOutput()
})
</script>

<label {...rest} class={[{ block, disabled }, rest.class]}>
  {#if children}
    {@render children?.()}
  {:else}
    {label}
  {/if}
  <input
    type="range"
    bind:this={rangeEl}
    bind:value
    class={[
      'slider-paper',
      color ? typeClass[color] : '',
      { 'w-full': block },
      rest.class,
    ]}
    {min}
    {max}
    {step}
    {disabled}
    oninput={onInput}
  />
  {#if !hideValue}
    <output>
      {#if output}
        {@render output(value)}
      {:else}
        {outputValue}
        {#if percentage}%{/if}
      {/if}
    </output>
  {/if}
</label>
