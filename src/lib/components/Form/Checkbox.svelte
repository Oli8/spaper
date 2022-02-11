<label {...$$restProps}
       class="{$$restProps.class ?? ''} paper-check">
  <input type="checkbox"
         {value} {name}
         {disabled}
         checked={group.includes(value) || checked}
         on:focus
         on:blur
         on:change={onChange} />
  <span>{label}</span>
</label>

<script lang="ts">
import { createEventDispatcher } from 'svelte';

export let label: string = '';
export let value: string = '';
export let name: string = '';
export let group: string[] = [];
export let checked: boolean = false;
export let disabled: boolean = false;

const dispatch = createEventDispatcher();

function onChange({ target }) {
  const { value, checked: _checked } = target;
  checked = _checked;
  if (_checked) {
    group = [...group, value]
  } else {
    group = group.filter((item) => item !== value);
  }

  dispatch('change', checked);
}
</script>

<style lang="scss">
@import './style';

input[disabled] {
  + span::before, ~ span {
    @extend %disabled;
  }
}
</style>
