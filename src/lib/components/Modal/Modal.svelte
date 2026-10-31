<script lang="ts">
import type { Component } from 'svelte'
import type { StringOrSnippet } from '../../types'
import { isSnippet } from '../../utils'
import Button from '../Button.svelte'
import Icon from '../Icon.svelte'
import { X } from '../../icons'

interface Props {
  active?: boolean
  title?: StringOrSnippet
  subTitle?: StringOrSnippet
  content?: string
  component?: Component | null
  closeBtnText?: string
  onclose?: () => void
  children?: import('svelte').Snippet
  footer?: import('svelte').Snippet
  [key: string]: any
}

let {
  active = $bindable(false),
  title = '',
  subTitle = '',
  content = '',
  component = null,
  closeBtnText = 'Close',
  onclose,
  children,
  footer,
  ...rest
}: Props = $props()

let dialogEl: HTMLDialogElement | undefined = $state()

export function close() {
  active = false
}

function onNativeClose() {
  active = false
  onclose?.()
}

function onBackdropClick(e: MouseEvent) {
  if (e.target === dialogEl) close()
}

$effect(() => {
  if (dialogEl) {
    if (active && !dialogEl.open) dialogEl.showModal()
    else if (!active && dialogEl.open) dialogEl.close()
  }
})
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
  bind:this={dialogEl}
  {...rest}
  class={[
    'modal-paper',
    'border-paper',
    'rounded-paper',
    'shadow-paper',
    rest.class,
  ]}
  onclick={onBackdropClick}
  onclose={onNativeClose}
>
  <form method="dialog">
    <button
      type="submit"
      class="modal-paper-close inline-flex items-center justify-center"
      aria-label="Close"
    >
      <Icon name={X} size={20} />
    </button>
  </form>

  {#if title}
    <h4 class="modal-title font-paper-heading mt-0 mb-2 text-2xl">
      {#if isSnippet(title)}
        {@render title()}
      {:else}
        {title}
      {/if}
    </h4>
  {/if}
  {#if subTitle}
    <h5 class="modal-subtitle text-secondary mb-2 mt-0">
      {#if isSnippet(subTitle)}
        {@render subTitle()}
      {:else}
        {subTitle}
      {/if}
    </h5>
  {/if}

  <div class="modal-text mb-4">
    {#if content}
      {content}
    {:else if component}
      {@const Dynamic = component}
      <Dynamic />
    {:else}
      {@render children?.()}
    {/if}
  </div>

  <footer class="flex flex-wrap items-center justify-end gap-2">
    {#if footer}
      {@render footer?.()}
    {/if}
    <Button onclick={close}>
      {closeBtnText}
    </Button>
  </footer>
</dialog>
