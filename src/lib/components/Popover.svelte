<div { ...{[`popover-${position}`]: label} }
     class={`${$$restProps.class} ${bgClass(background)}`}
     class:inline
     class:active={always || active}>
  <slot />
</div>

<script lang="ts">
import type { PaperType } from "../types";

export let label: string = '';
export let position: 'top' | 'right' | 'bottom' | 'left' = 'top';
export let inline: boolean = true;
export let background: PaperType = 'primary';
export let active: boolean = false;
export let always: boolean = false;

function bgClass(color: PaperType) {
  return `popover-${color}`;
}
</script>

<style lang="scss">
@import './style';

.inline {
  display: inline;
}

@each $color in $colors {
  [popover-top], [popover-right],
  [popover-bottom], [popover-left] {
    &.popover-#{$color}::after {
      background-color: var(--#{$color});
    }
  }
}

[popover-top], [popover-right],
[popover-bottom], [popover-left] {
  margin: 0;
  &.active::after {
    opacity: 1;
  }
}
</style>
