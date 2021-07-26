<label class:block
       class:disabled
       {...$$restProps}>
  {#if $$slots.default}
    <slot />
  {:else}
    {label}
  {/if}
  <input type="range"
         bind:this={rangeEl}
         bind:value
         class={classes}
         {min} {max} {step}
         on:input={updateOutput} />
  {#if !hideValue}
    <output>
      {#if $$slots.output}
        <slot name="output" />
      {:else}
        {outputValue}
        {#if percentage}%{/if}
      {/if}
    </output>
  {/if}
</label>

<script lang="ts">
import { onMount } from 'svelte';
import type { PaperType } from '../../types';
import { computeClasses } from '../../utils';

export let label: string = '';
export let min: number | string = 0;
export let max: number | string = 100;
export let step: number | string = 1;
export let block: boolean = false;
export let hideValue: boolean = false;
export let value: number | string = null;
export let background: PaperType = 'secondary';
export let percentage: boolean = false;
export let disabled: boolean = false;

let rangeEl: HTMLInputElement;
let outputValue: string;

onMount(() => {
  outputValue = rangeEl.value;
})

function updateOutput({ target }) {
  outputValue = target.value;
}

let classes: string;
$: classes = `range-${background} ${computeClasses('input', { block })}`;

$: if (percentage) {
  outputValue = String(
    Math.round(
      Number(outputValue) / Number(max) * 100
    )
  );
}
</script>

<style lang="scss">
@import '../style';

label {
  &.block {
    width: 100%;
  }
  &.disabled {
    pointer-events: none;
  }
}

input {
  margin-bottom: .35rem;
}

$rules: 'webkit-slider-runnable-track', 'moz-range-track', 'ms-track';

@each $color in $colors {
  @each $rule in $rules {
    input[type='range'].range-#{$color}::-#{$rule} {
      background: var(--#{$color});
    }
  }
}
</style>
