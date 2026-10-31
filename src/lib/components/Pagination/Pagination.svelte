<script lang="ts">
import type { Snippet } from 'svelte'
import Button from '../Button.svelte'
import Input from '../Form/Input.svelte'
import type { PaperSize, PaperType } from '../../types'
import NavigationButton from './NavigationButton.svelte'

interface Props {
  total: number
  pageSize?: number
  current?: number
  size?: PaperSize
  navigation?: boolean
  /** When true, the pagination is displayed as $page / $pageCount. */
  simple?: boolean
  bullets?: boolean
  previousLabel?: string | null
  nextLabel?: string | null
  highlightedStyle?: PaperType
  defaultStyle?: PaperType | null
  /** The number of pages to show before and after the current page. */
  rangeBetween?: number | null
  /** When true, an input is displayed to jump to a specific page. */
  jumper?: boolean
  pageLabel?: Snippet<[number]> | null
  ariaFirstLabel?: string
  ariaPreviousLabel?: string
  ariaNextLabel?: string
  ariaLastLabel?: string
  ariaPageLabel?: ((idx: number) => string) | null
  onchange?: (current: number) => void
  [key: string]: any
}

let {
  total,
  pageSize = 10,
  current = $bindable(1),
  size = 'small',
  navigation = true,
  simple = false,
  bullets = false,
  previousLabel = null,
  nextLabel = null,
  highlightedStyle = 'secondary',
  defaultStyle = null,
  rangeBetween = null,
  jumper = false,
  pageLabel = null,
  ariaFirstLabel = 'first page',
  ariaPreviousLabel = 'previous page',
  ariaNextLabel = 'next page',
  ariaLastLabel = 'last page',
  ariaPageLabel = null,
  onchange,
  ...rest
}: Props = $props()

let jumperValue = $state('')

const pageCount = $derived(Math.ceil(total / pageSize))

const pages = $derived(
  current
    ? Array.from({ length: pageCount }, (_, i) => ({
        idx: ++i,
        show: shouldDisplayButton(i),
      }))
    : [],
)

let showNavigation: boolean = $derived(navigation && !bullets)

function submitJumper({ code }: KeyboardEvent) {
  const toPage = Number(jumperValue)
  if (code !== 'Enter' || pageInvalid(toPage)) return

  changePage(toPage)
}

function pageInvalid(idx: number): boolean {
  return idx < 1 || idx > pageCount || !Number.isInteger(idx)
}

function shouldDisplayButton(idx: number): boolean {
  if (!rangeBetween || [1, pageCount].includes(idx)) return true

  return idx >= current - rangeBetween && idx <= current + rangeBetween
}

function shouldDisplayEllipsis(idx: number): boolean {
  return pages[idx - 2].show
}

function changePage(val: number) {
  if (pageInvalid(val)) return

  current = val
  onchange?.(current)
}
</script>

{#snippet pageNumber(idx: number)}
  {idx}
{/snippet}

<section
  {...rest}
  class={[
    'inline-flex flex-wrap items-center justify-center gap-1',
    rest.class,
  ]}
>
  {#if showNavigation}
    <NavigationButton
      type={highlightedStyle}
      {size}
      action="first"
      label={null}
      disabled={current <= 1}
      clickHandler={changePage.bind(null, 1)}
      ariaLabel={ariaFirstLabel}
    />
    <NavigationButton
      type={highlightedStyle}
      {size}
      action="previous"
      label={previousLabel}
      disabled={current <= 1}
      clickHandler={changePage.bind(null, current - 1)}
      ariaLabel={ariaPreviousLabel}
    />
  {/if}

  {#if simple}
    {current} / {pageCount}
  {:else}
    <ol
      class="m-0 flex list-none items-center gap-1 p-0 [&_li]:before:content-none"
    >
      {#each pages as { idx, show }}
        {#if show}
          <li class="m-0">
            <Button
              {size}
              isLink
              class={bullets ? 'rounded-full!' : ''}
              onclick={() => changePage(idx)}
              type={idx === current ? highlightedStyle : defaultStyle}
              aria-label={ariaPageLabel?.(idx) ?? `Page ${idx}`}
              aria-current={idx === current}
            >
              {#if !bullets}
                {@render (pageLabel ?? pageNumber)(idx)}
              {/if}
            </Button>
          </li>
        {:else if shouldDisplayEllipsis(idx)}
          <li class="m-0">…</li>
        {/if}
      {/each}
    </ol>
  {/if}

  {#if showNavigation}
    <NavigationButton
      type={highlightedStyle}
      {size}
      action="next"
      label={nextLabel}
      disabled={current >= pageCount}
      clickHandler={changePage.bind(null, current + 1)}
      ariaLabel={ariaNextLabel}
    />
    <NavigationButton
      type={highlightedStyle}
      {size}
      action="last"
      label={null}
      disabled={current >= pageCount}
      clickHandler={changePage.bind(null, pageCount)}
      ariaLabel={ariaLastLabel}
    />
  {/if}

  {#if jumper}
    <Input
      class="inline w-16"
      bind:value={jumperValue}
      type="number"
      placeholder="Go to"
      min="1"
      max={pageCount}
      step="1"
      onkeydown={submitJumper}
    />
  {/if}
</section>
