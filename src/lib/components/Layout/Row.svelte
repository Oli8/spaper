<svelte:element
  this={as}
  {...$$restProps}
  class="{$$restProps.class ?? ''} row"
  class:flex-right={right}
  class:flex-center={center}
  class:flex-edges={edges}
  class:flex-spaces={spaces}
  class:flex-top={top}
  class:flex-middle={middle}
  class:flex-bottom={bottom}
>
  <slot />
</svelte:element>

<script lang="ts">
  export let as: keyof HTMLElementTagNameMap = 'div';
  export let right: boolean = false;
  export let center: boolean = false;
  export let edges: boolean = false;
  export let spaces: boolean = false;
  export let top: boolean = false;
  export let middle: boolean = false;
  export let bottom: boolean = false;
</script>
