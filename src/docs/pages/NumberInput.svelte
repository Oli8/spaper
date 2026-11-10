<script lang="ts">
/* oxlint-disable no-useless-escape -- <\/script> must not close this block */
import { NumberInput } from '#lib'
import Example from '#docs/Example.svelte'
import API, { propDoc } from '#docs/API.svelte'
import Header from '#docs/Header.svelte'

let value = 8
let minMax = 5
let stepValue = 500
let noControls = 5
let controlsType = 5
let balance = 62_217.84
let duration = 6.5

function formatToHour(value: number | null) {
  const n = value ?? 0
  const hours = Math.floor(n)
  const minutes = (n - hours) * 60
  return `${hours}h${minutes < 10 ? '0' : ''}${Math.round(minutes)}`
}

const exampleCode: Record<string, string> = {
  example: `
<script>
  let value = 8
<\/script>

<div>
  <NumberInput bind:value={value} label="Input" />
</div>`,
  controls: `
<script>
  let minMax = 5
  let stepValue = 500
  let noControls = 5
  let controlsType = 5
<\/script>

<div>
  <NumberInput
    bind:value={minMax}
    label="Min - Max boundaries"
    min={0}
    max={10}
  />
  <NumberInput
    bind:value={stepValue}
    label="Step"
    step={100}
  />
  <NumberInput
    bind:value={noControls}
    label="No controls"
    controls={false}
  />
  <NumberInput
    bind:value={controlsType}
    label="Controls type"
    controlsType="primary"
  />
</div>`,
  formatting: `
<script>
  let balance = 62_217.84
  let duration = 6.5

  function formatToHour(value: number) {
    const hours = Math.floor(value);
    const minutes = (value - hours) * 60;
    return \`$\{hours}h$\{minutes < 10 ? '0' : ''}$\{Math.round(minutes)}\`;
  }
<\/script>

<div>
  <NumberInput
    label="US Locale"
    bind:value={balance}
    format="en-US"
    prefix="$"
  />
  <NumberInput
    label="User Locale"
    bind:value={balance}
    format="locale"
  />
  <NumberInput
    label="Custom formatting"
    bind:value={duration}
    step={0.25}
    min={0}
    format={formatToHour}
  />
</div>`,
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
    name: 'step',
    description: 'The step size for increment/decrement operations',
    type: propDoc.numberType,
    values: propDoc.blank,
    default: '1',
  },
  {
    name: 'min',
    description: 'Minimum value allowed',
    type: propDoc.numberType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'max',
    description: 'Maximum value allowed',
    type: propDoc.numberType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'disabled',
    description: 'Disables the NumberInput component',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: 'false',
  },
  {
    name: 'controls',
    description: 'Determines if increment/decrement controls are visible',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: 'true',
  },
  {
    name: 'controlsType',
    description: 'Type of the increment/decrement controls',
    type: propDoc.stringType,
    values: propDoc.paperTypes,
    default: 'secondary',
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
    name: 'valid',
    description: 'Validation function',
    type: '(val: string) => boolean',
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'prefix',
    description: 'Prefix to be displayed before the value',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'suffix',
    description: 'Suffix to be displayed after the value',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'format',
    description:
      'Locale identifier or formatting function for displaying the value',
    type: 'string | ((val: number | null) => string) | null',
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'formatOptions',
    description: 'Options for number formatting',
    type: 'Intl.NumberFormatOptions',
    values: propDoc.blank,
    default: propDoc.blank,
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

<Header name="NumberInput" legend="Input component for numerical value" />

<section>
  <Example title="example" code={exampleCode.example}>
    <div>
      <NumberInput bind:value label="Input" />
    </div>
  </Example>

  <Example title="controls" code={exampleCode.controls}>
    <div class="form-col">
      <NumberInput
        bind:value={minMax}
        label="Min - Max boundaries"
        min={0}
        max={10}
      />
      <NumberInput bind:value={stepValue} label="Step" step={100} />
      <NumberInput
        bind:value={noControls}
        label="No controls"
        controls={false}
      />
      <NumberInput
        bind:value={controlsType}
        label="Controls type"
        controlsType="primary"
      />
    </div>
  </Example>

  <Example title="formatting" code={exampleCode.formatting}>
    <div class="form-col">
      <NumberInput
        label="US Locale"
        bind:value={balance}
        format="en-US"
        prefix="$"
      />
      <NumberInput label="User Locale" bind:value={balance} format="locale" />
      <NumberInput
        label="Custom formatting"
        bind:value={duration}
        step={0.25}
        min={0}
        format={formatToHour}
      />
    </div>
  </Example>
</section>

<section>
  <API {props} componentSource="Form/NumberInput/NumberInput" />
</section>

<style>
:global(.form-col) {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
