{#if type === 'textarea'}
  <textarea {...attr}
            bind:value
            class:no-resize={noResize}
            on:input={onInput}
            on:focus
            on:blur
            on:change></textarea>
{:else if label}
  <label>
    {label}
    <input {...attr}
           bind:value
           class:border-danger={!isValid && value}
           class:border-success={isValid && value && valid}
           on:input={onInput}
           on:focus
           on:blur
           on:change />
  </label>
{:else}
  <input {...attr}
         bind:value
         class:border-danger={!isValid && value}
         class:border-success={isValid && value && valid}
         on:input={onInput}
         on:focus
         on:blur
         on:change />
{/if}

<script lang="ts">
import { createEventDispatcher } from 'svelte';
import { computeClasses, getDomAttributes } from '../../utils';
import type { InputType } from './';
import type { Attributes } from '../../types';

export let label: string = '';
export let value: string = '';
export let block: boolean = false;
export let type: InputType = 'text';
export let valid: (val: string) => boolean = null;
export let noResize: boolean = false;

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
  attr= getDomAttributes(
    $$props,
    classes,
    ['block', 'value', 'valid', 'noResize']
  );
}

let classes: string;
$: classes = `${$$restProps.class ?? ''} ${computeClasses('input', { block })}`;
</script>

<style>
label {
  width: 100%;
}
</style>
