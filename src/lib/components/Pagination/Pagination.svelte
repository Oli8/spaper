<section {...$$restProps}>
  {#if navigation}
    <NavigationButton
      type={highlightedStyle}
      {size} action="previous"
      label={previousLabel}
      disabled={current <= 1}
      clickHandler={changePage.bind(null, current-1)}
      ariaLabel={ariaPreviousLabel} />
  {/if}

  {#if simple}
    {current} / {pageCount}
  {:else}
    <ul class="padding-none">
      {#each pages as {idx, show}}
        <li>
          {#if show}
            <Button {size} isLink
                    on:click={changePage.bind(null, idx)}
                    type={idx === current ? highlightedStyle : defaultStyle}
                    aria-label={ariaPageLabel?.(idx) ?? `Page ${idx}`}
                    aria-current={idx === current}>
              {idx}
            </Button>
          {:else if shouldDisplayEllipsis(idx)}
            …
          {/if}
        </li>
      {/each}
    </ul>
  {/if}

  {#if navigation}
    <NavigationButton
      type={highlightedStyle}
      {size} action="next"
      label={nextLabel}
      disabled={current >= pageCount}
      clickHandler={changePage.bind(null, current+1)}
      ariaLabel={ariaNextLabel} />
  {/if}
</section>

<script lang="ts">
import { createEventDispatcher } from 'svelte';
import type { PaperSize, PaperType } from '$lib/types';
import { Button } from '$lib';
import NavigationButton from './NavigationButton.svelte';

export let total: number;
export let pageSize: number = 10;
export let current: number = 1;
export let size: PaperSize = 'small';
export let navigation: boolean = true;
export let simple: boolean = false;
export let previousLabel: string = null;
export let nextLabel: string = null;
export let highlightedStyle: PaperType = 'secondary';
export let defaultStyle: PaperType = null;
export let rangeBetween: number = null;
export let ariaPreviousLabel: string = 'previous page';
export let ariaNextLabel: string = 'next page';
export let ariaPageLabel: (idx: number) => string = null;

const dispatch = createEventDispatcher();

let pageCount: number;
$: pageCount = Math.ceil(total / pageSize);

let pages: { idx: number, show: boolean }[];
$: if (current) {
  pages = Array.from(
    { length: pageCount },
    (_, i) => ({ idx: ++i, show: shouldDisplayButton(i) })
  )
}

function shouldDisplayButton(idx: number): boolean {
  if (!rangeBetween || [1, pageCount].includes(idx))
    return true;

  return idx >= (current - rangeBetween)
      && idx <= (current + rangeBetween);
}

function shouldDisplayEllipsis(idx: number): boolean {
  return pages[idx-2].show;
}

function changePage(val: number) {
  if (val < 1 || val > pageCount) return;

  current = val;
  dispatch('change', current);
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
