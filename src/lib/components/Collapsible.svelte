<div class="collapsible">
  <label on:click={toggle}>
    {#if $$slots.trigger}
      <slot name="trigger" />
    {:else}
      {label}
    {/if}
  </label>
  <div class="collapsible-body"
       class:open>
    <slot />
  </div>
</div>

<script lang="ts">
import { createEventDispatcher } from 'svelte';

export let label: string = '';
export let open: boolean = false;

const dispatch = createEventDispatcher();
const ANIMATION_DELAY: number = 235;

function toggle() {
  open = !open;
  setTimeout(
    dispatch.bind(this, open ? 'open' : 'close'),
    ANIMATION_DELAY
  );
}
</script>

<style lang="scss">
.collapsible-body.open {
  margin: 0;
  max-height: 960px;
  opacity: 1;
  padding: 0.75rem;
}
</style>
