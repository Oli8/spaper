<script lang="ts">
import '../app.css'
import { asset, resolve } from '$app/paths'
import { goto } from '$app/navigation'
import { Button, Icon, Input, Navbar, ScrollTop, Tag } from '#lib'
import { version } from '../../package.json'
import { Moon, Sun } from '#lib/icons.js'
import ListLinks from '#docs/ListLinks.svelte'
import {
  topComponents,
  formComponents,
  bottomComponents,
  componentNames,
} from '#docs/nav.js'

interface Props {
  children?: import('svelte').Snippet
}

let { children }: Props = $props()
let searchValue = $state('')

function searchHandler(e: Event) {
  e.preventDefault()
  if (!componentNames.includes(searchValue)) return
  goto(resolve('/components/[component]', { component: searchValue }))
  searchValue = ''
}

const darkGeometry = asset('geometry_dark.jpeg')

function toggleTheme() {
  const next = !document.documentElement.classList.contains('dark')
  document.documentElement.classList.toggle('dark', next)
  localStorage.setItem('theme', next ? 'dark' : 'light')
}
</script>

<svelte:head>
  {@html `<style>html.dark body { background-image: url("${darkGeometry}"); }</style>`}
</svelte:head>

<Navbar class="mb-6 p-4">
  {#snippet brand()}
    <div class="flex items-center self-center">
      <a href={resolve('/')} class="font-paper-heading text-3xl no-underline">
        Spaper
      </a>
      <Tag class="ml-3 align-middle text-sm font-mono">v{version}</Tag>
    </div>
  {/snippet}
  <ul class="inline">
    <li><a href={resolve('start')}>Installation</a></li>
    <li class="md:hidden!"><a href={resolve('components')}>Components</a></li>

    <li>
      <Button
        isLink
        external
        outline="secondary"
        size="small"
        href="https://github.com/Oli8/spaper"
      >
        GitHub
      </Button>
    </li>
    <li>
      <Button
        isLink
        external
        outline="secondary"
        size="small"
        href="https://oli8.github.io/papiercss/"
      >
        PapierCSS
      </Button>
    </li>
    <li>
      <form onsubmit={searchHandler}>
        <Input
          bind:value={searchValue}
          type="search"
          placeholder="Search"
          list="component-search"
          class="mx-auto"
          onchange={searchHandler}
        />
        <datalist id="component-search">
          {#each componentNames as component}
            <option value={component}></option>
          {/each}
        </datalist>
      </form>
    </li>
    <li>
      <Button
        outline="secondary"
        size="small"
        nativeType="button"
        onclick={toggleTheme}
        aria-label="Toggle dark theme"
      >
        <span class="when-light inline-flex items-center gap-1">
          <Icon name={Moon} size={18} />
          Dark
        </span>
        <span class="when-dark inline-flex items-center gap-1">
          <Icon name={Sun} size={18} />
          Light
        </span>
      </Button>
    </li>
  </ul>
</Navbar>

<div
  class="grid grid-cols-[minmax(0,1fr)] gap-6 p-4 md:grid-cols-[18rem_minmax(0,1fr)]"
>
  <aside class="border-paper bg-surface pl-8 p-6 text-xl">
    <div>
      <h4 class="text-secondary mb-2 text-2xl">Installation</h4>
      <ul class="list-paper mb-6">
        <li><a href={resolve('start')} class="no-underline">Start</a></li>
      </ul>
      <h4 class="text-secondary mb-2 text-2xl">PapierCSS</h4>
      <ul class="list-paper mb-6">
        <li>
          <a
            href="https://oli8.github.io/papiercss/#/guide/theming"
            class="no-underline"
            target="_blank"
            rel="noreferrer">Theming</a
          >
        </li>
        <li>
          <a
            href="https://oli8.github.io/papiercss/#/guide/dark-mode"
            class="no-underline"
            target="_blank"
            rel="noreferrer">Dark mode</a
          >
        </li>
        <li>
          <a
            href="https://oli8.github.io/papiercss/#/guide/colors"
            class="no-underline"
            target="_blank"
            rel="noreferrer">Colors</a
          >
        </li>
      </ul>

      <div class="hidden md:block">
        <h4 class="text-secondary mb-2 text-2xl">Components</h4>
        <ul class="list-paper mb-6">
          <ListLinks items={topComponents} />
          <li>
            Form
            <ul>
              <ListLinks items={formComponents} />
            </ul>
          </li>
          <ListLinks items={bottomComponents} />
        </ul>
      </div>
    </div>
  </aside>

  <main class="min-w-0 px-6 py-8 border-paper bg-surface">
    {@render children?.()}
  </main>
</div>

<ScrollTop />
