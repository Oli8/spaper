<div class={`progress ${$$restProps.class ?? ''}`}
     class:margin-bottom={marginBottom}>
  <div class={`bar ${type} w-${cappedValue}`}
       class:striped class:infinite>
    {#if $$slots.default}
      <slot />
    {:else if showValue}
      {cappedValue}%
    {/if}
  </div>
</div>

<script lang="ts">
import type { PaperType } from "../types";

export let value: number | string = 50;
export let type: PaperType = 'primary';
export let showValue: boolean = false;
export let striped: boolean = false;
export let infinite: boolean = false;
export let marginBottom: boolean = true;

let cappedValue: number;
$: cappedValue = Math.max(Math.min(+value, 100), 0);
</script>

<style>
.bar.infinite {
  position: relative;
  animation: in-progress 3s infinite;
}

@keyframes in-progress {
  from {
    right: 100%;
  }
  to {
    right: -100%;
  }
}
</style>
