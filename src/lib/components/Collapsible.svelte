<script lang="ts">
import Icon from './Icon.svelte'
import { ChevronDown } from '../icons'

interface Props {
  label?: string
  open?: boolean
  /** Shared `name` → native exclusive accordion (only one open at a time). */
  name?: string
  /** Show the expand/collapse chevron next to the trigger. */
  chevron?: boolean
  onopen?: () => void
  onclose?: () => void
  trigger?: import('svelte').Snippet<[boolean]>
  children?: import('svelte').Snippet
  [key: string]: any
}

let {
  label = '',
  open = $bindable(false),
  name = undefined,
  chevron = true,
  onopen,
  onclose,
  trigger,
  children,
  ...rest
}: Props = $props()

function onToggle(e: Event) {
  const el = e.currentTarget as HTMLDetailsElement
  open = el.open
  if (open) onopen?.()
  else onclose?.()
}
</script>

<details
  {...rest}
  class={['collapsible-paper', rest.class]}
  {name}
  bind:open
  ontoggle={onToggle}
>
  <summary class="flex! items-center justify-center gap-2">
    <span class="min-w-0">
      {#if trigger}{@render trigger(open)}{:else}{label}{/if}
    </span>
    {#if chevron}
      <Icon
        name={ChevronDown}
        size={18}
        class={[
          'shrink-0 transition-transform ease-[ease]',
          'duration-(--paper-collapsible-duration,0.3s)',
          { 'rotate-180': open },
        ]}
        aria-hidden="true"
      />
    {/if}
  </summary>
  {@render children?.()}
</details>
