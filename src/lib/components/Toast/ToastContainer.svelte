<script lang="ts" module>
export const containerClass = 'toast-paper-container'
</script>

<script lang="ts">
import { onMount } from 'svelte'
import type { ToastPosition } from './'

interface Props {
  position?: ToastPosition
}

let { position = 'top' }: Props = $props()

let viewportStyle = $state('')

onMount(() => {
  const mobile = window.matchMedia('(max-width: 768px)')

  function sync() {
    if (!mobile.matches) {
      viewportStyle = ''
      return
    }

    const vv = window.visualViewport
    if (!vv) {
      viewportStyle = ''
      return
    }

    viewportStyle = [
      `top:${vv.offsetTop}px`,
      `left:${vv.offsetLeft}px`,
      `width:${vv.width}px`,
      `height:${vv.height}px`,
    ].join(';')
  }

  sync()

  const vv = window.visualViewport
  vv?.addEventListener('scroll', sync)
  vv?.addEventListener('resize', sync)
  mobile.addEventListener('change', sync)

  return () => {
    vv?.removeEventListener('scroll', sync)
    vv?.removeEventListener('resize', sync)
    mobile.removeEventListener('change', sync)
  }
})
</script>

<div class={[containerClass, position]} style={viewportStyle}></div>

<style>
:global(.toast-paper-container:is(.top, .bottom) > div) {
  align-self: center;
}
:global(.toast-paper-container:is([class*='right']) > div) {
  align-self: end;
}
:global(
  .toast-paper-container:is([class*='left']):not(.top):not(.bottom) > div
) {
  align-self: start;
}
:global(.toast-paper-container > div) {
  flex-shrink: 0;
  pointer-events: auto;
}

div {
  position: fixed;
  inset-inline: 0;
  display: flex;
  width: 100%;
  max-height: 100vh;
  max-height: 100dvh;
  padding: max(1rem, env(safe-area-inset-top, 0px))
    max(1rem, env(safe-area-inset-right, 0px))
    max(1rem, env(safe-area-inset-bottom, 0px))
    max(1rem, env(safe-area-inset-left, 0px));
  gap: 0.5rem;
  z-index: 9999;
  flex-direction: column;
  pointer-events: none;
  box-sizing: border-box;
  overflow: visible;

  &[class*='top'] {
    top: 0;
  }

  &[class*='bottom'] {
    bottom: 0;
    flex-direction: column-reverse;
  }
}
</style>
