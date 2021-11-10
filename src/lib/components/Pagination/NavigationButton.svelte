<script lang="ts">
import { Button } from '$lib';
import Arrow from './Arrow.svelte';
import type { PaperSize } from '$lib/types';

export let size: PaperSize;
export let label: string;
export let action: 'previous'|'next';
export let disabled: boolean;
export let clickHandler: (e: MouseEvent) => any;
export let ariaLabel: string;
</script>

<Button {size} type="secondary"
        isLink {disabled}
        aria-label={ariaLabel}
        on:click={clickHandler}>
  {#if label}
    {label}
  {:else}
    <Arrow {size}
      type={action === 'next' ? 'right' : 'left'} />
  {/if}
</Button>
