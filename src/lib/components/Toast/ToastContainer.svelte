<div class="{containerClass} {position}">
</div>

<script lang="ts" context="module">
export const containerClass = 'paper-toast-container';
</script>

<script lang="ts">
import type { ToastPosition } from './';

export let position: ToastPosition = 'top-right';
</script>

<style lang="scss">
:global(.paper-toast-container:is(.top, .bottom) > div)  {
  align-self: center;
}
:global(.paper-toast-container:is([class*=right]) > div)  {
  align-self: end;
}

div {
  height: 0;
  position: fixed;
  display: flex;
  width: 100%;
  padding: 2em;
  z-index: 9999;
  flex-direction: column;

  &[class*=top] {
    top: 0;
  }

  &[class*=bottom] {
    bottom: 0;
    flex-direction: column-reverse;
  }

  &[class*=left] {
    left: 0;
  }
}
</style>
