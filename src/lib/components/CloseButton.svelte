<button {...$$restProps}
        class="{$$restProps.class ?? ''} btn-close"
        aria-label={ariaLabel}
        on:click>
  X
</button>

<script lang="ts">
export let ariaLabel: string = 'close';
</script>

<style>
button {
  float: right;
  border: 0;
  padding: 0;
  background: none;
  box-shadow: none;
  transform: none;
}
</style>
