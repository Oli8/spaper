<script lang="ts">
import type { PaperSize } from '../../types'

interface Props {
  size?: PaperSize
  children?: import('svelte').Snippet
  [key: string]: any
}

let { size = 'default', children, ...rest }: Props = $props()

const sizeClass: Record<PaperSize, string> = {
  small: 'avatar-paper-stack-sm',
  default: '',
  large: 'avatar-paper-stack-lg',
}
</script>

<div {...rest} class={['avatar-paper-stack', sizeClass[size], rest.class]}>
  {@render children?.()}
</div>
