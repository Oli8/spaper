<section {...$$restProps}
         class={classes}
         class:border>
  <div class="hero-body">
    {#if $$slots.title}
      <slot name="title" />
    {:else}
      <h2 class="hero-title">{title}</h2>
    {/if}

    {#if $$slots.textLead || textLead}
      <p class="hero-text-lead">
        {#if $$slots.textLead}
          <slot name="textLead" />
        {:else}
          {textLead}
        {/if}
      </p>
    {/if}

    <div><slot /></div>
  </div>
</section>

<script lang="ts">
import type { PaperSize, PaperType } from '../types';
import { computeClasses } from '../utils';

type HeroSize = PaperSize | 'fullheight';

export let type: PaperType = 'primary';
export let size: HeroSize = 'default';
export let border: boolean = true;
export let title: string = '';
export let textLead: string = '';

$: classes = `hero background-${type}
  ${$$restProps.class ?? ''}
  ${computeClasses('hero', { size })}`;
</script>

<style lang="scss">
.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.5rem 3rem;
  margin-bottom: 20px;
  &-title {
    margin-block: 1rem .5rem;
  }
  &-text-lead {
    font-size: 1.25rem;
  }
  &-small {
    padding: 0 1.5rem;
  }
  &-large {
    padding: 5rem 5rem;
  }
  &-fullheight {
    min-height: 100vh;
  }
}
</style>
