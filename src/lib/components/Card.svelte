<div {...$$restProps}
     class="{$$restProps.class ?? ''} card"
     style={`width: ${width}`}>
  {#if header || $$slots.header}
    <header class="card-header">
      {#if $$slots.header}
        <slot name="header" />
      {:else}
        {header}
      {/if}
    </header>
  {/if}

  {#if image && imagePlacement === 'top'}
    <img src={image}
         alt={imageAlt} />
  {/if}

  <div class="card-body">
    <h4 class="card-title">
      {#if $$slots.title}
        <slot name="title" />
      {:else}
        {title}
      {/if}
    </h4>
    <h5 class="card-subtitle">
      {#if $$slots.subTitle}
        <slot name="subTitle" />
      {:else}
        {subTitle}
      {/if}
    </h5>

    <p class="card-text">
      <slot />
    </p>

    {#if $$slots.bottom}
      <slot name="bottom" />
    {/if}
  </div>

  {#if image && imagePlacement === 'bottom'}
    <img src={image}
         class="image-bottom"
         alt={imageAlt} />
  {/if}

  {#if footer || $$slots.footer}
    <footer class="card-footer">
      {#if $$slots.footer}
        <slot name="footer" />
      {:else}
        {footer}
      {/if}
    </footer>
  {/if}
</div>

<script lang="ts">
import type { PositionY } from "../types";

export let title: string = '';
export let subTitle: string = '';
export let image: string = '';
export let imageAlt: string = '';
export let imagePlacement: PositionY = 'top';
export let header: string = '';
export let footer: string = '';
export let width: string = '100%';
</script>
