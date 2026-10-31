<script lang="ts">
import { Article } from '#lib'
import Example from '#docs/Example.svelte'
import API, { propDoc } from '#docs/API.svelte'
import Header from '#docs/Header.svelte'

const exampleCode: Record<string, string> = {
  default: `
  <Article title="Title">
    <p slot="meta">
      Written by Super User on 24 November 2017. Posted in Blog
    </p>
    <p slot="textLead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur repellendus excepturi</p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti iure totam nam debitis aliquid impedit, et quas omnis aspernatur optio molestias ex laborum quia. Ducimus culpa tempore, veritatis officia delectus dolore dignissimos reprehenderit vero, sunt odit placeat est non molestiae ipsa nam velit in iusto hic quasi similique facere. Maxime?
    </p>
    <p slot="footer">
      <button>Read More</button>
      <button>5 Comments</button>
    </p>
  </Article>`,
  border: `
  <Article title="Title" border>
    <p slot="meta">
      Written by Super User on 24 November 2017. Posted in Blog
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti iure totam nam debitis aliquid impedit, et quas omnis aspernatur optio molestias ex laborum quia. Ducimus culpa tempore, veritatis officia delectus dolore dignissimos reprehenderit vero, sunt odit placeat est non molestiae ipsa nam velit in iusto hic quasi similique facere. Maxime?
    </p>
  </Article>`,
}

const props = [
  {
    name: 'title',
    description: 'Title of the article',
    type: propDoc.stringOrSnippet,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'meta',
    description: 'Meta text of the article',
    type: propDoc.stringOrSnippet,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'textLead',
    description: 'Text lead of the article',
    type: propDoc.stringOrSnippet,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'border',
    description: 'Article border',
    type: 'Boolean',
    values: propDoc.blank,
    default: 'false',
  },
  {
    name: 'children',
    description: 'Article main content',
    type: propDoc.snippetType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'footer',
    description: 'Article footer',
    type: propDoc.snippetType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
]
</script>

<Header name="Article" legend="Article component" />

<section>
  <Example title="default" code={exampleCode.default}>
    <Article title="Title">
      {#snippet meta()}Written by Super User on 24 November 2017. Posted in Blog{/snippet}
      {#snippet textLead()}Lorem ipsum dolor sit amet, consectetur adipisicing
        elit. Pariatur repellendus excepturi{/snippet}
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti iure
        totam nam debitis aliquid impedit, et quas omnis aspernatur optio
        molestias ex laborum quia. Ducimus culpa tempore, veritatis officia
        delectus dolore dignissimos reprehenderit vero, sunt odit placeat est
        non molestiae ipsa nam velit in iusto hic quasi similique facere.
        Maxime?
      </p>
      {#snippet footer()}
        <button>Read More</button>
        <button>5 Comments</button>
      {/snippet}
    </Article>
  </Example>
  <Example title="border" code={exampleCode.border}>
    <Article title="Title" border>
      {#snippet meta()}Written by Super User on 24 November 2017. Posted in Blog{/snippet}
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti iure
        totam nam debitis aliquid impedit, et quas omnis aspernatur optio
        molestias ex laborum quia. Ducimus culpa tempore, veritatis officia
        delectus dolore dignissimos reprehenderit vero, sunt odit placeat est
        non molestiae ipsa nam velit in iusto hic quasi similique facere.
        Maxime?
      </p>
    </Article>
  </Example>
</section>

<section>
  <API {props} componentSource="Article" />
</section>
