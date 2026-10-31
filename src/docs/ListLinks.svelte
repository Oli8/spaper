<script lang="ts">
import { page } from '$app/state'
import { resolve } from '$app/paths'
import { Tag } from '$lib'
import type { PaperType } from '$lib/types'

interface Props {
  items?: string[]
}

let { items = [] }: Props = $props()

const badges: Record<string, { label: string; type: PaperType }> = {
  Avatar: { label: 'NEW', type: 'success' },
  Divider: { label: 'NEW', type: 'success' },
  Icon: { label: 'NEW', type: 'success' },
  Spinner: { label: 'NEW', type: 'success' },
  ScrollTop: { label: 'NEW', type: 'success' },
  Tag: { label: 'Updated', type: 'warning' },
}
</script>

{#each items as item}
  {@const href = resolve('/components/[component]', { component: item })}
  {@const badge = badges[item]}
  <li>
    <a
      {href}
      class={[
        'no-underline',
        page.url.pathname === href && 'text-secondary',
        page.url.pathname === href && 'font-bold',
      ]}
    >
      {item}
      {#if badge}
        <Tag type={badge.type} class="ml-1 align-middle text-xs"
          >{badge.label}</Tag
        >
      {/if}
    </a>
  </li>
{/each}
