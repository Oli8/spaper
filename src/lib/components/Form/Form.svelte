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

<style lang="scss">
form {
  /* NOTE: set back PaperCSS margins for our structure
    <label> being parent of <input> instead of a sibling */
  :global(label) { margin-block-end: 0 }
  :global(input) { margin-block-start: .5rem }
}
</style>
