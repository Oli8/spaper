<script lang="ts">
/* oxlint-disable no-useless-escape -- <\/script> must not close this block */
import { Breadcrumb, Switch } from '#lib'
import Example from '#docs/Example.svelte'
import API, { propDoc } from '#docs/API.svelte'
import Header from '#docs/Header.svelte'

let border = false
const items = [
  {
    text: 'Spaper ',
    href: '#',
  },
  {
    text: 'Documentation',
    href: '#/start',
  },
  {
    text: 'Breadcrumb',
    href: '#/components/Breadcrumb',
  },
]

const exampleCode: Record<string, string> = {
  usage: `
  <script>
  let border = false;
  const items = [
    {
      text: 'Spaper ',
      href: '#',
    },
    {
      text: 'Documentation',
      href: '#/start',
    },
    {
      text: 'Breadcrumb',
      href: '#/components/Breadcrumb',
    },
  ];
  <\/script>

  <Switch bind:checked={border}>Border</Switch>
  <Breadcrumb {items} {border} />`,
}

const props = [
  {
    name: 'border',
    description: 'Breadcrumb border',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'items',
    description: 'Items populating the breadcrumb',
    type: propDoc.arrayType,
    values: propDoc.blank,
    default: '[]',
  },
  {
    name: 'ariaLabel',
    description: 'Accessibility label',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: 'Breadcrumb',
  },
]
</script>

<Header name="Breadcrumb" legend="Know where you are with breadcrumbs" />

<section>
  <Example title="Usage" code={exampleCode.usage}>
    <div class="mb-4">
      <Switch bind:checked={border}>Border</Switch>
    </div>
    <Breadcrumb {items} {border} />
  </Example>
</section>

<section>
  <API {props} componentSource="Breadcrumb" />
</section>
