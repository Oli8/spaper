<script lang="ts" module>
export const propDoc = {
  paperTypes: 'primary | secondary | success | warning | danger',
  paperSizes: 'small | default | large',
  blank: '_',
  stringType: 'String',
  snippetType: 'Snippet',
  stringOrSnippet: 'String | Snippet',
  booleanType: 'Boolean',
  numberType: 'Number',
  arrayType: 'Array',
  falseStr: 'false',
  trueStr: 'true',
}
</script>

<script lang="ts">
import { Tabs, Tab, Table } from '$lib'

interface APIData {
  name: string
  description: string
  default?: string
}

interface PropData extends APIData {
  type: string
  values: string
  default: string
  deprecated?: boolean
}

interface EventData extends APIData {
  parameters: string
}

interface Props {
  label?: string
  showHeader?: boolean
  props?: PropData[] | null
  events?: EventData[] | null
  cssProps?: APIData[] | null
  componentSource?: string
}

let {
  label = '',
  showHeader = true,
  props = null,
  events = null,
  cssProps = null,
  componentSource = '',
}: Props = $props()

const SOURCE_PATH =
  'https://github.com/Oli8/spaper/blob/main/src/lib/components/'

const columns = {
  props: [
    { label: 'Name', field: 'name' },
    { label: 'Description', field: 'description' },
    { label: 'Type', field: 'type' },
    { label: 'Values', field: 'values' },
    { label: 'Default', field: 'default' },
  ],
  events: [
    { label: 'Name', field: 'name' },
    { label: 'Description', field: 'description' },
    { label: 'Parameters', field: 'parameters' },
  ],
  cssProps: [
    { label: 'Name', field: 'name' },
    { label: 'Description', field: 'description' },
    { label: 'Default', field: 'default' },
  ],
}
</script>

<div class="mt-16 first:mt-0">
  {#if showHeader}
    <h2 class="mb-4 text-2xl">API</h2>
  {/if}
  {#if label}
    <h3 class="mb-4 text-3xl">
      <span aria-hidden="true">-</span>
      {label}
    </h3>
  {/if}

  <Tabs placement="left">
    {#if props}
      <Tab label="Properties">
        <div class="min-w-0 overflow-x-auto">
        <Table columns={columns.props} data={props}>
          {#snippet cell({ field, value, row })}
            {#if field === 'name' && row.deprecated}
              <span class="line-through">{value}</span>
            {:else}
              {value}
            {/if}
          {/snippet}
        </Table>
        </div>
      </Tab>
    {/if}
    {#if events}
      <Tab label="Events">
        <div class="min-w-0 overflow-x-auto">
          <Table columns={columns.events} data={events} />
        </div>
      </Tab>
    {/if}
    {#if cssProps}
      <Tab label="CSS Properties">
        <div class="min-w-0 overflow-x-auto">
          <Table columns={columns.cssProps} data={cssProps} />
        </div>
      </Tab>
    {/if}
  </Tabs>

  {#if componentSource}
    <p class="mt-4">
      Source code:
      <a
        href="{SOURCE_PATH}{componentSource}.svelte"
        target="_blank"
        rel="noreferrer"
      >
        <code>{componentSource}.svelte</code>
      </a>
    </p>
  {/if}
</div>
