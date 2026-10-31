<script lang="ts">
import { Tag } from '$lib'
import Example from '$docs/Example.svelte'
import API, { propDoc } from '$docs/API.svelte'
import Header from '$docs/Header.svelte'

const exampleCode: Record<string, string> = {
  types: `
<Tag type="primary">PRIMARY</Tag>
<Tag type="secondary">SECONDARY</Tag>
<Tag type="success">SUCCESS</Tag>
<Tag type="warning">WARNING</Tag>
<Tag type="danger">DANGER</Tag>`,
}

const props = [
  {
    name: 'type',
    description: 'Type of the Tag',
    type: propDoc.stringType,
    values: propDoc.paperTypes,
    default: 'primary',
  },
  {
    name: 'rounded',
    description: 'Rounded border',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'children',
    description: 'Tag body',
    type: propDoc.snippetType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
]
</script>

<Header name="Tag" legend="" />

<section>
  <Example title="types" code={exampleCode.types}>
    <div class="flex flex-wrap items-center gap-2">
      <Tag type="primary">PRIMARY</Tag>
      <Tag type="secondary">SECONDARY</Tag>
      <Tag type="success">SUCCESS</Tag>
      <Tag type="warning">WARNING</Tag>
      <Tag type="danger">DANGER</Tag>
    </div>
  </Example>
</section>

<section>
  <API {props} componentSource="Tag" />
</section>
