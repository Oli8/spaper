<section {...$$restProps}>
  {#if showNavigation}
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
    <ol class="padding-none">
      {#each pages as {idx, show}}
        <li>
          {#if show}
            <Button {size} isLink
                    class={bullets ? 'paper-pagination-btn--rounded' : ''}
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
    </ol>
  {/if}

  {#if showNavigation}
    <NavigationButton
      type={highlightedStyle}
      {size} action="next"
      label={nextLabel}
      disabled={current >= pageCount}
      clickHandler={changePage.bind(null, current+1)}
      ariaLabel={ariaNextLabel} />
  {/if}

  {#if jumper}
    <span on:keypress={submitJumper}>
      <Input class="paper-pagination-input"
             bind:value={jumperValue}
             type="number" placeholder="Go to"
             min="1" max={pageCount} step="1" />
    </span>
  {/if}
</section>

<script lang="ts">
import { createEventDispatcher } from 'svelte';
import Button from '../Button.svelte';
import Input from '../Form/Input.svelte';
import type { PaperSize, PaperType } from '../../types';
import NavigationButton from './NavigationButton.svelte';

export let total: number;
export let pageSize: number = 10;
export let current: number = 1;
export let size: PaperSize = 'small';
export let navigation: boolean = true;
export let simple: boolean = false;
export let bullets: boolean = false;
export let previousLabel: string = null;
export let nextLabel: string = null;
export let highlightedStyle: PaperType = 'secondary';
export let defaultStyle: PaperType = null;
export let rangeBetween: number = null;
export let jumper: boolean = false;
export let ariaPreviousLabel: string = 'previous page';
export let ariaNextLabel: string = 'next page';
export let ariaPageLabel: (idx: number) => string = null;

const dispatch = createEventDispatcher();

let jumperValue;

let pageCount: number;
$: pageCount = Math.ceil(total / pageSize);

let pages: { idx: number, show: boolean }[];
$: if (current) {
  pages = Array.from(
    { length: pageCount },
    (_, i) => ({ idx: ++i, show: shouldDisplayButton(i) })
  )
}

let showNavigation: boolean;
$: showNavigation = navigation && !bullets;

function submitJumper({ code }) {
  const toPage = Number(jumperValue);
  if (code !== 'Enter' || pageInvalid(toPage))
    return;

  changePage(toPage);
}

function pageInvalid(idx: number): boolean {
  return idx < 1 || idx > pageCount || !Number.isInteger(idx);
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
  if (pageInvalid(val)) return;

  current = val;
  dispatch('change', current);
}
</script>

<style lang="scss">
ol, li {
  display: inline;
}
ol li {
  text-indent: 0;
  &::before {
    content: "";
  }
}
:global(.paper-pagination-input) {
  display: inline;
  width: 4rem;
}
:global(.paper-pagination-btn--rounded) {
  border-radius: 50%;
}
</style>
