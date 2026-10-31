<script lang="ts">
import type { PaperType } from '../../types'

interface TileSide {
  label: string
  background?: PaperType
}

interface TileOptions {
  on: TileSide
  off: TileSide
}

interface Props {
  checked?: boolean
  disabled?: boolean
  round?: boolean
  inline?: boolean
  tile?: TileOptions | null
  onchange?: (checked: boolean) => void
  children?: import('svelte').Snippet
  [key: string]: any
}

let {
  checked = $bindable(false),
  disabled = false,
  round = false,
  inline = false,
  tile = null,
  onchange,
  children,
  ...rest
}: Props = $props()

const domId = $props.id()

let switchClass = $derived(inline ? 'paper-switch-2' : 'paper-switch')
let labelClass = $derived(inline ? 'paper-switch-2-label' : 'paper-switch-label')

function handleChange() {
  onchange?.(checked)
}

const backgrounds: Record<PaperType, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
}

function bgClass(color?: PaperType) {
  if (!color) return ''
  return backgrounds[color]
}
</script>

{#if tile}
  <label
    {...rest}
    class={['paper-switch-tile', { disabled }, rest.class]}
  >
    <input bind:checked type="checkbox" {disabled} onchange={handleChange} />
    <div class="paper-switch-tile-card border-paper">
      <div
        class={[
          'paper-switch-tile-card-front',
          'border-paper',
          bgClass(tile.off.background),
        ]}
      >
        {tile.off.label}
      </div>
      <div
        class={[
          'paper-switch-tile-card-back',
          'border-paper',
          bgClass(tile.on.background),
        ]}
      >
        {tile.on.label}
      </div>
    </div>
  </label>
{:else}
  <label class={switchClass}>
    <input
      id={domId}
      bind:checked
      type="checkbox"
      {disabled}
      onchange={handleChange}
    />
    <span class={['paper-switch-slider', { round }]}></span>
  </label>
  {#if children}
    <label class={labelClass} for={domId}>
      {@render children?.()}
    </label>
  {/if}
{/if}
