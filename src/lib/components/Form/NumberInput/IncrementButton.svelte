<Button {...$$restProps} {type} on:click={clickHandler}>
  +
</Button>

<script lang="ts">
  import type { PaperType } from '../../../types';
  import Button from '../../Button.svelte';

  export let clickHandler: (e: MouseEvent) => any;
  export let type: PaperType;
</script>
