<script lang="ts">
interface Props {
  label?: string
  value?: string
  group?: string
  onfocus?: (e: FocusEvent) => void
  onblur?: (e: FocusEvent) => void
  onchange?: (e: Event) => void
  children?: import('svelte').Snippet
  [key: string]: any
}

let {
  label = '',
  value = '',
  group = $bindable(''),
  onfocus,
  onblur,
  onchange,
  children,
  ...rest
}: Props = $props()
</script>

<label class="paper-radio">
  <input
    type="radio"
    {value}
    {...rest}
    bind:group
    {onfocus}
    {onblur}
    {onchange}
  />
  <span>
    {#if children}
      {@render children?.()}
    {:else}
      {label}
    {/if}
  </span>
</label>
