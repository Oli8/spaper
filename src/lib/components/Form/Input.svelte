<script lang="ts">
import { getDomAttributes } from '../../utils'
import type { InputType } from './'
import type { Attributes } from '../../types'

interface Props {
  label?: string
  value?: string
  /** @deprecated Use `class="w-full"` instead. */
  block?: boolean
  type?: InputType
  /** Receives the value and returns `true` if it is valid. */
  valid?: ((val: string) => boolean) | null
  /** For textarea, does not allow resizing. */
  noResize?: boolean
  class?: string
  oninput?: (value: string) => void
  onfocus?: (e: FocusEvent) => void
  onblur?: (e: FocusEvent) => void
  onchange?: (e: Event) => void
  [key: string]: unknown
}

let {
  label = '',
  value = $bindable(''),
  block = false,
  type = 'text',
  valid = null,
  noResize = false,
  class: className = '',
  oninput,
  onfocus,
  onblur,
  onchange,
  ...rest
}: Props = $props()

const isTextarea = $derived(type === 'textarea')
const isValid = $derived(valid ? valid(value) : true)

const classes = $derived([
  isTextarea ? 'textarea-paper' : 'input-paper',
  {
    'w-full': block,
    'border-danger': !isTextarea && !isValid && !!value,
    'border-success': !isTextarea && isValid && !!value && !!valid,
    'resize-none': isTextarea && noResize,
  },
  className,
])

const attr: Attributes = $derived(
  getDomAttributes({
    props: { ...rest, type },
    classes: '',
    toOmit: [
      'block',
      'value',
      'valid',
      'noResize',
      'label',
      'oninput',
      'onfocus',
      'onblur',
      'onchange',
    ],
  }),
)

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement | HTMLTextAreaElement
  oninput?.(target.value)
}
</script>

{#snippet field()}
  <input
    {...attr}
    class={classes}
    bind:value
    oninput={handleInput}
    {onfocus}
    {onblur}
    {onchange}
  />
{/snippet}

{#if isTextarea}
  <textarea
    {...attr}
    class={classes}
    bind:value
    oninput={handleInput}
    {onfocus}
    {onblur}
    {onchange}></textarea>
{:else if label}
  <label>
    {label}
    {@render field()}
  </label>
{:else}
  {@render field()}
{/if}
