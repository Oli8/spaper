<script lang="ts">
interface Props {
  border?: boolean
  items?: { text: string; href?: string }[]
  ariaLabel?: string
  [key: string]: any
}

let {
  border = false,
  items = [],
  ariaLabel = 'Breadcrumb',
  ...rest
}: Props = $props()
</script>

<nav
  {...rest}
  class={['breadcrumb-paper', { 'border-paper': border }, rest.class]}
  aria-label={ariaLabel}
>
  <ol>
    {#each items as { text, href }}
      <li>
        {#if href}
          <a {href}>{text}</a>
        {:else}
          {text}
        {/if}
      </li>
    {/each}
  </ol>
</nav>
