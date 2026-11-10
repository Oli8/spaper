<script lang="ts">
import Icon from './Icon.svelte'
import { X } from '../icons'

interface Props {
  ariaLabel?: string
  onclick?: (e: MouseEvent) => void
  [key: string]: any
}

let { ariaLabel = 'close', onclick, ...rest }: Props = $props()
</script>

<button {...rest} aria-label={ariaLabel} onclick={(e) => onclick?.(e)}>
  <Icon name={X} size={18} />
</button>

<style>
button {
  cursor: pointer;
  float: right;
  border: 0;
  padding: 0;
  background: none;
  box-shadow: none;
  transform: none;
  &:hover,
  &:focus {
    transform: none;
    box-shadow: none;
    border: 0;
  }
}
</style>
