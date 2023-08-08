<div {...props}>
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

  const utilities = ['flex-right', 'flex-center', 'flex-edges', 'flex-spaces', 'flex-top', 'flex-middle', 'flex-bottom'];

  const utilityClasses = [right, center, edges, spaces, top, middle, bottom].map(
    (value, i) => value ? utilities[i] : ''
  );

  const props = {
    ...$$restProps,
    class: [
      $$restProps.class,
      'row',
      ...utilityClasses
    ].join(' ')
  };
</script>
