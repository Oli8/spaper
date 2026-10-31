<script lang="ts">
import { CopyButton } from '$lib'
import Example from '$docs/Example.svelte'
import API, { propDoc } from '$docs/API.svelte'
import Header from '$docs/Header.svelte'

const exampleCode: Record<string, string> = {
  usage: `
<CopyButton text="ssssspaper" />

<CopyButton text="ssssspaper">
  Copy
</CopyButton>`,
}

const props = [
  {
    name: 'text',
    description: 'Text to copy',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'successMessage',
    description:
      'Toast content shown when copying, diasbled with a falsy value',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: 'Copied!',
  },
  {
    name: 'ariaLabel',
    description: 'Accessibility label',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: 'Copy to clipboard',
  },
  {
    name: 'oncopy',
    description: 'Called when the text is copied',
    type: '(text: string) => void',
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'children',
    description: 'Button body',
    type: propDoc.snippetType,
    values: propDoc.blank,
    default: 'Copy icon',
  },
]
</script>

<Header name="CopyButton" legend="A button to copy text to clipboard" />

<section>
  <Example title="usage" code={exampleCode.usage}>
    <div class="flex flex-col gap-4">
      <CopyButton text="ssssspaper" />
      <CopyButton text="ssssspaper">Copy</CopyButton>
    </div>
  </Example>
</section>

<section>
  <API {props} componentSource="CopyButton" />
  <p>
    This component "extends"
    <a href="/components/Button"><code>Button</code></a>, therefore you may also
    use any of its props.
  </p>
</section>
