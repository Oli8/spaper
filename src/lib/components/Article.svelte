<script lang="ts">
import type { Snippet } from 'svelte'
import type { HeadingLevel, StringOrSnippet } from '../types'
import { isSnippet } from '../utils'

interface Props {
  title?: StringOrSnippet
  /** Heading element for the title. */
  titleAs?: HeadingLevel
  meta?: StringOrSnippet
  textLead?: StringOrSnippet
  border?: boolean
  children?: Snippet
  footer?: Snippet
  class?: string
  [key: string]: unknown
}

let {
  title = '',
  titleAs = 'h3',
  meta = '',
  textLead = '',
  border = false,
  children,
  footer,
  class: className = '',
  ...rest
}: Props = $props()
</script>

<article
  {...rest}
  class={['article-paper', { 'border-paper': border }, className]}
>
  {#if isSnippet(title) || title}
    <svelte:element this={titleAs} class="article-paper-title">
      {#if isSnippet(title)}{@render title()}{:else}{title}{/if}
    </svelte:element>
  {/if}

  {#if isSnippet(meta) || meta}
    <p class="article-paper-meta">
      {#if isSnippet(meta)}{@render meta()}{:else}{meta}{/if}
    </p>
  {/if}

  {#if isSnippet(textLead) || textLead}
    <p class="article-paper-lead">
      {#if isSnippet(textLead)}{@render textLead()}{:else}{textLead}{/if}
    </p>
  {/if}

  {#if children}
    <p>{@render children()}</p>
  {/if}

  {#if footer}
    <footer class="flex flex-wrap">
      {@render footer()}
    </footer>
  {/if}
</article>
