<script lang="ts">
/* oxlint-disable no-useless-escape -- <\/script> must not close this block */
import { Modal, Button } from '#lib'
import Example from '#docs/Example.svelte'
import API, { propDoc } from '#docs/API.svelte'
import Header from '#docs/Header.svelte'

function showProgrammaticModal() {
  const modal = Modal.open({ title: 'Hello' })
  // Close programmatically
  setTimeout(modal.close, 2000)
}

const exampleCode: Record<string, string> = {
  usage: `
<script>
  let showModal = false;
<\/script>

<Button onclick={() => showModal = true}>
  Show
</Button>
<Modal bind:active={showModal}
       title="Modal Title"
       subTitle="Modal Subtitle">
  <p>Hey!</p>
  <p>Here is the modal content</p>
</Modal>`,
  programmatic: `
<script>
  function showProgrammaticModal() {
    const modal = Modal.open({ title: 'Hello' })
    // Close programmatically
    setTimeout(modal.close, 2000)
  }
<\/script>

<Button onclick={showProgrammaticModal}>
  Show
</Button>`,
  snippets: `
<script>
  let showRich = false;
<\/script>

<Button onclick={() => showRich = true}>
  Show
</Button>
<Modal bind:active={showRich} class="w-sm">
  {#snippet title()}
    Custom <em>title</em>
  {/snippet}
  {#snippet subTitle()}
    With a subtitle
  {/snippet}
  <p>Hey!</p>
</Modal>`,
}

let showModal = false
let showRich = false

const props = [
  {
    name: 'active',
    description: 'Modal state',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'title',
    description: 'Modal title',
    type: propDoc.stringOrSnippet,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'subTitle',
    description: 'Modal subtitle',
    type: propDoc.stringOrSnippet,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'content',
    description: 'Modal content',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'component',
    description: 'Component to be injected as the modal content',
    type: 'Svelte Component',
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'closeBtnText',
    description: 'Text of the close button',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: 'Close',
  },
  {
    name: 'onclose',
    description: 'Called when closed',
    type: '() => void',
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'children',
    description: 'Modal body',
    type: propDoc.snippetType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'footer',
    description: 'Modal footer',
    type: propDoc.snippetType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
]
</script>

<Header name="Modal" legend="Dialog overlay to include any content" />

<section>
  <Example title="usage" code={exampleCode.usage}>
    <Button onclick={() => (showModal = true)}>Show</Button>
    <Modal
      bind:active={showModal}
      title="Modal Title"
      subTitle="Modal Subtitle"
    >
      <p>Hey!</p>
      <p>Here is the modal content</p>
    </Modal>
  </Example>

  <Example title="programmatic" code={exampleCode.programmatic}>
    <Button onclick={showProgrammaticModal}>Show</Button>
  </Example>

  <Example title="snippets" code={exampleCode.snippets}>
    <Button onclick={() => (showRich = true)}>Show</Button>
    <Modal bind:active={showRich} class="w-sm">
      {#snippet title()}
        Custom <em>title</em>
      {/snippet}
      {#snippet subTitle()}
        With a subtitle
      {/snippet}
      <p>Hey!</p>
    </Modal>
  </Example>
</section>

<section class="mb-8">
  <h3 class="text-xl mb-2">Methods</h3>
  <ul>
    <li class="mb-1">
      <code> open(props) </code>
    </li>
    <li class="mb-1">
      <code> close() </code>
    </li>
  </ul>
</section>

<section>
  <API {props} componentSource="Modal/Modal" />
</section>
