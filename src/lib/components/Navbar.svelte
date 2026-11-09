<script lang="ts">
interface Props {
  border?: boolean
  fixed?: boolean
  split?: boolean
  brand?: import('svelte').Snippet
  children?: import('svelte').Snippet
  [key: string]: any
}

let {
  border = true,
  fixed = false,
  split = true,
  brand,
  children,
  ...rest
}: Props = $props()

const uid = $props.id()

let open: boolean = $state(false)
let mobile = $state(false)

$effect(() => {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--breakpoint-paper-nav')
    .trim()
  const query = window.matchMedia(`(width < ${raw || '48rem'})`)
  const update = () => {
    mobile = query.matches
  }
  update()
  query.addEventListener('change', update)
  return () => query.removeEventListener('change', update)
})

function close() {
  open = false
}

function toggle() {
  open = !open
}

/** Close after a link/button click without making the wrapper a click target. */
function closeOnNavigate(node: HTMLElement) {
  const onClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null
    if (target?.closest('a, button')) close()
  }
  node.addEventListener('click', onClick)
  return {
    destroy() {
      node.removeEventListener('click', onClick)
    },
  }
}
</script>

<nav
  {...rest}
  class={[
    'nav-paper',
    {
      'border-paper': border,
      'nav-paper-fixed': fixed,
      'nav-paper-split': split,
    },
    rest.class,
  ]}
>
  {#if brand}
    {@render brand?.()}
  {/if}
  <div class="nav-paper-collapsible">
    <button
      type="button"
      class={['nav-paper-burger', { open }]}
      aria-label={open ? 'Close navigation' : 'Open navigation'}
      aria-expanded={open}
      aria-controls="{uid}-menu"
      onclick={toggle}
    >
      <div class="bar1"></div>
      <div class="bar2"></div>
      <div class="bar3"></div>
    </button>
    <div
      id="{uid}-menu"
      class={['nav-paper-collapsible-body', { open }]}
      inert={mobile && !open}
      use:closeOnNavigate
    >
      {@render children?.()}
    </div>
  </div>
</nav>
