<nav {...$$restProps}
     class={`${$$restProps.class ?? ''} paper-navbar`}
     class:border class:fixed
     class:split-nav={split}>
  {#if $$slots.brand}
    <div class="nav-brand">
      <slot name="brand" />
    </div>
  {/if}
  <div class="collapsible">
    <button on:click={collapse}>☰</button>
    <div class="collapsible-body" class:open>
      <slot />
    </div>
  </div>
</nav>

<script lang="ts">
export let border: boolean = true;
export let fixed: boolean = false;
export let split: boolean = true;

let open: boolean = false;

function collapse() {
  open = !open;
}
</script>

<style lang="scss">
/* Papercss removes border of buttons in .collapsible */
.collapsible {
  & > button {
    border: 2px solid var(--primary);
  }
  &-body.open {
    margin: 0;
    max-height: 960px;
    opacity: 1;
    padding: 0;
  }
}
:global(.paper-navbar li a.paper-btn) {
  display: initial;
}
</style>
