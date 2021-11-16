<div class="collapsible">
  <input id={domId} type="checkbox"
         bind:checked={open}>
  <label for={domId}>
    {#if $$slots.trigger}
      <slot name="trigger" />
    {:else}
      {label}
    {/if}
  </label>
  <div class="collapsible-body">
    <slot />
  </div>
</div>

<script lang="ts" context="module">
  let count: number = 0;
</script>

<script lang="ts">
import { createEventDispatcher, onMount } from 'svelte';

export let label: string = '';
export let open: boolean = false;

let id: number;
onMount(async () => {
  id = count++;
})

const dispatch = createEventDispatcher();
const ANIMATION_DELAY: number = 235;
let eventEnabled: boolean = false;

let domId: string;
// Needs to start with 'collapsible'
$: domId = `collapsible-input-${id}`;

$: {
  // Prevent event from initialization
  if (eventEnabled) {
    setTimeout(
      dispatch.bind(this, open ? 'open' : 'close'),
      ANIMATION_DELAY
    );
  }
  eventEnabled = true;
}
</script>
