<script lang="ts">
import Icon from '../Icon.svelte'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from '../../icons'
import type { PaperSize } from '../../types'
import arrowDimension from './arrow-dimension'

interface Props {
  size: PaperSize
  action: 'first' | 'previous' | 'next' | 'last'
}

let { size, action }: Props = $props()

const icons = {
  first: ChevronsLeft,
  previous: ChevronLeft,
  next: ChevronRight,
  last: ChevronsRight,
}

let dimension = $derived(arrowDimension[size])
</script>

<Icon name={icons[action]} size={dimension} />
