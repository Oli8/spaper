<article class="article padding-small"
         class:border>
  <h1 class="article-title">
    {#if $$slots.title}
      <slot name="title" />
    {:else}
      {title}
    {/if}
  </h1>
  <p class="article-meta">
    {#if $$slots.meta}
      <slot name="meta" />
    {:else}
      {meta}
    {/if}
  </p>
  <p class="text-lead">
    {#if $$slots.textLead}
      <slot name="textLead" />
    {:else}
      {textLead}
    {/if}
  </p>

  <p><slot /></p>

  {#if $$slots.footer}
    <footer class="row">
      <slot name="footer" />
    </footer>
  {/if}
</article>

<script lang="ts">
export let title: string = '';
export let meta: string = '';
export let textLead: string = '';
export let border: boolean = false;
</script>
