<script lang="ts">
import type { PaperSize } from "$lib/types";
import arrowDimension from "./arrow-dimension";

export let size: PaperSize;
export let type: 'left'|'right';

let dimension: number;
$: dimension = arrowDimension[size];
</script>

<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
     width={dimension} height={dimension} viewBox="0 0 24 24">
  {#if type === 'right'}
    <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/>
  {:else}
    <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/>
  {/if}
</svg>
