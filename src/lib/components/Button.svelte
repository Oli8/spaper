{#if isLink || href}
  <a class:disabled
     role="button"
     href={href ?? 'javascript:void(0);'}
     target={external ? '_blank' : null}
     {...attr}
     on:click>
    <slot />
  </a>
{:else}
  <button {...attr}
          type={nativeType}
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
export let nativeType: 'submit'|'reset'|'button' = null;
export let isLink: boolean = false;
export let href: string = null;
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
