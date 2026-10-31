<script lang="ts">
/* oxlint-disable no-useless-escape -- <\/script> must not close this block */
import { Progress } from '$lib'
import Example from '$docs/Example.svelte'
import API, { propDoc } from '$docs/API.svelte'
import Header from '$docs/Header.svelte'

let progress = 80
setTimeout(() => {
  progress = 100
}, 2000)

const exampleCode: Record<string, string> = {
  usage: `
<Progress value="0" />
<Progress value="20" type="primary" />
<Progress value="40" type="secondary" />
<Progress value="60" type="success" />
<Progress value="80" type="warning" />
<Progress value="100" type="danger" />`,
  striped: `
<Progress striped />
<Progress striped type="secondary" />
<Progress striped type="success" />
<Progress striped type="warning" />
<Progress striped type="danger" />`,
  labels: `
<script>
  let progress = 80;
  setTimeout(() => {
    progress= 100;
  }, 2000);
<\/script>

<Progress showValue />
<Progress showValue value="90" />
<Progress value={progress}
          striped type="warning">
  Progress: {progress}%
</Progress>`,
  indeterminate: `
<Progress indeterminate />
<Progress indeterminate striped type="warning" />`,
}

const props = [
  {
    name: 'value',
    description: 'Progress value',
    type: propDoc.numberType,
    values: propDoc.blank,
    default: '50',
  },
  {
    name: 'type',
    description: 'Progress type',
    type: propDoc.stringType,
    values: propDoc.paperTypes,
    default: 'primary',
  },
  {
    name: 'showValue',
    description: 'Wether to show value/label or not',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'striped',
    description: 'Striped style',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'indeterminate',
    description: 'Loops the bar. Ignores value',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'infinite',
    description: 'Deprecated. Use indeterminate',
    deprecated: true,
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'marginBottom',
    description: 'Deprecated. Use class="mb-4"',
    deprecated: true,
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.trueStr,
  },
  {
    name: 'children',
    description: 'Progress bar content / label',
    type: propDoc.snippetType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
]
</script>

<Header name="Progress" legend="Display the length of a process" />

<section>
  <Example title="basic usage" code={exampleCode.usage}>
    <Progress value="0" />
    <Progress value="20" type="primary" />
    <Progress value="40" type="secondary" />
    <Progress value="60" type="success" />
    <Progress value="80" type="warning" />
    <Progress value="100" type="danger" />
  </Example>

  <Example title="striped" code={exampleCode.striped}>
    <Progress striped />
    <Progress striped type="secondary" />
    <Progress striped type="success" />
    <Progress striped type="warning" />
    <Progress striped type="danger" />
  </Example>

  <Example title="labels" code={exampleCode.labels}>
    <Progress showValue />
    <Progress showValue value="90" />
    <Progress value={progress} striped type="warning">
      Progress: {progress}%
    </Progress>
  </Example>

  <Example title="indeterminate" code={exampleCode.indeterminate}>
    <Progress indeterminate />
    <Progress indeterminate striped type="warning" />
  </Example>
</section>

<section>
  <API {props} componentSource="Progress" />
</section>
