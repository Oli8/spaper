<div class="{containerClass} {position}">
</div>

<script lang="ts">
import type { ToastPosition } from '.';
// TODO: test
import { containerClass } from '.';

export let position: ToastPosition = 'top-right';
</script>

<style lang="scss">
:global(.paper-toast-container.top > div),
:global(.paper-toast-container.bottom > div) {
  align-self: center;
}
:global(.paper-toast-container.top-right > div),
:global(.paper-toast-container.bottom-right > div) {
  align-self: end;
}

div {
  position: fixed;
  display: flex;
  width: 100%;
  padding: 2em;
  overflow: hidden;
  z-index: 1000;
  pointer-events: none;
  // TODO:
  flex-direction: column;
  // flex-direction: column-reverse;
  &.top {
    top: 0;
  }

  &.top-right {
    top: 0;
  }

  &.top-left {
    top: 0;
    left: 0;
  }

  &.bottom {
    bottom: 0;
  }

  &.bottom-right {
    bottom: 0;
  }

  &.bottom-left {
    left: 0;
    bottom: 0;
  }
}
</style>
