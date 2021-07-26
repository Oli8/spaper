{#if label}
  <label>
    {label}
    <input type="radio"
           {value}
           {...$$restProps}
           bind:group
           on:focus
           on:blur
           on:change />
  </label>
{:else}
  <input type="radio"
         {value}
         {...$$restProps}
         bind:group
         on:focus
         on:blur
         on:change />
{/if}

<script lang="ts">
export let label: string = '';
export let value: string = '';
export let group: string = '';
</script>
