<script lang="ts">
interface Props {
  label?: string
  value?: string
  onchange?: (value: string) => void
  onblur?: (e: FocusEvent) => void
  onfocus?: (e: FocusEvent) => void
  children?: import('svelte').Snippet
  [key: string]: any
}

let {
  label = '',
  value = $bindable(''),
  onchange,
  onblur,
  onfocus,
  children,
  ...rest
}: Props = $props()

let selectElement: HTMLSelectElement | undefined = $state()

function handleChange({ target }: Event) {
  onchange?.((target as HTMLSelectElement).value)
}

$effect(() => {
  if (selectElement && value !== undefined) {
    const options = selectElement.querySelectorAll('option')
    const opt = Array.from(options).find((opt: HTMLOptionElement) => {
      return opt.value == value
    })

    if (opt) opt.selected = true
  }
})
</script>

{#snippet field()}
  <select
    bind:this={selectElement}
    bind:value
    {...rest}
    class={['select-paper', rest.class]}
    onchange={handleChange}
    {onblur}
    {onfocus}
  >
    {@render children?.()}
  </select>
{/snippet}

{#if label}
  <label>
    {label}
    {@render field()}
  </label>
{:else}
  {@render field()}
{/if}
