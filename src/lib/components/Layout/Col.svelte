<div {...props}>
  <slot />
</div>

<script lang="ts">
  type colSpan = number | string | undefined;

  export let col: colSpan = undefined;
  export let sm: colSpan = undefined;
  export let md: colSpan = undefined;
  export let lg: colSpan = undefined;

  export let fill: boolean = false;
  export let top: boolean = false;
  export let middle: boolean = false;
  export let bottom: boolean = false;

  const breakpoints = ['col', 'sm', 'md', 'lg'];

  const breakpointClasses = [col, sm, md, lg].map((value, i) => {
    const breakpoint = breakpoints[i];
    return value === undefined
      ? ''
      : breakpoint + '-' + value;
  });

  const utilities = ['col-fill', 'align-top', 'align-middle', 'align-bottom'];

  const utilityClasses = [fill, top, middle, bottom].map(
    (value, i) => value ? utilities[i] : ''
  );

  const props = {
    ...$$restProps,
    class: [$$restProps.class, 'col', ...breakpointClasses, ...utilityClasses]
      .join(' ')
  };
</script>
