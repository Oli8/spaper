<script lang="ts">
import { Card, Button } from '#lib'
import Example from '#docs/Example.svelte'
import API, { propDoc } from '#docs/API.svelte'
import Header from '#docs/Header.svelte'

const exampleCode: Record<string, string> = {
  usage: `
<Card title="My awesome Paper card!"
      subTitle="nice looking subtitle"
      image="https://picsum.photos/768">
  Card Content
  {#snippet bottom()}
    <Button>Check it out</Button>
  {/snippet}
</Card>`,
  imagePlacement: `
<Card title="My awesome Paper card!"
      subTitle="nice looking subtitle"
      imagePlacement="bottom"
      image="https://picsum.photos/768">
  Card Content
</Card>`,
  headerFooter: `
<Card class="rounded-paper" title="My awesome Paper card!" header="Use either props...">
  Card Content
  {#snippet footer()}or snippets :){/snippet}
</Card>`,
}

const props = [
  {
    name: 'title',
    description: 'Card title',
    type: propDoc.stringOrSnippet,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'subTitle',
    description: 'Card subtitle',
    type: propDoc.stringOrSnippet,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'image',
    description: 'Card image source',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'imageAlt',
    description: 'Card image alt attribute value',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'imagePlacement',
    description: 'Placement of the card image',
    type: propDoc.stringType,
    values: 'top | bottom',
    default: 'top',
  },
  {
    name: 'header',
    description: 'Card header text',
    type: propDoc.stringOrSnippet,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'footer',
    description: 'Card footer text',
    type: propDoc.stringOrSnippet,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'width',
    description: 'Card width',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: '100%',
  },
  {
    name: 'children',
    description: 'Card main content',
    type: propDoc.snippetType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'bottom',
    description: 'Card bottom content',
    type: propDoc.snippetType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
]
</script>

<Header name="Card" />

<section>
  <Example title="usage" code={exampleCode.usage}>
    <Card
      title="My awesome Paper card!"
      subTitle="nice looking subtitle"
      image="https://picsum.photos/768"
    >
      Card Content
      {#snippet bottom()}
        <Button>Check it out</Button>
      {/snippet}
    </Card>
  </Example>

  <Example title="image placement" code={exampleCode.imagePlacement}>
    <Card
      title="My awesome Paper card!"
      subTitle="nice looking subtitle"
      imagePlacement="bottom"
      image="https://picsum.photos/768"
    >
      Card Content
    </Card>
  </Example>

  <Example title="header and footer" code={exampleCode.headerFooter}>
    <Card
      class="rounded-paper"
      title="My awesome Paper card!"
      header="Use either props..."
    >
      Card Content
      {#snippet footer()}or snippets :){/snippet}
    </Card>
  </Example>
</section>

<section>
  <API {props} componentSource="Card" />
</section>
