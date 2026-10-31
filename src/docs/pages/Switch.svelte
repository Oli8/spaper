<script lang="ts">
/* oxlint-disable no-useless-escape -- <\/script> must not close this block */
import { Switch } from '#lib'
import Example from '#docs/Example.svelte'
import API, { propDoc } from '#docs/API.svelte'
import Header from '#docs/Header.svelte'

let hq = true

let tile = {
  on: { label: 'On', background: 'success' as const },
  off: { label: 'Off', background: 'warning' as const },
}

const exampleCode: Record<string, string> = {
  example: `
<div class="flex flex-col items-start gap-4">
  <div><Switch>Square</Switch></div>
  <div><Switch round>Round</Switch></div>
  <div><Switch disabled>Disabled</Switch></div>
  <div><Switch inline>"Inline" Square</Switch></div>
  <div><Switch inline round>"Inline" Round</Switch></div>
</div>`,
  binding: `
<script>
  let hq = false;
<\/script>

<div>
  <Switch bind:checked={hq}>High Quality</Switch>
</div>
HQ {hq ? 'enabled' : 'disabled'}`,
  tile: `
<script>
  let tile = {
    on: { label: 'On', background: 'success'},
    off: { label: 'Off', background: 'warning'},
  };
<\/script>

<div>
  <Switch {tile} />
</div>
  `,
}

const props = [
  {
    name: 'checked',
    description: 'Switch state',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'disabled',
    description: 'Switch disabled state',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'round',
    description: 'Round style',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'inline',
    description: 'Inline style',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'tile',
    description: 'Tile mode',
    type: 'Object',
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'onchange',
    description: 'Called when the switch is toggled',
    type: '(checked: boolean) => void',
    values: propDoc.blank,
    default: propDoc.blank,
  },
]
</script>

<Header name="Switch" legend="Switch between two opposing states" />

<section>
  <Example title="usage" code={exampleCode.example}>
    <div class="flex flex-col items-start gap-4">
      <div><Switch>Square</Switch></div>
      <div><Switch round>Round</Switch></div>
      <div><Switch disabled>Disabled</Switch></div>
      <div><Switch inline>"Inline" Square</Switch></div>
      <div><Switch inline round>"Inline" Round</Switch></div>
    </div>
  </Example>

  <Example title="binding" code={exampleCode.binding}>
    <div class="mb-4">
      <Switch bind:checked={hq}>High Quality</Switch>
    </div>
    HQ {hq ? 'enabled' : 'disabled'}
  </Example>

  <Example title="tile" code={exampleCode.tile}>
    <Switch {tile} />
  </Example>
</section>

<section>
  <API {props} componentSource="Form/Switch" />
</section>
