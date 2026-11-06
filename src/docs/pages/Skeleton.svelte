<script lang="ts">
/* oxlint-disable no-useless-escape -- <\/script> must not close this block */
import { onMount } from 'svelte'
import { Skeleton, Article, Button } from '#lib'
import Example from '#docs/Example.svelte'
import API, { propDoc } from '#docs/API.svelte'
import Header from '#docs/Header.svelte'

onMount(() => {
  setInterval(() => (loading = !loading), 2000)
})

let loading = true

const exampleCode: Record<string, string> = {
  usage: `
<script>
  import { onMount } from 'svelte';
  import { Article, Button, Skeleton } from 'spaper';

  onMount(() => {
    setInterval(() => loading = !loading, 2000);
  })

  let loading = true;
<\/script>

<Article border aria-busy={loading}>
  {#snippet title()}
    {#if !loading}Title{/if}
    <Skeleton active={loading} --width="5rem" --height="3rem" />
  {/snippet}
  {#snippet meta()}
    {#if !loading}Written by Super User on 24 November 2017. Posted in Blog{/if}
    <Skeleton active={loading} --width="20rem" />
  {/snippet}
  {#snippet textLead()}
    {#if !loading}
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Pariatur repellendus excepturi
    {/if}
    <Skeleton active={loading} count={3} --width="75%" />
  {/snippet}
  {#if !loading}
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti iure totam nam debitis aliquid impedit, et quas omnis aspernatur optio molestias ex laborum quia. Ducimus culpa tempore, veritatis officia delectus dolore dignissimos reprehenderit vero, sunt odit placeat est non molestiae ipsa nam velit in iusto hic quasi similique facere. Maxime?
  {/if}
  <Skeleton active={loading} count={4} />
  {#snippet footer()}
    {#if !loading}
      <Button class="m-2">Read More</Button>
      <Button class="m-2">5 Comments</Button>
    {/if}
    <Skeleton active={loading} count={2} inline class="gap-2"
              --width="6rem" --height="2.5rem" />
  {/snippet}
</Article>`,
  shapes: `
<Skeleton --width="20%" />
<Skeleton --width="40%" />
<Skeleton --width="60%" />
<Skeleton --width="80%" />
<Skeleton count={6} inline shape="circle" size="2rem" class="gap-2" />
<Skeleton count={3} inline shape="square" size="2.5rem" class="gap-2" />
<Skeleton count={3} inline shape="circle" size="5rem" class="gap-2" />
<Skeleton count={3} inline shape="square" class="gap-2" itemClass="size-12" />`,
}

const props = [
  {
    name: 'active',
    description: 'Wether skeleton is active or not',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.trueStr,
  },
  {
    name: 'count',
    description: 'Number of items to display',
    type: propDoc.numberType,
    values: propDoc.blank,
    default: '1',
  },
  {
    name: 'animated',
    description: 'Display animation',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.trueStr,
  },
  {
    name: 'shape',
    description: 'Skeleton shape',
    type: propDoc.stringType,
    values: 'rectangle | square | circle',
    default: 'rectangle',
  },
  {
    name: 'size',
    description: 'Width and height for square and circle',
    type: 'String | Number',
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'circle',
    description: 'Deprecated. Use shape="circle"',
    deprecated: true,
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'inline',
    description: 'Inline display',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'itemClass',
    description:
      'Class on each skeleton. When count is greater than 1, class is on the group',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'ariaLabel',
    description: 'Accessibility label of the loading status',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: 'Loading...',
  },
  {
    name: 'ariaValueText',
    description: 'Deprecated. Use ariaLabel',
    deprecated: true,
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
]

const cssProps = [
  {
    name: 'width',
    description: 'width of the skeleton',
    default: 'auto',
  },
  {
    name: 'height',
    description: 'height of the skeleton',
    default: '100%',
  },
]
</script>

<Header name="Skeleton" legend="Placeholder for loading content" />

<section>
  <Example title="usage" code={exampleCode.usage}>
    <Article border aria-busy={loading}>
      {#snippet title()}
        {#if !loading}Title{/if}
        <Skeleton active={loading} --width="5rem" --height="3rem" />
      {/snippet}
      {#snippet meta()}
        {#if !loading}Written by Super User on 24 November 2017. Posted in Blog{/if}
        <Skeleton active={loading} --width="20rem" />
      {/snippet}
      {#snippet textLead()}
        {#if !loading}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur
          repellendus excepturi
        {/if}
        <Skeleton active={loading} count={3} --width="75%" />
      {/snippet}
      {#if !loading}
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti iure
        totam nam debitis aliquid impedit, et quas omnis aspernatur optio
        molestias ex laborum quia. Ducimus culpa tempore, veritatis officia
        delectus dolore dignissimos reprehenderit vero, sunt odit placeat est
        non molestiae ipsa nam velit in iusto hic quasi similique facere.
        Maxime?
      {/if}
      <Skeleton active={loading} count={4} />
      {#snippet footer()}
        {#if !loading}
          <Button class="m-2">Read More</Button>
          <Button class="m-2">5 Comments</Button>
        {/if}
        <Skeleton
          active={loading}
          count={2}
          inline
          class="gap-2"
          --width="6rem"
          --height="2.5rem"
        />
      {/snippet}
    </Article>
  </Example>

  <Example title="shapes" code={exampleCode.shapes}>
    <Skeleton --width="20%" />
    <Skeleton --width="40%" />
    <Skeleton --width="60%" />
    <Skeleton --width="80%" />
    <Skeleton count={6} inline shape="circle" size="2rem" class="gap-2" />
    <br />
    <Skeleton count={3} inline shape="square" size="2.5rem" class="gap-2" />
    <br />
    <Skeleton count={3} inline shape="circle" size="5rem" class="gap-2" />
    <br />
    <Skeleton
      count={3}
      inline
      shape="square"
      class="gap-2"
      itemClass="size-12"
    />
  </Example>
</section>

<section>
  <API {props} {cssProps} componentSource="Skeleton" />
</section>
