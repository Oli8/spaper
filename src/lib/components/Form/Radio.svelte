<label class="paper-radio">
  <input type="radio"
         {value}
         {...$$restProps}
         bind:group
         on:focus
         on:blur
         on:change />
  <span>{label}</span>
</label>

<script lang="ts">
export let label: string = '';
export let value: string = '';
export let group: string = '';
</script>

<style lang="scss">
@import './style';

input[disabled] {
  + span::before, ~ span {
    @extend %disabled;
  }
}
</style>
