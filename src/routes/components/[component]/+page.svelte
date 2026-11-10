<script lang="ts">
import { page } from '$app/state'
import * as docs from '#docs/pages/index.js'

const pages = docs as Record<string, import('svelte').Component>
let Doc = $derived(pages[page.params.component ?? ''])
</script>

{#if Doc}
  <Doc />
{:else}
  <p>Unknown component.</p>
{/if}
