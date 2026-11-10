<script lang="ts">
import type { PaperType } from '../types'

interface Props {
  type?: PaperType
  rounded?: boolean
  children?: import('svelte').Snippet
  [key: string]: any
}

let {
  type = 'primary',
  rounded = false,
  children,
  class: className = '',
  ...rest
}: Props = $props()

const typeClass: Record<PaperType, string> = {
  primary: 'tag-paper-primary',
  secondary: 'tag-paper-secondary',
  success: 'tag-paper-success',
  warning: 'tag-paper-warning',
  danger: 'tag-paper-danger',
}
</script>

<span
  {...rest}
  class={[
    'tag-paper',
    typeClass[type],
    { 'rounded-[30%]': rounded },
    className,
  ]}
>
  {@render children?.()}
</span>
