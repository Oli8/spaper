<script lang="ts">
import type { Attributes, PaperSize, PaperType } from '../types'
import type { IconNode } from '../icons'
import { getDomAttributes } from '../utils'
import Icon from './Icon.svelte'
import Spinner from './Spinner.svelte'

interface Props {
  type?: PaperType | null
  /** Icon shown to the left of the label. */
  icon?: IconNode | null
  size?: PaperSize
  block?: boolean
  disabled?: boolean
  loading?: boolean
  outline?: PaperType | null
  /**
   * The `type` attribute for `<button>`. Useful for forms.
   * Ignored if rendered as a link.
   */
  nativeType?: 'submit' | 'reset' | 'button' | null
  /** When true, the button is rendered as an `<a>` element. */
  isLink?: boolean
  href?: string | null
  /** When true and `isLink` is set,
   * adds `target="_blank"` and `rel="noopener noreferrer"`
   * to the link for external navigation.
   */
  external?: boolean
  onclick?: (e: MouseEvent) => void
  children?: import('svelte').Snippet
  /** Replaces the default spinner while `loading` is set. */
  loader?: import('svelte').Snippet
  [key: string]: any
}

let {
  type = null,
  icon = null,
  size = 'default',
  block = false,
  disabled = false,
  loading = false,
  outline = null,
  nativeType = null,
  isLink = false,
  href = null,
  external = false,
  onclick,
  children,
  loader,
  ...rest
}: Props = $props()

const sizeClass: Record<PaperSize, string> = {
  small: 'btn-paper-sm',
  default: '',
  large: 'btn-paper-lg',
}

const iconSize: Record<PaperSize, number> = {
  small: 16,
  default: 18,
  large: 28,
}

const typeClass: Record<PaperType, string> = {
  primary: 'btn-paper-primary',
  secondary: 'btn-paper-secondary',
  success: 'btn-paper-success',
  warning: 'btn-paper-warning',
  danger: 'btn-paper-danger',
}

const outlineClass: Record<PaperType, string> = {
  primary: 'btn-paper-primary-outline',
  secondary: 'btn-paper-secondary-outline',
  success: 'btn-paper-success-outline',
  warning: 'btn-paper-warning-outline',
  danger: 'btn-paper-danger-outline',
}

const inactive = $derived(disabled || loading)
const spinnerType = $derived(outline ?? type ?? 'secondary')
const classes = $derived([
  'btn-paper',
  sizeClass[size],
  { 'btn-paper-block': block },
  type && typeClass[type],
  outline && outlineClass[outline],
  { disabled: inactive },
  rest.class,
])
const attr: Attributes = $derived(
  getDomAttributes({
    props: rest,
    classes: '',
    toOmit: ['class'],
  }),
)

function handleClick(e: MouseEvent) {
  if (inactive) e.preventDefault()
  onclick?.(e)
}

function linkRel(rel: unknown) {
  const tokens = new Set(
    (typeof rel === 'string' ? rel : '').split(/\s+/).filter(Boolean),
  )
  tokens.add('noopener')
  tokens.add('noreferrer')
  return [...tokens].join(' ')
}

const anchorRel = $derived(
  external
    ? linkRel(attr.rel)
    : typeof attr.rel === 'string'
      ? attr.rel
      : undefined,
)
</script>

{#snippet content()}
  {#if loading || icon}
    <span class="inline-flex items-center gap-2 align-middle">
      {#if loading}
        {#if loader}
          {@render loader()}
        {:else}
          <Spinner
            type={spinnerType}
            size="small"
            inline
            ariaLabel=""
            aria-hidden="true"
          />
        {/if}
      {/if}
      {#if icon}
        <Icon name={icon} size={iconSize[size]} class="shrink-0" />
      {/if}
      {@render children?.()}
    </span>
  {:else}
    {@render children?.()}
  {/if}
{/snippet}

{#if isLink || href}
  <a
    role="button"
    href={href ?? 'javascript:void(0);'}
    target={external ? '_blank' : null}
    aria-busy={loading || undefined}
    {...attr}
    class={classes}
    rel={anchorRel}
    onclick={handleClick}
  >
    {@render content()}
  </a>
{:else}
  <button
    {...attr}
    class={classes}
    type={nativeType}
    disabled={inactive}
    aria-busy={loading || undefined}
    onclick={handleClick}
  >
    {@render content()}
  </button>
{/if}
