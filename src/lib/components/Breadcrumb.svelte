<script lang="ts">
interface Props {
  border?: boolean
  items?: { text: string; href?: string }[]
  [key: string]: any
}

let { border = false, items = [], ...rest }: Props = $props()
</script>

<ol
  {...rest}
  class={['breadcrumb-paper', { 'border-paper': border }, rest.class]}
>
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
