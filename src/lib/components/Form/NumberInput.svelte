{#if label}
  <div class="number-input-wrapper">
    <Button type="secondary"
            on:click={() => value -= step}
            disabled={!canDecrement}>
      -
    </Button>
    <label>
      {label}
      <input {...attr}
             type="number"
             inputmode="numeric"
             bind:value
             class:border-danger={!isValid && value}
             class:border-success={isValid && value && valid}
             aria-valuemin={min}
             aria-valuemax={max}
             aria-valuenow={value}
             on:input={onInput}
             on:focus
             on:blur
             on:change />
    </label>
    <Button type="secondary"
            on:click={() => value += step}
            disabled={!canIncrement}>
      +
    </Button>
  </div>
{:else}
  <div class="number-input-wrapper">
    <Button type="secondary"
            on:click={() => value -= step}
            disabled={!canDecrement}>
      -
    </Button>
    <input {...attr}
           type="number"
           inputmode="numeric"
           bind:value
           class:border-danger={!isValid && value}
           class:border-success={isValid && value && valid}
           aria-valuemin={min}
           aria-valuemax={max}
           aria-valuenow={value}
           on:input={onInput}
           on:focus
           on:blur
           on:change />
    <Button type="secondary"
            on:click={() => value += step}
            disabled={!canIncrement}>
      +
    </Button>
  </div>
{/if}

<script lang="ts">
import { createEventDispatcher, onMount } from 'svelte';
import Button from '../Button.svelte';
import { computeClasses, getDomAttributes } from '../../utils';
import type { Attributes } from '../../types';

export let label: string = '';
export let value: number | null = null;
export let step: number = 1;
export let min: number | null = null;
export let max: number | null = null;
export let disabled: boolean = false;
export let block: boolean = false;
export let valid: ((val: number | null) => boolean) | null = null;

const dispatch = createEventDispatcher();

function onInput({ target }) {
  dispatch('input', target.value);
}

let isValid: boolean = true;
$: if (valid) {
  isValid = valid(value);
}

let attr: Attributes;
$: {
  attr = getDomAttributes({
    props: $$props,
    classes,
    toOmit: ['block', 'value', 'valid', 'noResize', 'min', 'max']
  });
}

let classes: string;
$: classes = `${$$restProps.class ?? ''} ${computeClasses('input', { block })}`;
$: canDecrement = !disabled && min !== null ? value - step >= min : true;
$: canIncrement = !disabled && max !== null ? value + step <= max : true;
</script>

<style lang="scss">
:global(.number-input-wrapper) {
  display: flex;
  gap: .25rem;
  :global(.paper-btn) {
    align-self: flex-end;
    padding: .5rem;
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input { -moz-appearance: textfield; }
</style>
