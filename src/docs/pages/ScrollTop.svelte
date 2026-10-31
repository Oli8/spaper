<script lang="ts">
/* oxlint-disable no-useless-escape -- <\/script> must not close this block */
import { ScrollTop } from '$lib'
import { ChevronUp } from '$lib/icons'
import Example from '$docs/Example.svelte'
import API, { propDoc } from '$docs/API.svelte'
import Header from '$docs/Header.svelte'

let box: HTMLDivElement
let roundBox: HTMLDivElement
let iconBox: HTMLDivElement
let childBox: HTMLDivElement

const lines = Array.from({ length: 16 }, (_, i) => `Row ${i + 1}`)

const exampleCode = {
  usage: `
<script>
let box
<\/script>

<div class="relative h-48">
  <div bind:this={box} class="h-full overflow-y-auto p-3">
    <p>Row 1</p>
    <p>Row 2</p>
    <p>Row 3</p>
    <p>...</p>
  </div>
  <ScrollTop target={box} class="absolute!" />
</div>`,
  rounded: `
<ScrollTop target={box} rounded class="absolute!" />`,
  icon: `
<script>
import { ChevronUp } from 'spaper/icons'
<\/script>

<ScrollTop target={box}
           icon={ChevronUp}
           class="absolute!" />`,
  children: `
<ScrollTop target={box} class="absolute!">
  Top
</ScrollTop>`,
}

const props = [
  {
    name: 'target',
    description: 'Element to scroll. The page, when unset',
    type: 'HTMLElement',
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'behavior',
    description: 'Scroll animation',
    type: propDoc.stringType,
    values: 'auto | smooth | instant',
    default: 'smooth',
  },
  {
    name: 'rounded',
    description: 'Imperfect circle instead of the rectangle',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'icon',
    description: 'Icon shown in the button',
    type: 'IconNode',
    values: propDoc.blank,
    default: 'ArrowUp',
  },
  {
    name: 'ariaLabel',
    description: 'Accessibility label',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: 'To top',
  },
  {
    name: 'children',
    description: 'Replaces the default arrow icon',
    type: propDoc.snippetType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
]
</script>

<Header
  name="ScrollTop"
  legend="Appears after scrolling and returns to the top"
/>

<section>
  <Example title="usage" code={exampleCode.usage}>
    <div class="relative h-48">
      <div bind:this={box} class="h-full overflow-y-auto p-3">
        {#each lines as line}
          <p>{line}</p>
        {/each}
      </div>
      <ScrollTop target={box} class="absolute!" />
    </div>
  </Example>

  <Example title="rounded" code={exampleCode.rounded}>
    <div class="relative h-48">
      <div bind:this={roundBox} class="h-full overflow-y-auto p-3">
        {#each lines as line}
          <p>{line}</p>
        {/each}
      </div>
      <ScrollTop target={roundBox} rounded class="absolute!" />
    </div>
  </Example>

  <Example title="icon" code={exampleCode.icon}>
    <div class="relative h-48">
      <div bind:this={iconBox} class="h-full overflow-y-auto p-3">
        {#each lines as line}
          <p>{line}</p>
        {/each}
      </div>
      <ScrollTop target={iconBox} icon={ChevronUp} class="absolute!" />
    </div>
  </Example>

  <Example title="Custom content" code={exampleCode.children}>
    <div class="relative h-48">
      <div bind:this={childBox} class="h-full overflow-y-auto p-3">
        {#each lines as line}
          <p>{line}</p>
        {/each}
      </div>
      <ScrollTop target={childBox} class="absolute!">Top</ScrollTop>
    </div>
  </Example>
</section>

<section>
  <API {props} componentSource="ScrollTop" />
  <p>
    This component "extends"
    <a href="/components/Button"><code>Button</code></a>, therefore you may also
    use any of its props.
  </p>
</section>
