<script lang="ts">
import { Collapsible } from '#lib'
import Example from '#docs/Example.svelte'
import API, { propDoc } from '#docs/API.svelte'
import Header from '#docs/Header.svelte'

const exampleCode: Record<string, string> = {
  types: `
<Collapsible label="Did you know?">
  I have a bowling personal best of 194
</Collapsible>`,
  accordion: `
<Collapsible name="sections" label="Section A" open>
  Content A
</Collapsible>
<Collapsible name="sections" label="Section B">
  Content B
</Collapsible>
<Collapsible name="sections" label="Section C">
  Content C
</Collapsible>`,
  trigger: `
<Collapsible>
  {#snippet trigger(open)}
    {open ? 'Hide' : 'Show'}
  {/snippet}
  Hey there ^_^
</Collapsible>`,
  events: `
<Collapsible label="Click me :)"
             onopen="{() => alert('Now you see me')}"
             onclose="{() => alert('Bye')}">
  Hey there ^_^
</Collapsible>`,
}

const props = [
  {
    name: 'label',
    description: 'label of the collapsible',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'open',
    description: 'State of the collapsible',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'name',
    description: 'Shared name so only one stays open',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'onopen',
    description: 'Called when opened',
    type: '() => void',
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'onclose',
    description: 'Called when closed',
    type: '() => void',
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'trigger',
    description: 'Collapsible triggering element. Receives whether it is open',
    type: 'Snippet<[boolean]>',
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'children',
    description: 'Collapsible content',
    type: propDoc.snippetType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
]
</script>

<Header name="Collapsible" legend="Easy to toggle elements" />

<section>
  <Example title="usage" code={exampleCode.types}>
    <Collapsible label="Did you know?">
      I have a bowling personal best of 194
    </Collapsible>
  </Example>

  <Example title="accordion" code={exampleCode.accordion}>
    <Collapsible name="sections" label="Section A" open>Content A</Collapsible>
    <Collapsible name="sections" label="Section B">Content B</Collapsible>
    <Collapsible name="sections" label="Section C">Content C</Collapsible>
  </Example>

  <Example title="custom content" code={exampleCode.trigger}>
    <Collapsible>
      {#snippet trigger(open)}
        {open ? 'Hide' : 'Show'}
      {/snippet}
      Hey there ^_^
    </Collapsible>
  </Example>

  <Example title="events" code={exampleCode.events}>
    <Collapsible
      label="Click me :)"
      onopen={() => alert('Now you see me')}
      onclose={() => alert('Bye')}
    >
      Hey there ^_^
    </Collapsible>
  </Example>
</section>

<section>
  <API {props} componentSource="Collapsible" />
</section>
