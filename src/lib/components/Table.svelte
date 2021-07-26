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
        {#each Object.values(pick(row, displayedFields)) as val}
          <td class={cellCLass}>{val}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<script lang="ts">
import pick from 'lodash.pick';

export let columns: ({ field: string, label?: string } | string )[] = [];
export let data: {}[] = [];
export let striped: boolean = false;
export let hoverable: boolean = false;
export let showHeader: boolean = true;
export let headerCLass: string = '';
export let cellCLass: string = '';

$: if (!columns.length) {
  columns = Object.keys(data[0] || {});
}

let displayedFields: string[];
$: displayedFields = columns.length ? columns.map((column) => (
  typeof column === 'string' ? column : column.field
)) : (data[0] ? Object.keys(data[0]) : []);
</script>
