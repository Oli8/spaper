<script lang="ts">
import CodeBlock from './CodeBlock.svelte'

interface Props {
  title: string
  code: string
  /** Kept so older doc pages can still pass it. Layout is a fixed two-column grid. */
  codeWidth?: number
  /** Viewport from which the preview and the code sit side by side. */
  columns?: 'md' | '2xl'
  children?: import('svelte').Snippet
}

let {
  title,
  code,
  codeWidth: _codeWidth = 6,
  columns = 'md',
  children,
}: Props = $props()

let gridClass = $derived(
  columns === '2xl' ? '2xl:grid-cols-2' : 'md:grid-cols-2',
)
</script>

<section class="mb-10">
  <h3 class="mb-3 text-xl">- {title}</h3>
  <div class="grid min-w-0 items-start gap-4 {gridClass}">
    <div class="min-w-0 overflow-x-auto border-paper p-4">
      {@render children?.()}
    </div>
    <CodeBlock {code} />
  </div>
</section>
