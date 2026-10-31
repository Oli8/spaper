<script lang="ts">
/* oxlint-disable no-useless-escape -- <\/script> must not close this block */
import { Button, Popover, Switch } from '$lib'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from '$lib/icons'
import Example from '$docs/Example.svelte'
import API, { propDoc } from '$docs/API.svelte'
import Header from '$docs/Header.svelte'

let showPopover = false

const exampleCode: Record<string, string> = {
  usage: `
<Popover label="left" position="left">
  <Button icon={ArrowLeft} aria-label="left" />
</Popover>
<Popover label="top" position="top">
  <Button icon={ArrowUp} aria-label="top" />
</Popover>
<Popover label="right" position="right">
  <Button icon={ArrowRight} aria-label="right" />
</Popover>
<Popover label="bottom" position="bottom">
  <Button icon={ArrowDown} aria-label="bottom" />
</Popover>`,
  colors: `
<Popover label="primary" type="primary">
  <Button type="primary">primary</Button>
</Popover>
<Popover label="secondary" type="secondary">
  <Button type="secondary">secondary</Button>
</Popover>
<Popover label="success" type="success">
  <Button type="success">success</Button>
</Popover>
<Popover label="warning" type="warning">
  <Button type="warning">warning</Button>
</Popover>
<Popover label="danger" type="danger">
  <Button type="danger">danger</Button>
</Popover>`,
  states: `
<script>
  let showPopover = false;
<\/script>

<div>
  <Switch bind:checked={showPopover}>Show</Switch>
</div>

<Popover label="hey"
         active={showPopover}>
  Toggle me
</Popover>
<Popover label="hey"
         always>
  Always showing
</Popover>`,
}

const props = [
  {
    name: 'label',
    description: 'Popover content',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'position',
    description: 'Popover position',
    type: propDoc.stringType,
    values: 'top | right | bottom | left',
    default: 'top',
  },
  {
    name: 'inline',
    description: 'Popover inline display',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.trueStr,
  },
  {
    name: 'type',
    description: 'Popover color',
    type: propDoc.stringType,
    values: `${propDoc.paperTypes} | muted`,
    default: 'primary',
  },
  {
    name: 'background',
    description: 'Deprecated. Use type',
    deprecated: true,
    type: propDoc.stringType,
    values: `${propDoc.paperTypes} | muted`,
    default: 'primary',
  },
  {
    name: 'active',
    description: 'Wether popover is active or not',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'always',
    description: 'Popover will always be shown',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'children',
    description: 'Popover content',
    type: propDoc.snippetType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
]
</script>

<Header name="Popover" legend="Display brief text when user hover over" />

<section>
  <Example title="usage" code={exampleCode.usage}>
    <div class="p-16">
      <Popover label="left" position="left">
        <Button icon={ArrowLeft} aria-label="left" />
      </Popover>
      <Popover label="top" position="top">
        <Button icon={ArrowUp} aria-label="top" />
      </Popover>
      <Popover label="right" position="right">
        <Button icon={ArrowRight} aria-label="right" />
      </Popover>
      <Popover label="bottom" position="bottom">
        <Button icon={ArrowDown} aria-label="bottom" />
      </Popover>
    </div>
  </Example>

  <Example title="colors" code={exampleCode.colors}>
    <div class="flex mt-4">
      <Popover label="primary" type="primary">
        <Button type="primary">primary</Button>
      </Popover>
      <Popover label="secondary" type="secondary">
        <Button type="secondary">secondary</Button>
      </Popover>
      <Popover label="success" type="success">
        <Button type="success">success</Button>
      </Popover>
    </div>
    <div class="flex">
      <Popover label="warning" type="warning">
        <Button type="warning">warning</Button>
      </Popover>
      <Popover label="danger" type="danger">
        <Button type="danger">danger</Button>
      </Popover>
    </div>
  </Example>

  <Example title="states" code={exampleCode.states}>
    <Switch bind:checked={showPopover}>Show</Switch>
    <div class="mt-16">
      <Popover label="hey" active={showPopover}>Toggle me</Popover>
      <Popover label="hey" always>Always showing</Popover>
    </div>
  </Example>
</section>

<section>
  <API {props} componentSource="Popover" />
</section>
