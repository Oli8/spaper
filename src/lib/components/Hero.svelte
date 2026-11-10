<script lang="ts">
import type { Snippet } from 'svelte'
import type { PaperSize, PaperType, StringOrSnippet } from '../types'
import { isSnippet } from '../utils'

type HeroSize = PaperSize | 'fullheight'
type HeroType = PaperType | 'muted'

interface Props {
  type?: HeroType
  size?: HeroSize
  border?: boolean
  title?: StringOrSnippet
  textLead?: StringOrSnippet
  children?: Snippet
  class?: string
  [key: string]: unknown
}

let {
  type = 'primary',
  size = 'default',
  border = true,
  title = '',
  textLead = '',
  children,
  class: className = '',
  ...rest
}: Props = $props()

const typeClass: Record<HeroType, string> = {
  primary: 'hero-paper-primary',
  secondary: 'hero-paper-secondary',
  success: 'hero-paper-success',
  warning: 'hero-paper-warning',
  danger: 'hero-paper-danger',
  muted: 'hero-paper-muted',
}

const sizeClass: Record<Exclude<HeroSize, 'default'>, string> = {
  small: 'hero-paper-sm',
  large: 'hero-paper-lg',
  fullheight: 'hero-paper-fullheight',
}
</script>

<section
  {...rest}
  class={[
    'hero-paper',
    typeClass[type],
    size !== 'default' ? sizeClass[size] : '',
    { 'border-0': !border },
    className,
  ]}
>
  <div class="hero-paper-body">
    {#if isSnippet(title)}
      {@render title()}
    {:else if title}
      <h2 class="hero-paper-title">{title}</h2>
    {/if}

    {#if isSnippet(textLead) || textLead}
      <p class="hero-paper-lead">
        {#if isSnippet(textLead)}
          {@render textLead()}
        {:else}
          {textLead}
        {/if}
      </p>
    {/if}

    {#if children}
      <div>{@render children()}</div>
    {/if}
  </div>
</section>
