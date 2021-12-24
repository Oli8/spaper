<button {...$$restProps}
        class="{$$restProps.class ?? ''} btn-close"
        aria-label={ariaLabel}
        on:click>
  X
</button>

<script lang="ts">
export let ariaLabel: string = 'close';
</script>

<style lang="scss">
button {
  float: right;
  border: 0;
  padding: 0;
  background: none;
  box-shadow: none;
  transform: none;
  &:hover, &:focus {
    transform: none;
    box-shadow: none;
    border: 0;
  }
}
</style>
