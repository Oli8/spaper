<script lang="ts">
import { Tag } from '#lib'

interface Props {
  name: string
  legend?: string
}

let { name, legend = '' }: Props = $props()
</script>

<svelte:head>
  <title>Spaper | {name}</title>
</svelte:head>

<header class="mb-8">
  <Tag type="secondary" class="px-8! py-6!">
    <h2 class="m-0 text-5xl">{name}</h2>
  </Tag>
  {#if legend}
    <p class="mt-2 italic">{legend}</p>
  {/if}
</header>
