<script lang="ts">
import { Input } from '$lib'
import Header from '$docs/Header.svelte'
import ListLinks from '$docs/ListLinks.svelte'
import {
  topComponents,
  formComponents,
  bottomComponents,
} from '$docs/nav'

let query = $state('')

function match(names: string[]) {
  const q = query.trim().toLowerCase()
  if (!q) return names
  return names.filter((name) => name.toLowerCase().includes(q))
}

let top = $derived(match(topComponents))
let form = $derived(match(formComponents))
let bottom = $derived(match(bottomComponents))
let empty = $derived(top.length + form.length + bottom.length === 0)
</script>

<Header name="Components" legend="Every Spaper component" />

<Input bind:value={query} placeholder="Filter" class="mb-8" />

{#if empty}
  <p>No component matches.</p>
{:else}
  {#if top.length}
    <ul class="list-paper mb-6 text-xl">
      <ListLinks items={top} />
    </ul>
  {/if}
  {#if form.length}
    <h3 class="mb-2 text-xl">Form</h3>
    <ul class="list-paper mb-6 text-xl">
      <ListLinks items={form} />
    </ul>
  {/if}
  {#if bottom.length}
    <ul class="list-paper text-xl">
      <ListLinks items={bottom} />
    </ul>
  {/if}
{/if}
