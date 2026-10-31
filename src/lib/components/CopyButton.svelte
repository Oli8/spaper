<script lang="ts">
import Button from './Button.svelte'
import Icon from './Icon.svelte'
import { Copy } from '../icons'
import { success } from './Toast'

interface Props {
  /** The text to copy. */
  text: string
  successMessage?: string
  ariaLabel?: string
  onclick?: (e: MouseEvent) => void
  oncopy?: (text: string) => void
  children?: import('svelte').Snippet
  [key: string]: any
}

let {
  text,
  successMessage = 'Copied!',
  ariaLabel = 'Copy to clipboard',
  onclick,
  oncopy,
  children,
  ...rest
}: Props = $props()

async function copy(e: MouseEvent) {
  onclick?.(e)
  if (!text) return

  try {
    await navigator.clipboard.writeText(text)
    oncopy?.(text)

    if (successMessage)
      success({
        message: successMessage,
        position: 'top',
        duration: 1000,
      })
  } catch (e) {
    console.error(e)
  }
}
</script>

<Button {...rest} aria-label={ariaLabel} onclick={copy}>
  {#if children}
    {@render children()}
  {:else}
    <Icon name={Copy} size={18} />
  {/if}
</Button>
