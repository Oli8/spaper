<script lang="ts">
/* oxlint-disable no-useless-escape -- <\/script> must not close this block */
import { Alert } from '$lib'
import { Bell } from '$lib/icons'
import Example from '$docs/Example.svelte'
import API, { propDoc } from '$docs/API.svelte'
import Header from '$docs/Header.svelte'

const exampleCode: Record<string, string> = {
  types: `
<Alert type="primary">primary</Alert>
<Alert type="secondary">secondary</Alert>
<Alert type="success">success</Alert>
<Alert type="warning">warning</Alert>
<Alert type="danger">danger</Alert>`,
  icon: `
<script>
import { Alert } from 'spaper';
import { Bell } from 'spaper/icons';
<\/script>

<Alert type="success" hideIcon>Saved</Alert>
<Alert icon={Bell}>New message</Alert>`,
  dismissible: `
<Alert type="primary" dismissible>primary</Alert>
<Alert type="secondary" dismissible>secondary</Alert>
<Alert type="success" dismissible>success</Alert>
<Alert type="warning" dismissible>warning</Alert>
<Alert type="danger" dismissible>danger</Alert>`,
}

const props = [
  {
    name: 'type',
    description: 'Type of the alert',
    type: propDoc.stringType,
    values: propDoc.paperTypes,
    default: 'primary',
  },
  {
    name: 'icon',
    description: 'Replaces the icon.',
    type: 'IconNode',
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'hideIcon',
    description: 'Hides the icon',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'dismissible',
    description: 'Closable alert',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'children',
    description: 'Alert body',
    type: propDoc.snippetType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
]
</script>

<Header
  name="Alert"
  legend="Short, important message that catches the user eye"
/>

<section>
  <Example title="types" code={exampleCode.types}>
    <Alert type="primary">primary</Alert>
    <Alert type="secondary">secondary</Alert>
    <Alert type="success">success</Alert>
    <Alert type="warning">warning</Alert>
    <Alert type="danger">danger</Alert>
  </Example>

  <Example title="icon" code={exampleCode.icon}>
    <Alert type="success" hideIcon>Saved</Alert>
    <Alert icon={Bell}>New message</Alert>
  </Example>

  <Example title="dismissible" code={exampleCode.dismissible}>
    <Alert type="primary" dismissible>primary</Alert>
    <Alert type="secondary" dismissible>secondary</Alert>
    <Alert type="success" dismissible>success</Alert>
    <Alert type="warning" dismissible>warning</Alert>
    <Alert type="danger" dismissible>danger</Alert>
  </Example>
</section>

<section>
  <API {props} componentSource="Alert" />
</section>
