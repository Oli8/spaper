<script lang="ts">
/* oxlint-disable no-useless-escape -- <\/script> must not close this block */
import { Input, Button, Select, Checkbox, NumberInput, Toast } from '$lib'
import { info, success, warning, danger } from '$lib/components/Toast'
import { Bell } from '$lib/icons'
import type { PaperType } from '$lib/types'
import type { ToastPosition } from '$lib/components/Toast'
import Example from '$docs/Example.svelte'
import API, { propDoc } from '$docs/API.svelte'
import Header from '$docs/Header.svelte'

let title = ''
let message = 'hey'
let duration = 2
const types = ['success', 'primary', 'secondary', 'warning', 'danger'] as const
let toastType: PaperType = 'success'
const positions = [
  'top-right',
  'bottom-right',
  'bottom-left',
  'top-left',
  'top',
  'bottom',
] as const
let toastPosition: ToastPosition = positions[0]
let pauseOnHover = false
let dismissible = false
let indefinite = false
let hideIcon = false

function displayToast() {
  Toast.open({
    hideIcon,
    title,
    message,
    type: toastType,
    duration: duration * 1000,
    position: toastPosition,
    pauseOnHover,
    dismissible,
    indefinite,
  })
}

const exampleCode: Record<string, string> = {
  usage: `
<script>
import { Toast } from 'spaper';

const positions = [ ... ]
const types = [ ... ]
let title = ''
let message = 'hey'
let duration = 2
let type = 'success'
let position = 'top-right'
let pauseOnHover = false
let dismissible = false
let indefinite = false
let hideIcon = false

function displayToast() {
  Toast.open({
    hideIcon,
    title,
    message,
    type,
    duration: duration * 1000,
    position,
    pauseOnHover,
    dismissible,
    indefinite,
  })
}
<\/script>

<div>
  <Input label="title" bind:value={title} />
  <Input label="message" bind:value={message} />
  <NumberInput label="duration (seconds)" bind:value={duration} />
  <Select bind:value={type} label="type">
    {#each types as t}
      <option value={t}>{t}</option>
    {/each}
  </Select>
  <Select bind:value={position} label="position">
    {#each positions as p}
      <option value={p}>{p}</option>
    {/each}
  </Select>
  <Checkbox bind:checked={pauseOnHover} label="Pause on hover" />
  <Checkbox bind:checked={dismissible} label="Dismissible" />
  <Checkbox bind:checked={hideIcon} label="Hide icon" />
  <Checkbox bind:checked={indefinite} label="indefinite" />

  <Button onclick={displayToast} type="secondary">
    go
  </Button>
</div>`,
  content: `
<script>
import { Toast } from 'spaper';
import { Bell } from 'spaper/icons';
<\/script>

{#snippet saved(close)}
  <div class="flex flex-col gap-2">
    File <strong>notes.txt</strong> deleted
    <Button onclick={close}>Undo</Button>
  </div>
{/snippet}

<Button onclick={() => Toast.open({ icon: Bell, content: saved, duration: 5000 })}>
  Delete
</Button>`,
  methods: `
<script>
import { Toast } from 'spaper';
<\/script>

<Button type="secondary"
        onclick={() => Toast.info("Something quite neutral, I don't know")}>
  Show
</Button>
<Button type="success"
        onclick={() => Toast.success('Transaction confirmed!')}>
  Show
</Button>
<Button type="warning"
        onclick={() => Toast.warning('Be careful with that')}>
  Show
</Button>
<Button type="danger"
        onclick={() => Toast.danger('Something went wrong :(')}>
  Show
</Button>
`,
}

const props = [
  {
    name: 'content',
    description: 'Custom content. Receives close function. Replaces message',
    type: 'Snippet<[() => void]>',
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'icon',
    description: 'Replaces the icon',
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
    name: 'title',
    description: 'Heading shown above the message',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'message',
    description: 'Notification content',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: '',
  },
  {
    name: 'type',
    description: 'Type of the notification',
    type: propDoc.stringType,
    values: propDoc.paperTypes,
    default: 'primary',
  },
  {
    name: 'duration',
    description: 'Visibility duration in milliseconds',
    type: propDoc.numberType,
    values: propDoc.blank,
    default: '2000',
  },
  {
    name: 'position',
    description: 'Which position the toast will appear',
    type: propDoc.stringType,
    values: 'top | top-right | bottom-right | bottom | bottom-left | top-left',
    default: 'top-right',
  },
  {
    name: 'pauseOnHover',
    description: 'Toast will stay visible when hovered',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'dismissible',
    description: 'Closable toast',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'indefinite',
    description: 'Toast will stay visible until dismissed',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'class',
    description: 'Class on the toast',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'closeAriaLabel',
    description: 'Accessibility label for the close button',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: 'close',
  },
  {
    name: 'onClose',
    description: 'Trigger when toast closed',
    type: '() => any',
    values: propDoc.blank,
    default: propDoc.blank,
  },
]
</script>

<Header name="Toast" legend="Display a notification message" />

{#snippet saved(close: () => void)}
  <div class="flex flex-col gap-4">
    <span>File <strong>notes.txt</strong> deleted</span>
    <Button onclick={close} class="self-start">Undo</Button>
  </div>
{/snippet}

<section>
  <Example title="usage" code={exampleCode.usage}>
    <div class="flex flex-col gap-2">
      <Input label="title" bind:value={title} />
      <Input label="message" bind:value={message} />
      <NumberInput label="duration (seconds)" bind:value={duration} />
      <Select bind:value={toastType} label="type">
        {#each types as t}
          <option value={t}>{t}</option>
        {/each}
      </Select>
      <Select bind:value={toastPosition} label="position">
        {#each positions as p}
          <option value={p}>{p}</option>
        {/each}
      </Select>
      <Checkbox bind:checked={pauseOnHover} label="Pause on hover" />
      <Checkbox bind:checked={dismissible} label="Dismissible" />
      <Checkbox bind:checked={hideIcon} label="Hide icon" />
      <Checkbox bind:checked={indefinite} label="indefinite" />

      <Button onclick={displayToast} nativeType="button" type="secondary">
        go
      </Button>
    </div>
  </Example>
</section>

<section>
  <Example title="custom content" code={exampleCode.content}>
    <Button
      onclick={() => Toast.open({ icon: Bell, content: saved, duration: 5000 })}
    >
      Delete
    </Button>
  </Example>

  <Example title="Methods" code={exampleCode.methods}>
    <Button
      type="secondary"
      onclick={() => info("Something quite neutral, I don't know")}
    >
      Show
    </Button>
    <Button type="success" onclick={() => success('Transaction confirmed!')}>
      Show
    </Button>
    <Button type="warning" onclick={() => warning('Be careful with that')}>
      Show
    </Button>
    <Button type="danger" onclick={() => danger('Something went wrong :(')}>
      Show
    </Button>
  </Example>
</section>

<section class="mb-8">
  <h3 class="text-2xl mb-2">Methods</h3>
  <ul class="list-paper">
    <li>
      <code> open(message|config) </code>
    </li>
    <li>
      <code> info(message|config) </code>
    </li>
    <li>
      <code> success(message|config) </code>
    </li>
    <li>
      <code> warning(message|config) </code>
    </li>
    <li>
      <code> warn(message|config) </code>
      <em>alias for warning</em>
    </li>
    <li>
      <code> danger(message|config) </code>
    </li>
    <li>
      <code> error(message|config) </code>
      <em>alias for danger</em>
    </li>
  </ul>
</section>

<section>
  <API {props} componentSource="Toast/Toast" />
</section>
