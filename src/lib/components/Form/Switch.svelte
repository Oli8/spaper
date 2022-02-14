{#if tile}
  <label {...$$restProps}
         class="{$$restProps.class ?? ''} paper-switch-tile"
         class:disabled>
    <input bind:checked
           type="checkbox"
           {disabled}
           on:change={onChange} />
    <div class="paper-switch-tile-card border">
      <div class={`paper-switch-tile-card-front border
                   ${bgClass(tile.off.background)}`}>
        {tile.off.label}
      </div>
      <div class={`paper-switch-tile-card-back border
                   ${bgClass(tile.on.background)}`}>
        {tile.on.label}
      </div>
    </div>
  </label>
{:else}
  <label class={prefix}>
    <input id={domId}
           bind:checked
           type="checkbox"
           {disabled}
           on:change={onChange} />
    <span class="paper-switch-slider"
          class:round></span>
  </label>
  {#if $$slots.default}
    <label class={`${prefix}-label`}
           for={domId}>
      <slot />
    </label>
  {/if}
{/if}

<script lang="ts" context="module">
  let count: number = 0;
</script>

<script lang="ts">
import { onMount, createEventDispatcher } from "svelte";
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

const dispatch = createEventDispatcher();
let id: number;
onMount(() => {
  id = count++;
});

let domId: string;
$: domId = `paper-switch-input-${id}`;

let prefix;
$: prefix = 'paper-switch' + (inline ? '-2' : '');

function onChange() {
  dispatch('change', checked);
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
