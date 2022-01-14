{#if tile}
  <label class="paper-switch-tile"
         class:disabled>
    <input bind:checked
           bind:this={checkboxElement}
           type="checkbox"
           {disabled} />
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
           bind:this={checkboxElement}
           type="checkbox"
           {disabled} />
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

let checkboxElement;
const dispatch = createEventDispatcher();
let id: number;
onMount(() => {
  id = count++;
  checkboxElement.addEventListener('change', (e) => {
    dispatch('change', checked);
  })
});

let domId: string;
$: domId = `paper-switch-input-${id}`;

let prefix;
$: prefix = 'paper-switch' + (inline ? '-2' : '');

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
