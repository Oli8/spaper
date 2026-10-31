<script lang="ts">
import { Hero, Button } from '#lib'
import Example from '#docs/Example.svelte'
import API, { propDoc } from '#docs/API.svelte'
import Header from '#docs/Header.svelte'

const exampleCode: Record<string, string> = {
  types: `
<Hero title="primary" type="primary" textLead="Text lead..." />
<Hero title="secondary" type="secondary" textLead="Text lead..." />
<Hero title="success" type="success" textLead="Text lead..." />
<Hero title="warning" type="warning" textLead="Text lead..." />
<Hero title="danger" type="danger" textLead="Text lead..." />`,
  size: `
<Hero title="small" size="small" textLead="Text lead..." />
<Hero title="default" size="default" textLead="Text lead..." />
<Hero title="large" size="large" textLead="Text lead..." />
<Hero title="fullheight" size="fullheight" textLead="Text lead..." />`,
  slots: `
<Hero type="primary">
  {#snippet title()}<h3>SPAPER</h3>{/snippet}
  {#snippet textLead()}PapierCSS components for Svelte{/snippet}

  <p>Check it out</p>
  <Button type="secondary" href="https://oli8.github.io/spaper">
    Documentation
  </Button>
</Hero>`,
  misc: `
<Hero
  type="danger"
  border={false}
  title="Hero"
  textLead="Borderless hero"
/>
<Hero
  class="border-4"
  title="spaper"
  textLead="PaperCSS components for Svelte"
  style="background:
    linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)),
    url(/bg-hero.png);
    background-size: cover;"
/>`,
}

const props = [
  {
    name: 'type',
    description: 'Type of the hero',
    type: propDoc.stringType,
    values: propDoc.paperTypes,
    default: 'primary',
  },
  {
    name: 'size',
    description: 'Size of the hero',
    type: propDoc.stringType,
    values: 'small | default | large | fullheight',
    default: 'default',
  },
  {
    name: 'border',
    description: 'Hero border',
    type: 'Boolean',
    values: propDoc.blank,
    default: 'true',
  },
  {
    name: 'title',
    description: 'Title of the hero',
    type: propDoc.stringOrSnippet,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'textLead',
    description: 'Text lead of the hero',
    type: propDoc.stringOrSnippet,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'children',
    description: 'Hero main content',
    type: propDoc.snippetType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
]
</script>

<Header name="Hero" legend="Prominent and visually striking section" />

<section>
  <Example title="types" code={exampleCode.types}>
    <Hero title="primary" type="primary" textLead="Text lead..." />
    <Hero title="secondary" type="secondary" textLead="Text lead..." />
    <Hero title="success" type="success" textLead="Text lead..." />
    <Hero title="warning" type="warning" textLead="Text lead..." />
    <Hero title="danger" type="danger" textLead="Text lead..." />
  </Example>

  <Example title="size" code={exampleCode.size}>
    <Hero title="small" size="small" textLead="Text lead..." />
    <Hero title="default" size="default" textLead="Text lead..." />
    <Hero title="large" size="large" textLead="Text lead..." />
    <Hero title="fullheight" size="fullheight" textLead="Text lead..." />
  </Example>

  <Example title="snippets" code={exampleCode.slots}>
    <Hero type="primary">
      {#snippet title()}<h3>SPAPER</h3>{/snippet}
      {#snippet textLead()}PapierCSS components for Svelte{/snippet}

      <p>Check it out</p>
      <Button type="secondary" href="https://oli8.github.io/spaper">
        Documentation
      </Button>
    </Hero>
  </Example>

  <Example title="misc" code={exampleCode.misc}>
    <Hero
      type="danger"
      border={false}
      title="Hero"
      textLead="Borderless hero"
    />
    <Hero
      class="border-4"
      title="spaper"
      textLead="PaperCSS components for Svelte"
      style="background:
            linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)),
            url(/bg-hero.png);
            background-size: cover;"
    />
  </Example>
</section>

<section>
  <API {props} componentSource="Hero" />
</section>
