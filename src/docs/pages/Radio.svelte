<script lang="ts">
/* oxlint-disable no-useless-escape -- <\/script> must not close this block */
import { Radio } from '$lib'
import Example from '$docs/Example.svelte'
import API, { propDoc } from '$docs/API.svelte'
import Header from '$docs/Header.svelte'

let company: string = 'Ecocea'

const exampleCode: Record<string, string> = {
  example: `
<script>
  let company = 'Ecocea';
<\/script>

<fieldset>
  <legend>Company I want to work with</legend>
  <Radio value="Coddity" label="Coddity" bind:group={company}/>
  <Radio value="Ecocea" label="Ecocea" bind:group={company}/>
  <Radio value="Alten" label="Alten" bind:group={company} disabled/>
  <Radio value="Capgemini" label="Capgemini" bind:group={company}/>
</fieldset>
I'm gonna apply for a job at {company}`,
}

const props = [
  {
    name: 'label',
    description: 'Radio label',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'value',
    description: 'Radio value',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'group',
    description: 'Radio group',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'children',
    description: 'Radio label',
    type: propDoc.snippetType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
]
</script>

<Header name="Radio" />

<section>
  <Example title="example" code={exampleCode.example}>
    <fieldset>
      <legend>Company I want to work with</legend>
      <Radio value="Coddity" label="Coddity" bind:group={company} />
      <Radio value="Ecocea" label="Ecocea" bind:group={company} />
      <Radio value="Alten" label="Alten" bind:group={company} disabled />
      <Radio value="Capgemini" label="Capgemini" bind:group={company} />
    </fieldset>
    I'm gonna apply for a job at {company}
  </Example>
</section>

<section>
  <API {props} componentSource="Form/Radio" />
</section>
