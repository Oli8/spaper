<div {...$$restProps}
     class="{$$restProps.class ?? ''} row"
     class:flex-right={right}
     class:flex-center={center}
     class:flex-edges={edges}
     class:flex-spaces={spaces}
     class:flex-top={top}
     class:flex-middle={middle}
     class:flex-bottom={bottom}>
  <slot />
</div>

<script lang="ts">
  export let right: boolean = false;
  export let center: boolean = false;
  export let edges: boolean = false;
  export let spaces: boolean = false;
  export let top: boolean = false;
  export let middle: boolean = false;
  export let bottom: boolean = false;
</script>
