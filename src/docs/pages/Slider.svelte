<script lang="ts">
import { Slider } from '#lib'
import Example from '#docs/Example.svelte'
import API, { propDoc } from '#docs/API.svelte'
import Header from '#docs/Header.svelte'

const exampleCode: Record<string, string> = {
  example: `
<div class="flex flex-col gap-4">
  <Slider label="Note" max="10" />
  <Slider label="Volume" class="w-full" percentage />
  <Slider disabled hideValue />
</div>
`,
  colors: `
<div class="flex flex-col gap-4">
  <Slider label="primary" background="primary" />
  <Slider label="secondary" background="secondary" />
  <Slider label="success" background="success" />
  <Slider label="warning" background="warning" />
  <Slider label="danger" background="danger" />
</div>`,
  slots: `
<Slider min="0" max="4">
  Grade
  {#snippet output(value)}
    <span>{['E', 'D', 'C', 'B', 'A'][Number(value)]}</span>
  {/snippet}
</Slider>`,
}

const props = [
  {
    name: 'label',
    description: 'Slider label',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'min',
    description: 'Minimum value',
    type: propDoc.numberType,
    values: propDoc.blank,
    default: '0',
  },
  {
    name: 'max',
    description: 'Maximum value',
    type: propDoc.numberType,
    values: propDoc.blank,
    default: '100',
  },
  {
    name: 'step',
    description: 'Step amount',
    type: propDoc.numberType,
    values: propDoc.blank,
    default: '1',
  },
  {
    name: 'block',
    description: 'Deprecated. Use class="w-full"',
    deprecated: true,
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'hideValue',
    description: 'Output value display',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'value',
    description: 'Slider value',
    type: propDoc.numberType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'background',
    description: 'Slider background color',
    type: propDoc.stringType,
    values: propDoc.paperTypes,
    default: 'secondary',
  },
  {
    name: 'percentage',
    description: 'Display ouput in percentage',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'disabled',
    description: 'Slider state',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'children',
    description: 'Slider label',
    type: propDoc.snippetType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'output',
    description: 'Slider output content. Receives the current value',
    type: 'Snippet<[number | string | null]>',
    values: propDoc.blank,
    default: propDoc.blank,
  },
]
</script>

<Header name="Slider" />

<section>
  <Example title="usage" code={exampleCode.example}>
    <div class="flex flex-col gap-4">
      <Slider label="Note" max="10" />
      <Slider label="Volume" class="w-full" percentage />
      <Slider disabled hideValue />
    </div>
  </Example>

  <Example title="colors" code={exampleCode.colors}>
    <div class="flex flex-col gap-4">
      <Slider label="primary" background="primary" />
      <Slider label="secondary" background="secondary" />
      <Slider label="success" background="success" />
      <Slider label="warning" background="warning" />
      <Slider label="danger" background="danger" />
    </div>
  </Example>

  <Example title="snippets" code={exampleCode.slots}>
    <div>
      <Slider min="0" max="4">
        Grade
        {#snippet output(value)}
          <span>{['E', 'D', 'C', 'B', 'A'][Number(value)]}</span>
        {/snippet}
      </Slider>
    </div>
  </Example>
</section>

<section>
  <API {props} componentSource="Form/Slider" />
</section>
