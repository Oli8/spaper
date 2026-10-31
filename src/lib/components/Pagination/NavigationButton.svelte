<script lang="ts">
import Button from '../Button.svelte'
import Arrow from './Arrow.svelte'
import type { PaperSize, PaperType } from '../../types'

interface Props {
  size: PaperSize
  label: string | null
  action: 'first' | 'previous' | 'next' | 'last'
  type: PaperType
  disabled: boolean
  clickHandler: (e: MouseEvent) => any
  ariaLabel: string
}

let { size, label, action, type, disabled, clickHandler, ariaLabel }: Props =
  $props()
</script>

<Button
  {size}
  {type}
  isLink
  {disabled}
  aria-label={ariaLabel}
  onclick={clickHandler}
>
  {#if label}
    {label}
  {:else}
    <Arrow {size} {action} />
  {/if}
</Button>
