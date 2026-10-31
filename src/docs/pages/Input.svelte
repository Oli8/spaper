<script lang="ts">
import { Input } from '$lib'
import Example from '$docs/Example.svelte'
import API, { propDoc } from '$docs/API.svelte'
import Header from '$docs/Header.svelte'

const exampleCode: Record<string, string> = {
  example: `
<div class="flex flex-col items-start gap-4">
  <Input placeholder="Nice input" label="Input" />
  <Input value="Block level" class="w-full" />
  <Input placeholder="Disabled" disabled />
</div>`,
  textarea: `
<div class="flex flex-col items-start gap-4">
  <Input type="textarea" placeholder="..." />
  <Input type="textarea" value="no resize" noResize />
</div>`,
  validation: `
<Input
  label="Email"
  placeholder="you@example.com"
  type="email"
  valid={(val) => val.includes('@')}
/>`,
}

const props = [
  {
    name: 'label',
    description: 'Input label',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'value',
    description: 'Input value',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
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
    name: 'type',
    description: 'Input native type',
    type: propDoc.stringType,
    values:
      'text, email, number, password, search, tel, url, time, date, month, week, datetime-local, color, textarea',
    default: 'text',
  },
  {
    name: 'valid',
    description: 'Validation function',
    type: '(val: string) => boolean',
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'noResize',
    description: 'Ability to resize the textarea',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'oninput',
    description: 'Called on input',
    type: '(value: string) => void',
    values: propDoc.blank,
    default: propDoc.blank,
  },
]
</script>

<Header name="Input" />

<section>
  <Example title="example" code={exampleCode.example}>
    <div class="flex flex-col items-start gap-4">
      <Input placeholder="Nice input" label="Input" />
      <Input value="Block level" class="w-full" />
      <Input placeholder="Disabled" disabled />
    </div>
  </Example>

  <Example title="textarea" code={exampleCode.textarea}>
    <div class="flex flex-col items-start gap-4">
      <Input type="textarea" placeholder="..." />
      <Input type="textarea" value="no resize" noResize />
    </div>
  </Example>

  <Example title="validation" code={exampleCode.validation}>
    <Input
      label="Email"
      placeholder="you@example.com"
      type="email"
      valid={(val) => val.includes('@')}
    />
  </Example>
</section>

<section>
  <API {props} componentSource="Form/Input" />
</section>
