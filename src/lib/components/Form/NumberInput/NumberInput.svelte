{#if label}
  <div class="number-input-wrapper">
    {#if controls}
      <DecrementButton
        clickHandler={() => value -= step}
        type={controlsType}
        disabled={!canDecrement}
      />
    {/if}
    <label>
      {label}
      <input {...attr}
             inputmode="numeric"
             bind:value={formattedValue}
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
    {#if controls}
      <IncrementButton
        clickHandler={() => value += step}
        type={controlsType}
        disabled={!canIncrement}
      />
    {/if}
  </div>
{:else}
  <div class="number-input-wrapper">
    {#if controls}
      <DecrementButton
        clickHandler={() => value -= step}
        type={controlsType}
        disabled={!canDecrement}
      />
    {/if}
    <input {...attr}
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
    {#if controls}
      <IncrementButton
        clickHandler={() => value += step}
        type={controlsType}
        disabled={!canIncrement}
      />
    {/if}
  </div>
{/if}

<script lang="ts">
import { createEventDispatcher } from 'svelte';
import { DecrementButton, IncrementButton } from './';
import { computeClasses, getDomAttributes } from '../../../utils';
import type { Attributes, PaperType } from '../../../types';

export let label: string = '';
export let value: number | null = null;
export let step: number = 1;
export let min: number | null = null;
export let max: number | null = null;
export let disabled: boolean = false;
export let controls: boolean = true;
export let controlsType: PaperType = 'secondary';
export let block: boolean = false;
export let valid: ((val: number | null) => boolean) | null = null;
export let prefix: string = '';
export let suffix: string = '';
export let format: string | ((val: number | null) => string) | null = null;
export let formatOptions: Intl.NumberFormatOptions | undefined = undefined

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
$: canDecrement = !disabled && (min !== null ? value - step >= min : true);
$: canIncrement = !disabled && (max !== null ? value + step <= max : true);

let formattedValue: string = ''
$: if (value) {
  formattedValue = String(value)

  if (format) {
    if (typeof format === 'string') {
      formattedValue = new Intl.NumberFormat(
        format === 'locale' ? undefined : format,
        formatOptions
      ).format(value)
    } else {
      formattedValue = format(value)
    }
  }

  formattedValue = [
    prefix,
    formattedValue,
    suffix,
  ].join(' ')
}
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
</style>
