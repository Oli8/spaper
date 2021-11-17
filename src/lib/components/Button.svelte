{#if isLink || href}
  <a {...attr}
     class:disabled
     role="button"
     {href}
     target={external ? '_blank' : '_self'}
     on:click>
    <slot />
  </a>
{:else}
  <button {...attr}
          class:disabled
          disabled={disabled}
          on:click>
    <slot />
  </button>
{/if}

<script lang="ts">
import type { Attributes, PaperSize, PaperType } from '../types';
import { computeClasses, getDomAttributes } from '../utils';

export let type: PaperType = null;
export let size: PaperSize = 'default';
export let block: boolean = false;
export let disabled: boolean = false;
export let outline: PaperType = null;
export let isLink: boolean = false;
export let href: string = 'javascript:void(0);';
export let external: boolean = false;

let attr: Attributes;
$: {
  attr = getDomAttributes({
    props: $$restProps,
    classes,
  });
}

let classes: string;
$: classes = `paper-btn ${$$restProps.class ?? ''} ${computeClasses(
  'btn', { size, block, type, outline }
)}`;
</script>
