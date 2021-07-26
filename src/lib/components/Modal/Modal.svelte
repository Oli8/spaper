<svelte:window on:keydown={handleKeydown} />

<div class="modal" class:active>
  <div class="modal-body">
    <button class="btn-close"
            on:click={close}>
      X
    </button>
    {#if title}
      <h4 class="modal-title">{title}</h4>
    {/if}
    {#if subTitle}
      <h5 class="modal-subtitle">{subTitle}</h5>
    {/if}
    <p class="modal-text">
      <slot />
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
import Button from '../Button.svelte';

export let active: boolean = false;
export let title: string = '';
export let subTitle: string = '';
export let closeBtnText: string = 'Close';

function close() {
  active = false;
}

function handleKeydown({ key }) {
  if (key === 'Escape')
    close();
}
</script>

<style lang="scss">
.btn-close {
  border: 0;
  &:hover {
    // Cancel default button hover style
    box-shadow: none;
    transform: none;
  }
}
.modal.active {
  opacity: 1;
  visibility: visible;

  .modal-body {
    top: 50%;
  }
}
</style>
