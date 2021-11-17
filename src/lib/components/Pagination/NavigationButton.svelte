<Button {size} {type}
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

<script lang="ts">
import Button from '../Button.svelte';
import Arrow from './Arrow.svelte';
import type { PaperSize, PaperType } from '../../types';

export let size: PaperSize;
export let label: string;
export let action: 'previous'|'next';
export let type: PaperType;
export let disabled: boolean;
export let clickHandler: (e: MouseEvent) => any;
export let ariaLabel: string;
</script>
