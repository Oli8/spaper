<svelte:element
  this={as}
  {...$$restProps}
  class={classes}
  class:col-fill={fill}
  class:align-top={top}
  class:align-middle={middle}
  class:align-bottom={bottom}
>
  <slot />
</svelte:element>

<script lang="ts">
  import { computeClasses } from '../../utils';

  type colSpan = number | string | null;

  export let as: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap = 'div';
  export let col: colSpan = null;
  export let sm: colSpan = null;
  export let md: colSpan = null;
  export let lg: colSpan = null;
  export let fill: boolean = false;
  export let top: boolean = false;
  export let middle: boolean = false;
  export let bottom: boolean = false;

  $: classes = `col ${$$restProps.class ?? ''} ${computeClasses(
    'col', { col, sm, md, lg }
  )}`;
</script>
