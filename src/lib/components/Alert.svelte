<div {...$$restProps}
     class={classes}
     class:closed class:dismissible
     role="alert">
  <slot />
  {#if dismissible}
    <span class="btn-close" on:click={close}>X</span>
  {/if}
</div>

<script lang="ts">
import type { PaperType } from '../types/index';
import { computeClasses } from '../utils';

export let type: PaperType = 'primary';
export let dismissible: boolean = false;

let closed: boolean = false;

function close(): void {
  closed = true;
}

$: classes = `${$$restProps.class ?? ''} alert ${computeClasses('alert', { type })}`;
</script>

<style lang="scss">
.alert {
  transition: all .25s ease-out;
  &.closed {
    border-width: 0;
    margin: 0;
    max-height: 0;
    opacity: 0;
    padding-bottom: 0;
    padding-top: 0;
  }
}
</style>
