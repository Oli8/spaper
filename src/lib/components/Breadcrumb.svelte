<ul class="breadcrumb" class:border>
  {#each items as { text, href }}
    <li>
      {#if href}
        <a {href}>{text}</a>
      {:else}
        {text}
      {/if}
    </li>
  {/each}
</ul>

<script lang="ts">
export let border: boolean = false;
export let items: { text: string, href?: string }[] = [];
</script>
