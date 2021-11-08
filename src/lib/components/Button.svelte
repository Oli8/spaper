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
import type { Attributes } from '$lib/types';
import type { PaperSize, PaperType } from '../types/index';
import { computeClasses, getDomAttributes } from '../utils';

export let type: PaperType = null;
export let size: PaperSize = 'default';
export let block: boolean = false;
export let disabled: boolean = false;
export let outline: PaperType = null;
export let isLink: boolean = false;
export let href: string = '';
export let external: boolean = false;

let attr: Attributes;
$: {
  const toOmit = [
    'type', 'size', 'block', 'outline',
    'isLink', 'external', 'disabled',
  ];
  attr = getDomAttributes({
    props: $$props,
    classes,
    toOmit,
  });
}

let classes: string;
$: classes = `paper-btn ${$$restProps.class ?? ''} ${computeClasses(
  'btn', { size, block, type, outline }
)}`;
</script>
