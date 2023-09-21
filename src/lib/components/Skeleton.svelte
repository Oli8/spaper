{#if active}
  {#each { length: count } as _}
    {@const borderType = Math.floor(Math.random() * 6 + 1)}
    <div {...$$restProps}
         aria-hidden="true"
         aria-valuetext={ariaValueText}
         tabindex="-1"
         role="progressbar"
         class="{$$restProps.class ?? ''} border border-{borderType} margin-small"
         class:animated
         class:circle
         class:inline>
    </div>
  {/each}
{/if}

<script lang="ts">
export let active: boolean = true;
export let count: number = 1;
export let animated: boolean = true;
export let circle: boolean = false;
export let inline: boolean = false;
export let ariaValueText: string = 'Loading...';
</script>

<style lang="scss">
:global(.dark) div {
  --mid-gradient: var(--primary-dark);
}
div {
  cursor: progress;
  border-color: transparent;
  width: var(--width, auto);
  min-height: 1rem;
  height: var(--height, 100%);
  background: var(--muted-light-10);
  background: linear-gradient(
    95deg,
    var(--muted-light-10) 5%,
    var(--mid-gradient, var(--muted-light)) 20%,
    var(--muted-light-10) 50%
  );
  background-size: 200% 100%;
  &.circle {
    border-radius: 50%;
  }
  &.inline {
    display: inline-block;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .animated {
    animation: loading 2s linear infinite alternate;
  }
}

@keyframes loading {
  to {
    background-position-x: -200%;
  }
}
</style>
