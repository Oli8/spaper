<script lang="ts">
import { CopyButton } from '$lib'
import { highlight, type CodeLang } from './highlight'

interface Props {
  code: string
  lang?: CodeLang
  /** Show the copy button under the block. */
  copy?: boolean
  class?: string
}

let { code, lang = 'svelte', copy = true, class: className = '' }: Props =
  $props()

let source = $derived(code.trim())
let html = $derived(highlight(source, lang))
</script>

<div class={[className, 'min-w-0']}>
  <div class="code-block min-w-0 border-paper bg-surface overflow-hidden">
    {@html html}
  </div>
  {#if copy}
    <div class="mt-2 flex justify-end">
      <CopyButton text={source} outline="primary">Copy code</CopyButton>
    </div>
  {/if}
</div>
