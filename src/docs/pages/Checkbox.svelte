<script lang="ts">
/* oxlint-disable no-useless-escape -- <\/script> must not close this block */
import { Checkbox } from '$lib'
import Example from '$docs/Example.svelte'
import API, { propDoc } from '$docs/API.svelte'
import Header from '$docs/Header.svelte'

let skills = ['tennis', 'songwriting', 'skateboard', 'piano']
let greatAtSvelte = false

const exampleCode: Record<string, string> = {
  types: `
<script>
  let skills = ['tennis', 'songwriting', 'skateboard', 'piano'];
  let greatAtSvelte;
<\/script>

<fieldset>
  <p>Things I'm great at:</p>
  <Checkbox label="Tennis" value="tennis"
            bind:group={skills} />
  <Checkbox label="Songwriting" value="songwriting"
            bind:group={skills} />
  <Checkbox label="Skateboard" value="skateboard"
            bind:group={skills} />
  <Checkbox label="Piano" value="piano"
            bind:group={skills} />
  <Checkbox label="Svelte" value="svelte"
            bind:group={skills} bind:checked={greatAtSvelte} />
  <div class="mb-4">
    <code>{JSON.stringify(skills)}</code>
  </div>
  Should I learn more about Svelte ?
  {!greatAtSvelte ? 'Yes!' : 'Also yes.'}
</fieldset>`,
}

const props = [
  {
    name: 'label',
    description: 'Checkbox label',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'value',
    description: 'Checkbox value',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'name',
    description: 'Checkbox name attribute value',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'group',
    description: 'Checkbox group',
    type: propDoc.arrayType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'checked',
    description: 'Checkbox state',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'disabled',
    description: 'Checkbox disabled state',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'onchange',
    description: 'Called when the checkbox is checked or unchecked',
    type: '(checked: boolean) => void',
    values: propDoc.blank,
    default: propDoc.blank,
  },
]
</script>

<Header name="Checkbox" />

<section>
  <Example title="usage" code={exampleCode.types}>
    <fieldset>
      <p>Things I'm great at:</p>
      <Checkbox label="Tennis" value="tennis" bind:group={skills} />
      <Checkbox label="Songwriting" value="songwriting" bind:group={skills} />
      <Checkbox label="Skateboard" value="skateboard" bind:group={skills} />
      <Checkbox label="Piano" value="piano" bind:group={skills} />
      <Checkbox
        label="Svelte"
        value="svelte"
        bind:group={skills}
        bind:checked={greatAtSvelte}
      />
      <Checkbox label="React" value="react" disabled />
      <div class="mb-4">
        <code>{JSON.stringify(skills)}</code>
      </div>
      Should I learn more about Svelte ?
      {!greatAtSvelte ? 'Yes!' : 'Also yes.'}
    </fieldset>
  </Example>
</section>

<section>
  <API {props} componentSource="Form/Checkbox" />
</section>
