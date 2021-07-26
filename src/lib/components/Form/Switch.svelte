{#if tile}
  <label class="paper-switch-tile"
         class:disabled>
    <input bind:checked
           type="checkbox"
           {disabled} />
    <div class="paper-switch-tile-card border">
      <div class={`paper-switch-tile-card-front
                   border
                   ${bgClass(tile.off.background)}`}>
        {tile.off.label}
      </div>
      <div class={`paper-switch-tile-card-back
                   border
                   ${bgClass(tile.on.background)}`}>
        {tile.on.label}
      </div>
    </div>
  </label>
{:else}
  <label class={prefix}>
    <input bind:this={checkbox}
           bind:checked
           type="checkbox"
           {disabled} />
    <span class="paper-switch-slider"
          class:round></span>
  </label>
  {#if $$slots.default}
    <label class={`${prefix}-label`}
           on:click={toggle}>
      <slot />
    </label>
  {/if}
{/if}

<script lang="ts">
import type { PaperType } from "../../types";

interface TileOptions {
  on: {
    label: string;
    background?: PaperType;
  },
  off: {
    label: string;
    background?: PaperType;
  },
}

export let checked: boolean = false;
export let disabled: boolean = false;
export let round: boolean = false;
export let inline: boolean = false;
export let tile: TileOptions = null;

let checkbox: HTMLInputElement;

let prefix;
$: prefix = 'paper-switch' + (inline ? '-2' : '');

function toggle() {
  if (disabled) return;
  checkbox.checked = !checkbox.checked;
}

function bgClass(color: PaperType) {
  if (!color) return;
  return `background-${color}`;
}
</script>

<style lang="scss">
@import './style';

input[disabled] + span,
.paper-switch-tile.disabled {
  @extend %disabled;
}
</style>
