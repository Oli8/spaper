<form {...$$restProps}
      class="{$$restProps.class ?? ''} form-group"
      on:submit|preventDefault
      on:click
      on:keydown
      on:mouseover
      on:mouseenter
      on:mouseleave
      on:focus>
  <slot />
</form>
