<script lang="ts">
import type { Snippet } from 'svelte'
import type { PositionY, StringOrSnippet } from '../types'
import { isSnippet } from '../utils'

interface Props {
  title?: StringOrSnippet
  subTitle?: StringOrSnippet
  image?: string
  imageAlt?: string
  imagePlacement?: PositionY
  header?: StringOrSnippet
  footer?: StringOrSnippet
  width?: string
  /** Root element. */
  as?: keyof HTMLElementTagNameMap
  children?: Snippet
  bottom?: Snippet
  class?: string
  [key: string]: unknown
}

let {
  title = '',
  subTitle = '',
  image = '',
  imageAlt = '',
  imagePlacement = 'top',
  header = '',
  footer = '',
  width = '100%',
  as = 'article',
  children,
  bottom,
  class: className = '',
  ...rest
}: Props = $props()

const showImage = $derived(Boolean(image))
</script>

<svelte:element
  this={as}
  {...rest}
  class={['card-paper', className]}
  style={`width: ${width}`}
>
  {#if header}
    <header class="card-paper-header">
      {#if isSnippet(header)}
        {@render header()}
      {:else}
        {header}
      {/if}
    </header>
  {/if}

  {#if showImage && imagePlacement === 'top'}
    <img class="w-full object-cover" src={image} alt={imageAlt} />
  {/if}

  <div class="card-paper-body">
    <h4 class="card-paper-title">
      {#if isSnippet(title)}
        {@render title()}
      {:else}
        {title}
      {/if}
    </h4>
    <h5 class="card-paper-subtitle">
      {#if isSnippet(subTitle)}
        {@render subTitle()}
      {:else}
        {subTitle}
      {/if}
    </h5>

    <p class="card-text">
      {@render children?.()}
    </p>

    {#if bottom}
      {@render bottom()}
    {/if}
  </div>

  {#if showImage && imagePlacement === 'bottom'}
    <img class="image-bottom w-full object-cover" src={image} alt={imageAlt} />
  {/if}

  {#if footer}
    <footer class="card-paper-footer">
      {#if isSnippet(footer)}
        {@render footer()}
      {:else}
        {footer}
      {/if}
    </footer>
  {/if}
</svelte:element>
