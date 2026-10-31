<script lang="ts">
import { Spinner } from '#lib'
import Example from '#docs/Example.svelte'
import API, { propDoc } from '#docs/API.svelte'
import Header from '#docs/Header.svelte'

const code = {
  sizes: `<Spinner size="small" />
<Spinner />
<Spinner size="large" />`,
  colors: `<Spinner type="primary" />
<Spinner type="secondary" />
<Spinner type="success" />
<Spinner type="warning" />
<Spinner type="danger" />
<Spinner type="muted" />`,
  inline: `Saving <Spinner inline size="small" /> ...`,
}

const props = [
  {
    name: 'active',
    description: 'Renders the spinner',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.trueStr,
  },
  {
    name: 'animated',
    description: 'Spins. When false, the indicator stays still',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.trueStr,
  },
  {
    name: 'inline',
    description: 'Sits inside a line of text',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'type',
    description: 'Color',
    type: propDoc.stringType,
    values: `${propDoc.paperTypes} | muted`,
    default: 'secondary',
  },
  {
    name: 'size',
    description: 'Size',
    type: propDoc.stringType,
    values: propDoc.paperSizes,
    default: 'default',
  },
  {
    name: 'ariaLabel',
    description: 'Accessible name',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: 'Loading...',
  },
]
</script>

<Header name="Spinner" legend="Loading indicator" />

<section>
  <Example title="sizes" code={code.sizes}>
    <Spinner size="small" />
    <Spinner />
    <Spinner size="large" />
  </Example>

  <Example title="colors" code={code.colors}>
    <Spinner type="primary" />
    <Spinner type="secondary" />
    <Spinner type="success" />
    <Spinner type="warning" />
    <Spinner type="danger" />
    <Spinner type="muted" />
  </Example>

  <Example title="inline" code={code.inline}>
    <p>Saving <Spinner inline size="small" /> ...</p>
  </Example>
</section>

<section>
  <API {props} componentSource="Spinner" />
</section>
