<span {...$$restProps}
      aria-label={ariaLabel}
      on:click>
  X
</span>

<script lang="ts">
export let ariaLabel: string = 'close';
</script>

<style>
span {
  cursor: pointer;
  float: right;
}
</style>
