<section {...$$restProps}>
  {current}/{count}<br/>
  {#if navigation}
    <Button {size} type="secondary" isLink
            disabled={current <= 1}
            aria-label={ariaPreviousLabel}
            on:click={changePage.bind(null, current-1)}>
      {#if previousLabel}
        {previousLabel}
      {:else}
        <Arrow {size} type="left" />
      {/if}
    </Button>
  {/if}

  {#if simple}
    {current} / {count}
  {:else}
    <ul class="padding-none">
      {#each pages as idx}
        <li>
          <Button {size} isLink
                  on:click={changePage.bind(null, idx)}
                  type={idx == current && 'secondary'}
                  aria-label={ariaPageLabel?.(idx) ?? `Page ${idx}`}
                  aria-current={idx == current}>
            {idx}
          </Button>
        </li>
      {/each}
    </ul>
  {/if}

  {#if navigation}
    <Button {size} type="secondary" isLink
            disabled={current >= count}
            aria-label={ariaNextLabel}
            on:click={changePage.bind(null, current+1)}>
      {#if nextLabel}
        {nextLabel}
      {:else}
        <Arrow {size} type="right" />
      {/if}
    </Button>
  {/if}
</section>

<script lang="ts">
import { Button } from '$lib';
import type { PaperSize } from '$lib/types';
import Arrow from './Arrow.svelte';

export let count: number = 10;
export let current: number = 1;
export let size: PaperSize = 'small';
export let navigation: boolean = true;
export let simple: boolean = false;
export let previousLabel: string = null;
export let nextLabel: string = null;
export let ariaPreviousLabel: string = 'previous page';
export let ariaNextLabel: string = 'next page';
export let ariaPageLabel: (idx: number) => string = null;

let pages: number[];
$: pages = Array.from(
  { length: count },
  (_, i) => ++i
)

function changePage(val: number) {
  if (val < 1 || val > count) return;

  current = val;
  // TODO: fire event
}
</script>

<style lang="scss">
ul, li {
  display: inline;
}
ul li {
  text-indent: 0;
  &::before {
    content: "";
  }
}
</style>
