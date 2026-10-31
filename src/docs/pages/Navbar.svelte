<script lang="ts">
import { Navbar, Button } from '$lib'
import Example from '$docs/Example.svelte'
import API, { propDoc } from '$docs/API.svelte'
import Header from '$docs/Header.svelte'

const exampleCode: Record<string, string> = {
  default: `
<Navbar>
  {#snippet brand()}
    <h3 class="text-xl">
      <a href="#">Brand</a>
    </h3>
  {/snippet}
  <ul class="inline">
    <li><a href="#">Documentation</a></li>
    <li><a href="#">About</a></li>
    <li>
      <Button>Github</Button>
    </li>
  </ul>
</Navbar>`,
  unsplit: `
<Navbar split={false}>
  {#snippet brand()}
    <h3 class="text-xl">
      <a href="#">Brand</a>
    </h3>
  {/snippet}
  <ul class="inline">
    <li><a href="#">Documentation</a></li>
    <li><a href="#">About</a></li>
  </ul>
</Navbar>`,
}

const props = [
  {
    name: 'border',
    description: 'Navbar border',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.trueStr,
  },
  {
    name: 'fixed',
    description: 'Navbar fixed display',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'split',
    description: 'Navbar split mode',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.trueStr,
  },
  {
    name: 'brand',
    description: 'Navbar brand/left side content',
    type: propDoc.snippetType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'children',
    description: 'Navbar body',
    type: propDoc.snippetType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
]
</script>

<Header name="Navbar" legend="Responsive navigation header" />

<section>
  <Example title="default" code={exampleCode.default} columns="2xl">
    <Navbar>
      {#snippet brand()}
        <h3 class="text-xl">
          <a href="#brand">Brand</a>
        </h3>
      {/snippet}
      <ul class="inline">
        <li><a href="#">Documentation</a></li>
        <li><a href="#">About</a></li>
        <li>
          <Button>Github</Button>
        </li>
      </ul>
    </Navbar>
  </Example>

  <Example title="not split" code={exampleCode.unsplit} columns="2xl">
    <Navbar split={false}>
      {#snippet brand()}
        <h3 class="text-xl">
          <a href="#brand">Brand</a>
        </h3>
      {/snippet}
      <ul class="inline">
        <li><a href="#">Documentation</a></li>
        <li><a href="#">About</a></li>
      </ul>
    </Navbar>
  </Example>
</section>

<section>
  <API {props} componentSource="Navbar" />
</section>
