{#if active}
  <div class={`col margin-small shadow border border-${type} background-${type}`}
       bind:this={toastElement}
       on:mouseenter={pause}
       on:mouseleave={dismiss}
       in:fly={{ y: position.includes('top') ? -100 : 100 }}
       out:fade={{ duration: 300 }}
       role="alert">
    {@html message}
    {#if dismissible||indefinite}
      <CloseButton class="paper-toast-btn-close" on:click={close} />
    {/if}
  </div>
{/if}

<script lang="ts">
import type { PaperType } from '../../types';
import type { ToastPosition } from './';
import ToastContainer, { containerClass } from './ToastContainer.svelte';
import CloseButton from '../CloseButton.svelte';
import { onMount } from 'svelte';
import { fly, fade } from 'svelte/transition';

export let message: string;
export let type: PaperType = 'primary';
export let duration: number = 2000;
export let position: ToastPosition = 'top-right';
export let pauseOnHover: boolean = false;
export let dismissible: boolean = false;
export let indefinite: boolean = false;
export let onClose: Function = null;

let active: boolean = true;
let toastElement: HTMLDivElement;
let timeoutId: number;

$: containerSelector = `.${containerClass}.${position}`;

onMount(() => {
  insert();

  if (!indefinite) {
    timeoutId = window.setTimeout(close, duration);
  }

  if (timeoutId) {
    return () => clearTimeout(timeoutId);
  }
})

function pause() {
  if (!pauseOnHover||indefinite) return;
  clearTimeout(timeoutId);
}

function dismiss() {
  if (!pauseOnHover||indefinite) return;
  close();
}

function close() {
  active = false;
  onClose?.();
}

function setupContainer(): HTMLDivElement {
  new ToastContainer({
    target: document.body,
    props: { position },
  })

  return document.querySelector(containerSelector);
}

function insert() {
  const container = document.querySelector(containerSelector) || setupContainer();
  container.insertAdjacentElement('afterbegin', toastElement);
}
</script>

<style>
div {
  width: 250px;
}
</style>
