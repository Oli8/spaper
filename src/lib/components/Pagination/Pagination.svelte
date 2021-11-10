<section {...$$restProps}>
  {#if navigation}
    <NavigationButton
      {size} action="previous"
      label={previousLabel}
      disabled={current <= 1}
      clickHandler={changePage.bind(null, current-1)}
      ariaLabel={ariaPreviousLabel} />
  {/if}

  {#if simple}
    {current} / {count}
  {:else}
    <ul class="padding-none">
      {#each pages as idx}
        <li>
          <Button {size} isLink
                  on:click={changePage.bind(null, idx)}
                  type={idx == current ? 'secondary' : null}
                  aria-label={ariaPageLabel?.(idx) ?? `Page ${idx}`}
                  aria-current={idx == current}>
            {idx}
          </Button>
        </li>
      {/each}
    </ul>
  {/if}

  {#if navigation}
    <NavigationButton
      {size} action="next"
      label={nextLabel}
      disabled={current >= count}
      clickHandler={changePage.bind(null, current+1)}
      ariaLabel={ariaNextLabel} />
  {/if}
</section>

<script lang="ts">
import { Button } from '$lib';
import type { PaperSize } from '$lib/types';
import NavigationButton from './NavigationButton.svelte';

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
