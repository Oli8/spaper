<table class:table-alternating={striped}
       class:table-hover={hoverable}
       {...$$restProps}>
  {#if showHeader}
    <thead>
      <tr>
        {#each columns as column}
          <th class={headerCLass}>
            {#if typeof column === 'string'}
              {column}
            {:else}
              {column.label ?? column.field}
            {/if}
          </th>
        {/each}
      </tr>
    </thead>
  {/if}
  <tbody>
    {#each data as row}
      <tr>
        {#each getRowFiltered(row) as [columnName, val]}
          <td class={cellCLass}>
            {#if (tmpCol = hasContentFn(getColumnFromName(columnName)))}
              {#if tmpCol.html}
                {@html tmpCol.content(val)}
              {:else}
                {tmpCol.content(val)}
              {/if}
            {:else}
              {#if hasHTMLProp(getColumnFromName(columnName))}
                {@html val}
              {:else}
                {val}
              {/if}
            {/if}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<script lang="ts">
import pick from 'lodash.pick';

interface ColumnObj {
  field: string;
  label?: string;
  content?: (text?: string) => string;
  html?: boolean;
}

type Column = ColumnObj | string;
let tmpCol: ColumnObj;

export let columns: Column[] = [];
export let data: {}[] = [];
export let striped: boolean = false;
export let hoverable: boolean = false;
export let showHeader: boolean = true;
export let headerCLass: string = '';
export let cellCLass: string = '';

function getColumnFromName(name: string): Column {
  return columns[displayedFields.indexOf(name)];
}

function hasContentFn(col: Column): ColumnObj {
  return isColumnObj(col) && col.content && col;
}

function hasHTMLProp(col: Column): ColumnObj {
  return isColumnObj(col) && col.html && col;
}

function isColumnObj(arg: any): arg is ColumnObj {
  return arg.field;
}

function getRowFiltered(row: Record<string, string>): [string, string][] {
  return Object.entries(pick(row, displayedFields));
}

$: if (!columns.length) {
  columns = Object.keys(data[0] || {});
}

let displayedFields: string[];
$: displayedFields = columns.length ? columns.map((column) => (
  typeof column === 'string' ? column : column.field
)) : (data[0] ? Object.keys(data[0]) : []);
</script>
