<svelte:window on:keydown={handleKeydown} />

<div {...$$restProps}
     class="{$$restProps.class ?? ''} modal"
     class:active>
  <div class="modal-body">
    <CloseButton on:click={close} />
    {#if title}
      <h4 class="modal-title">{title}</h4>
    {/if}
    {#if subTitle}
      <h5 class="modal-subtitle">{subTitle}</h5>
    {/if}
    <p class="modal-text">
      {#if content}
        {content}
      {:else if component}
        <svelte:component this={component} />
      {:else}
        <slot />
      {/if}
    </p>
    <footer>
      {#if $$slots.footer}
        <slot name="footer" />
      {/if}
      <Button on:click={close}>
        {closeBtnText}
      </Button>
    </footer>
  </div>
</div>

<script lang="ts">
import { createEventDispatcher, SvelteComponent } from 'svelte';
import Button from '../Button.svelte';
import CloseButton from '../CloseButton.svelte';

export let active: boolean = false;
export let title: string = '';
export let subTitle: string = '';
export let content: string = '';
export let component: typeof SvelteComponent = null;
export let closeBtnText: string = 'Close';

const dispatch = createEventDispatcher();

function close() {
  active = false;
}

function handleKeydown({ key }) {
  if (key === 'Escape')
    close();
}

$: if (active === false) {
  dispatch('close');
}
</script>

<style lang="scss">
.modal.active {
  opacity: 1;
  visibility: visible;

  .modal-body {
    top: 50%;
  }
}
</style>
