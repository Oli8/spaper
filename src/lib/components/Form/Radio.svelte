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
<<<<<<< HEAD
{/if}
=======
  <span>
    {#if $$slots.default}
      <slot />
    {:else}
      {label}
    {/if}
  </span>
</label>
>>>>>>> 5b570cd (Radio: add slot support (#56))

<script lang="ts">
export let label: string = '';
export let value: string = '';
export let group: string = '';
</script>
