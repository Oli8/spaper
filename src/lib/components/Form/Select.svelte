{#if label}
  <label>
    {label}
    <select bind:this={selectElement}
            bind:value
            {...$$restProps}
            on:change={onChange}
            on:blur
            on:focus>
      <slot />
    </select>
  </label>
{:else}
  <select bind:this={selectElement}
          bind:value
          {...$$restProps}
          on:change={onChange}
          on:blur
          on:focus>
    <slot />
  </select>
{/if}

<script lang="ts">
import { createEventDispatcher } from 'svelte';

export let label: string = '';
export let value: string = '';

let selectElement: HTMLSelectElement;

const dispatch = createEventDispatcher();

function onChange({ target }) {
  dispatch('change', target.value);
}

$: if (selectElement && value !== undefined) {
  const options = selectElement.querySelectorAll('option')
  const opt = Array.from(options).find((opt: HTMLOptionElement) => {
    return opt.value == value
  });

  if (opt) opt.selected = true;
}
</script>
