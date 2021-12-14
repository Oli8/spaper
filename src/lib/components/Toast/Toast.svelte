{#if active}
  <div class={`col margin-small shadow border border-${type} background-${type}`}
       bind:this={toastElement}
       in:fly={{ y: position.includes('top') ? -100 : 100 }}
       out:fade={{ duration: 300 }}
       aria-hidden={!active}
       role="alert">
    {@html message}
  </div>
{/if}

<script lang="ts">
import type { PaperType } from '../../types';
import type { ToastPosition } from './';
import ToastContainer, { containerClass } from './ToastContainer.svelte';
import { onMount } from 'svelte';
import { fly, fade } from 'svelte/transition';

export let message: string;
export let type: PaperType = 'primary';
export let duration: number = 2000;
export let position: ToastPosition = 'top-right';

let active: boolean = true;
let toastElement: HTMLDivElement;
let timeoutId: number;

$: containerSelector = `.${containerClass}.${position}`;

onMount(() => {
  insert();

  timeoutId = window.setTimeout(() => {
    // active = false;
  }, duration)

  return () => {
    clearTimeout(timeoutId);
  }
})

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

<style lang="scss">
div {
  width: 250px;
}
</style>
