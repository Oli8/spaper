<script lang="ts">
/* oxlint-disable no-useless-escape -- <\/script> must not close this block */
import { Icon, Table, TableColumn, Tag } from '#lib'
import { CircleSlash2 } from '#lib/icons.js'
import Example from '#docs/Example.svelte'
import API, { propDoc } from '#docs/API.svelte'
import Header from '#docs/Header.svelte'

const data = [
  { rank: 1, name: 'Jannik Sinner', country: 'Italy' },
  { rank: 2, name: 'Alexander Zverev', country: 'Germany' },
  { rank: 3, name: 'Carlos Alcaraz', country: 'Spain' },
  { rank: 4, name: 'Ben Shelton', country: 'USA' },
]
const columns = [
  { field: 'name', label: 'Name' },
  { field: 'country', label: 'Country' },
]

const ages = [
  { rank: 1, name: 'Jannik Sinner', age: 25 },
  { rank: 2, name: 'Alexander Zverev', age: 29 },
  { rank: 3, name: 'Carlos Alcaraz', age: 23 },
  { rank: 4, name: 'Ben Shelton', age: 24 },
]

const ageSort = { field: 'age', order: 1 } as const

const sortableColumns = [
  { field: 'rank', sortable: true },
  { field: 'name' },
  { field: 'age', sortable: true },
]

const players = [
  { rank: 1, name: 'Jannik Sinner', country: 'Italy', countryCode: 'it' },
  { rank: 2, name: 'Alexander Zverev', country: 'Germany', countryCode: 'de' },
  { rank: 3, name: 'Carlos Alcaraz', country: 'Spain', countryCode: 'es' },
  { rank: 4, name: 'Ben Shelton', country: 'USA', countryCode: 'us' },
]

const exampleCode: Record<string, string> = {
  usage: `
<script>
const data = [
  { rank: 1, name: 'Jannik Sinner', country: 'Italy' },
  { rank: 2, name: 'Alexander Zverev', country: 'Germany' },
  { rank: 3, name: 'Carlos Alcaraz', country: 'Spain' },
  { rank: 4, name: 'Ben Shelton', country: 'USA' },
];
<\/script>

<Table {data} />`,
  columns: `
<script>
const data = [...];
const columns =  [{field: 'name', label: 'Name'}, {field: 'country', label: 'Country'}];
<\/script>

<Table columns={['rank', 'name']} {data} />
<Table {columns} {data} />`,
  striped: `
<Table {data} striped />`,
  hoverable: `
<Table {data} hoverable />`,
  empty: `
<script>
import { Icon, Table } from 'spaper';
import { CircleSlash2 } from 'spaper/icons';
<\/script>

<Table data={[]} columns={['rank', 'name', 'country']}>
  {#snippet empty()}
    <div class="flex flex-col items-center justify-center gap-2 p-8">
      <Icon name={CircleSlash2} size={32} type="warning" />
      No players.
    </div>
  {/snippet}
</Table>`,
  presort: `
<script>
const data = [
  { rank: 1, name: 'Jannik Sinner', age: 25 },
  { rank: 2, name: 'Alexander Zverev', age: 29 },
  { rank: 3, name: 'Carlos Alcaraz', age: 23 },
  { rank: 4, name: 'Ben Shelton', age: 24 },
];
<\/script>

<Table {data} sort={{ field: 'age', order: 1 }} />`,
  sortable: `
<Table {data} sortable />`,
  sortableColumns: `
<script>
const columns = [
  { field: 'rank', sortable: true },
  { field: 'name' },
  { field: 'age', sortable: true },
];
<\/script>

<Table {data} {columns} />

<Table {data}>
  {#snippet children({ row })}
    <TableColumn field="rank" sortable {row} />
    <TableColumn field="name" {row} />
    <TableColumn field="age" sortable {row} />
  {/snippet}
</Table>`,
  column: `
<script>
const data = [
  { rank: 1, name: 'Jannik Sinner', country: 'Italy', countryCode: 'it' },
  { rank: 2, name: 'Alexander Zverev', country: 'Germany', countryCode: 'de' },
  { rank: 3, name: 'Carlos Alcaraz', country: 'Spain', countryCode: 'es' },
  { rank: 4, name: 'Ben Shelton', country: 'USA', countryCode: 'us' },
];
<\/script>

<Table {data}>
  {#snippet children({ row })}
    <TableColumn field="rank" label="Rank" {row}>
      {#snippet children({ value })}
        <Tag type={value === 1 ? 'success' : 'primary'}>{value}</Tag>
      {/snippet}
    </TableColumn>
    <TableColumn field="name" label="Name" {row} />
    <TableColumn field="countryCode" label="Country" {row}>
      {#snippet children({ row, value })}
        <span class="inline-flex items-center gap-2">
          <img alt="" class="border-paper" src="https://flagcdn.com/w40/{value}.png" />
          {row.country}
        </span>
      {/snippet}
    </TableColumn>
  {/snippet}
</Table>`,
}

const props = [
  {
    name: 'data',
    description: 'Table data',
    type: propDoc.arrayType,
    values: propDoc.blank,
    default: '[]',
  },
  {
    name: 'columns',
    description:
      'Column fields or { field, label, sortable } objects. `content` and `html` are deprecated; use TableColumn',
    type: propDoc.arrayType,
    values: propDoc.blank,
    default: '[]',
  },
  {
    name: 'striped',
    description: 'Striped style',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'hoverable',
    description: 'Highlight line on hover',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'sortable',
    description:
      'Default for columns that do not set their own. Header clicks cycle the sort',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'sort',
    description:
      'Active sort. order 1 is ascending, -1 is descending. A header click cycles ascending, descending, then unsorted.',
    type: '{ field: string, order: 1 | -1 } | null',
    values: propDoc.blank,
    default: 'null',
  },
  {
    name: 'showHeader',
    description: 'Wether to show header or not',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.trueStr,
  },
  {
    name: 'headerCLass',
    description: 'CSS classes to be applied on header',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'cellCLass',
    description: 'CSS classes to be applied on cell',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'children',
    description: 'Row content. Receives { row, rowIndex }',
    type: propDoc.snippetType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'empty',
    description: 'Shown when data is empty',
    type: propDoc.snippetType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
]

const cssProps = [
  {
    name: '--paper-table-header-hover',
    description: 'Background of a sortable column header on hover',
    default: 'var(--paper-table-hover-bg)',
  },
]

const columnProps = [
  {
    name: 'field',
    description: 'Row property to display',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'label',
    description: 'Header text',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: 'field',
  },
  {
    name: 'sortable',
    description: 'Overrides the table sortable prop for this column',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'row',
    description: 'Current row, passed by the Table children snippet',
    type: 'Object',
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'rowIndex',
    description: 'Current row index',
    type: propDoc.numberType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'cellClass',
    description: 'CSS classes applied on the cell',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'children',
    description: 'Custom cell. Receives { row, value, rowIndex, field }',
    type: propDoc.snippetType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
]
</script>

<Header name="Table" legend="Display sets of data" />

<section>
  <Example title="basic usage" code={exampleCode.usage}>
    <Table {data} />
  </Example>

  <Example title="columns definition" code={exampleCode.columns}>
    <Table columns={['rank', 'name']} {data} />
    <Table {columns} {data} />
  </Example>

  <Example title="striped" code={exampleCode.striped}>
    <Table {data} striped />
  </Example>

  <Example title="hoverable" code={exampleCode.hoverable}>
    <Table {data} hoverable />
  </Example>

  <Example title="TableColumn" code={exampleCode.column}>
    <Table data={players}>
      {#snippet children({ row })}
        <TableColumn field="rank" label="Rank" {row}>
          {#snippet children({ value })}
            <Tag type={value === 1 ? 'success' : 'primary'}>{value}</Tag>
          {/snippet}
        </TableColumn>
        <TableColumn field="name" label="Name" {row} />
        <TableColumn field="countryCode" label="Country" {row}>
          {#snippet children({ row, value })}
            <span class="inline-flex items-center gap-2">
              <img
                alt=""
                class="border-paper"
                src="https://flagcdn.com/w40/{value}.png"
              />
              {row.country}
            </span>
          {/snippet}
        </TableColumn>
      {/snippet}
    </Table>
  </Example>

  <Example title="presort" code={exampleCode.presort}>
    <Table data={ages} sort={ageSort} />
  </Example>

  <Example title="sortable" code={exampleCode.sortable}>
    <Table data={ages} sortable />
  </Example>

  <Example title="sortable columns" code={exampleCode.sortableColumns}>
    <div class="space-y-4">
      <Table data={ages} columns={sortableColumns} />
      <Table data={ages}>
        {#snippet children({ row })}
          <TableColumn field="rank" sortable {row} />
          <TableColumn field="name" {row} />
          <TableColumn field="age" sortable {row} />
        {/snippet}
      </Table>
    </div>
  </Example>

  <Example title="empty" code={exampleCode.empty}>
    <Table data={[]} columns={['rank', 'name', 'country']}>
      {#snippet empty()}
        <div class="flex flex-col items-center justify-center gap-2 p-8">
          <Icon name={CircleSlash2} size={32} type="warning" />
          No players.
        </div>
      {/snippet}
    </Table>
  </Example>
</section>

<section>
  <API label="Table" {props} {cssProps} componentSource="Table/Table" />
  <API
    label="TableColumn"
    showHeader={false}
    props={columnProps}
    componentSource="Table/TableColumn"
  />
</section>
