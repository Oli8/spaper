<script lang="ts">
/* oxlint-disable no-useless-escape -- <\/script> must not close this block */
import { fade } from 'svelte/transition'
import { CloseButton } from '#lib'
import Example from '#docs/Example.svelte'
import API, { propDoc } from '#docs/API.svelte'
import Header from '#docs/Header.svelte'

let show = true

const exampleCode: Record<string, string> = {
  usage: `
<script>
  import { fade } from 'svelte/transition';

  let show = true;
<\/script>

{#if show}
  <div class="m-4 p-4 border-paper-5 border-primary" out:fade>
    <CloseButton onclick={() => show = false} />
    Hey there
  </div>
{/if}`,
}

const props = [
  {
    name: 'ariaLabel',
    description: 'Accessibility label',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: 'Close',
  },
  {
    name: 'onclick',
    description: 'Called when the button is clicked',
    type: '(event: MouseEvent) => void',
    values: propDoc.blank,
    default: propDoc.blank,
  },
]
</script>

<Header name="CloseButton" legend="A button to close stuff" />

<section>
  <Example title="usage" code={exampleCode.usage}>
    {#if show}
      <div class="m-4 p-4 border-paper-5 border-primary" out:fade>
        <CloseButton onclick={() => (show = false)} />
        Hey there
      </div>
    {/if}
  </Example>
</section>

<section>
  <API {props} componentSource="CloseButton" />
</section>
