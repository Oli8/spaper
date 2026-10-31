<script lang="ts">
/* oxlint-disable no-useless-escape -- <\/script> must not close this block */
import { Pagination } from '#lib'
import Example from '#docs/Example.svelte'
import API, { propDoc } from '#docs/API.svelte'
import Header from '#docs/Header.svelte'

let currentPage: number = 3

function romanize(num: number): string {
  const lookup: Record<string, number> = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  }
  let roman = ''
  for (let i in lookup) {
    while (num >= lookup[i]) {
      roman += i
      num -= lookup[i]
    }
  }

  return roman
}

const exampleCode: Record<string, string> = {
  usage: `
<div class="flex flex-col items-start gap-4">
  <Pagination total={50} />
  <Pagination total={100}
              pageSize={15}
              bind:current={currentPage} />
  <Pagination total={40}
              defaultStyle="warning"
              highlightedStyle="success"
              previousLabel="Previous"
              nextLabel="Next" />
</div>`,
  sizings: `
<div class="flex flex-col items-start gap-4">
  <Pagination total={30} size="small" />
  <Pagination total={30} size="default" />
  <Pagination total={30} size="large" />
</div>`,
  simple: `
  <Pagination simple total={50} />`,
  long: `
<Pagination total={500}
            rangeBetween={2}
            current={8} />`,
  bullets: `
<Pagination bullets total={50} />`,
  pageLabel: `
<script>
  function romanize(num) { ... }
<\/script>

<div class="flex flex-col items-start gap-4">
  <Pagination total={100}>
    {#snippet pageLabel(idx)}
      {romanize(idx)}
    {/snippet}
  </Pagination>
  <Pagination total={100}>
    {#snippet pageLabel(idx)}
      <em>{idx}</em>
    {/snippet}
  </Pagination>
</div>`,
  jumper: `
<Pagination total={500}
            rangeBetween={2}
            jumper />`,
}

const props = [
  {
    name: 'total',
    description: 'Total count of items',
    type: propDoc.numberType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'pageSize',
    description: 'Number of data items per page',
    type: propDoc.numberType,
    values: propDoc.blank,
    default: '10',
  },
  {
    name: 'current',
    description: 'Current page number',
    type: propDoc.numberType,
    values: propDoc.blank,
    default: '1',
  },
  {
    name: 'size',
    description: 'Pagination size',
    type: propDoc.stringType,
    values: propDoc.paperSizes,
    default: 'small',
  },
  {
    name: 'navigation',
    description: 'Wether to show navigation buttons',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.trueStr,
  },
  {
    name: 'simple',
    description: 'Whether to use simple mode',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'bullets',
    description: 'Display indicators as unnumbered bullets',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'pageLabel',
    description: 'Page indicator. Receives the page index',
    type: 'Snippet<[number]>',
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'previousLabel',
    description: 'button text',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'nextLabel',
    description: 'button text',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'highlightedStyle',
    description: 'Style of the current page and navigation buttons',
    type: propDoc.stringType,
    values: propDoc.paperTypes,
    default: 'secondary',
  },
  {
    name: 'defaultStyle',
    description: 'Style of the page number buttons',
    type: propDoc.stringType,
    values: propDoc.paperTypes,
    default: propDoc.blank,
  },
  {
    name: 'rangeBetween',
    description:
      'Number of page buttons to show before and after the current page button',
    type: propDoc.numberType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'jumper',
    description: 'Wether to show the jumper',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'ariaFirstLabel',
    description: 'Accessibility label for the first page link',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: 'first page',
  },
  {
    name: 'ariaPreviousLabel',
    description: 'Accessibility label for the previous page link',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: 'previous page',
  },
  {
    name: 'ariaNextLabel',
    description: 'Accessibility label for the next page link',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: 'next page',
  },
  {
    name: 'ariaLastLabel',
    description: 'Accessibility label for the last page link',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: 'last page',
  },
  {
    name: 'ariaPageLabel',
    description: 'Accessibility label for the page number buttons',
    type: '(idx: number) => string',
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'onchange',
    description: 'Called when the page changes',
    type: '(current: number) => void',
    values: propDoc.blank,
    default: propDoc.blank,
  },
]
</script>

<Header
  name="Pagination"
  legend="Flexible component to indicate a series of related content exists across multiple pages"
/>

<section>
  <Example title="basic usage" code={exampleCode.usage}>
    <div class="flex flex-col items-start gap-4">
      <Pagination total={50} />
      <Pagination total={100} pageSize={15} bind:current={currentPage} />
      <Pagination
        total={40}
        defaultStyle="warning"
        highlightedStyle="success"
        previousLabel="Previous"
        nextLabel="Next"
      />
    </div>
  </Example>

  <Example title="sizings" code={exampleCode.sizings}>
    <div class="flex flex-col items-start gap-4">
      <Pagination total={30} size="small" />
      <Pagination total={30} size="default" />
      <Pagination total={30} size="large" />
    </div>
  </Example>

  <Example title="simple" code={exampleCode.simple}>
    <Pagination simple total={50} />
  </Example>

  <Example title="long pagination" code={exampleCode.long}>
    <Pagination total={500} rangeBetween={2} current={8} />
  </Example>

  <Example title="bullets" code={exampleCode.bullets}>
    <Pagination bullets total={50} />
  </Example>

  <Example title="page label" code={exampleCode.pageLabel}>
    <div class="flex flex-col items-start gap-4">
      <Pagination total={100}>
        {#snippet pageLabel(idx)}
          {romanize(idx)}
        {/snippet}
      </Pagination>
      <Pagination total={100}>
        {#snippet pageLabel(idx)}
          <em>{idx}</em>
        {/snippet}
      </Pagination>
    </div>
  </Example>

  <Example title="jumper" code={exampleCode.jumper}>
    <Pagination total={500} rangeBetween={2} jumper />
  </Example>
</section>

<section>
  <API {props} componentSource="Pagination/Pagination" />
</section>
