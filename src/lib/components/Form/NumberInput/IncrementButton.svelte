<script lang="ts">
import type { PaperType } from '../../../types'
import Button from '../../Button.svelte'

interface Props {
  clickHandler: (e: MouseEvent) => any
  type: PaperType
  [key: string]: any
}

let { clickHandler, type, ...rest }: Props = $props()
</script>

<Button {...rest} {type} onclick={clickHandler}>+</Button>
