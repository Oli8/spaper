<Button {...$$restProps}
        aria-label={ariaLabel}
        on:click
        on:click={copy}>
  <slot />
</Button>

<script lang="ts">
import { createEventDispatcher } from 'svelte';
import Button from './Button.svelte';
import { success } from './Toast';

export let text: string;
export let successMessage: string = 'Copied!';
export let ariaLabel: string = 'Copy to clipboard';

const dispatch = createEventDispatcher();

async function copy() {
  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
    dispatch('copy', text);

    if (successMessage)
      success({
        message: successMessage,
        position: 'top',
        duration: 1000,
      });
  } catch(e) {
    console.error(e);
  }
}
</script>
