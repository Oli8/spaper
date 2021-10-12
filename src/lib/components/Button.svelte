{#if isLink || href}
  <a class={classes}
     class:disabled
     role="button"
     {href}
     target={external ? '_blank' : '_self'}
     on:click>
    <slot />
  </a>
{:else}
  <button class={classes}
          class:disabled
          disabled={disabled}
          on:click>
    <slot />
  </button>
{/if}

<script lang="ts">
import type { PaperSize, PaperType } from '../types/index';
import { computeClasses } from '../utils';

export let type: PaperType = null;
export let size: PaperSize = 'default';
export let block: boolean = false;
export let disabled: boolean = false;
export let outline: PaperType = null;
export let isLink: boolean = false;
export let href: string = '';
export let external: boolean = false;

let classes: string;
$: classes = `paper-btn ${computeClasses(
  'btn', { size, block, type, outline }
)}`;
</script>
