<script lang="ts">
/* oxlint-disable no-useless-escape -- <\/script> must not close this block */
import { Button } from '#lib'
import { Bell, Bookmark, Check } from '#lib/icons.js'
import Example from '#docs/Example.svelte'
import API, { propDoc } from '#docs/API.svelte'
import Header from '#docs/Header.svelte'

const exampleCode: Record<string, string> = {
  sizings: `
  <Button size="large">Large</Button>
<Button>Default</Button>
<Button size="small">Small</Button>
<Button block>Block level</Button>`,
  icon: `
<script>
import { Button } from 'spaper';
import { Bell, Bookmark, Check } from 'spaper/icons';
<\/script>

<Button icon={Bell}>Notify</Button>
<Button type="primary" icon={Check}>Save</Button>
<Button icon={Bookmark} type="secondary" aria-label="Bookmark" />`,
  colors: `
<Button type="primary">primary</Button>
<Button type="secondary">secondary</Button>
<Button type="success">success</Button>
<Button type="warning">warning</Button>
<Button type="danger">danger</Button>`,
  outline: `
<Button outline="primary">primary</Button>
<Button outline="secondary">secondary</Button>
<Button outline="success">success</Button>
<Button outline="warning">warning</Button>
<Button outline="danger">danger</Button>`,
  disabled: `
<Button disabled>primary</Button>
<Button type="primary" disabled>primary</Button>
<Button type="secondary" disabled>secondary</Button>
<Button type="success" disabled>success</Button>
<Button type="warning" disabled>warning</Button>
<Button type="danger" disabled>danger</Button>`,
  loading: `
<Button type="secondary" loading>Please wait</Button>
<Button type="primary" loading>
  {#snippet loader()}
    <span>...</span>
  {/snippet}
  Saving…
</Button>`,
  link: `
<Button isLink href="/start">Documentation</Button>
<Button isLink external href="https://github.com/Oli8/spaper">
  GitHub
</Button>`,
}

const props = [
  {
    name: 'icon',
    description: 'Icon shown to the left of the label',
    type: 'IconNode',
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'type',
    description: 'Type of the button',
    type: propDoc.stringType,
    values: propDoc.paperTypes,
    default: propDoc.blank,
  },
  {
    name: 'size',
    description: 'Size of the button',
    type: propDoc.stringType,
    values: 'small | default | large',
    default: 'default',
  },
  {
    name: 'block',
    description: 'Display of the button',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'disabled',
    description: 'Disabled style',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'loading',
    description: 'Disabled button with a small spinner before the label',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'loader',
    description: 'Replaces the default spinner while loading',
    type: propDoc.snippetType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'outline',
    description: 'Outline style',
    type: propDoc.stringType,
    values: propDoc.paperTypes,
    default: propDoc.blank,
  },
  {
    name: 'nativeType',
    description: 'html type of button',
    type: propDoc.stringType,
    values: 'submit | reset | button',
    default: propDoc.blank,
  },
  {
    name: 'isLink',
    description: 'Use <a> element',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'href',
    description: 'href of the link',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'external',
    description: 'Open link in new tab',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'children',
    description: 'Button body',
    type: propDoc.snippetType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
]
</script>

<Header name="Button" legend="Classic buttons" />

<section>
  <Example title="sizings" code={exampleCode.sizings}>
    <Button size="large">Large</Button>
    <Button>Default</Button>
    <Button size="small">Small</Button>
    <Button block>Block level</Button>
  </Example>

  <Example title="colors" code={exampleCode.colors}>
    <Button type="primary">primary</Button>
    <Button type="secondary">secondary</Button>
    <Button type="success">success</Button>
    <Button type="warning">warning</Button>
    <Button type="danger">danger</Button>
  </Example>

  <Example title="outline" code={exampleCode.outline}>
    <Button outline="primary">primary</Button>
    <Button outline="secondary">secondary</Button>
    <Button outline="success">success</Button>
    <Button outline="warning">warning</Button>
    <Button outline="danger">danger</Button>
  </Example>

  <Example title="icon" code={exampleCode.icon}>
    <Button icon={Bell}>Notify</Button>
    <Button type="primary" icon={Check}>Save</Button>
    <Button icon={Bookmark} type="secondary" aria-label="Bookmark" />
  </Example>

  <Example title="disabled" code={exampleCode.disabled}>
    <Button disabled>default</Button>
    <Button type="primary" disabled>primary</Button>
    <Button type="secondary" disabled>secondary</Button>
    <Button type="success" disabled>success</Button>
    <Button type="warning" disabled>warning</Button>
    <Button type="danger" disabled>danger</Button>
  </Example>

  <Example title="loading" code={exampleCode.loading}>
    <Button type="secondary" loading>Please wait</Button>
    <Button type="primary" loading>
      {#snippet loader()}
        <span>...</span>
      {/snippet}
      Saving…
    </Button>
  </Example>

  <Example title="link" code={exampleCode.link}>
    <Button isLink href="/start">Documentation</Button>
    <Button isLink external href="https://github.com/Oli8/spaper">
      GitHub
    </Button>
  </Example>
</section>

<section>
  <API {props} componentSource="Button" />
</section>
