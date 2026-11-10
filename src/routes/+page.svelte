<script lang="ts">
import { onMount } from 'svelte'
import { resolve } from '$app/paths'
import { Button, Tag } from '#lib'

onMount(() => {
  const script = document.createElement('script')
  script.src = 'https://buttons.github.io/buttons.js'
  script.async = true
  script.defer = true
  document.body.appendChild(script)
  return () => script.remove()
})
</script>

<svelte:head>
  <title>Spaper | Documentation</title>
</svelte:head>

<div class="text-center">
  <Tag type="secondary" class="px-8 py-16 mb-12">
    <h2 class="text-6xl">Spaper</h2>
  </Tag>

  <div class="flex flex-col gap-8">
    <p class="mt-4 text-xl">
      <strong>PapierCSS</strong> components for <strong>Svelte</strong>
    </p>

    <p><code>npm i spaper</code></p>

    <p class="flex flex-wrap justify-center gap-2">
      <Button type="secondary" href={resolve('start')}>Get started</Button>

      <Button isLink external href="https://github.com/Oli8/spaper/releases"
        >Changelog</Button
      >
    </p>
    <p>
      <img
        src="https://img.shields.io/npm/v/spaper"
        alt="version"
        class="inline border-0"
      />
    </p>
    <p class="flex flex-wrap items-center justify-center gap-2">
      <a
        class="github-button"
        href="https://github.com/Oli8/spaper"
        data-color-scheme="no-preference: light; light: light; dark: dark;"
        data-size="large"
        data-show-count="true"
        aria-label="Star Oli8/spaper on GitHub">Star</a
      >
      <a
        class="github-button"
        href="https://github.com/sponsors/Oli8"
        data-color-scheme="no-preference: light; light: light; dark: dark;"
        data-icon="octicon-heart"
        data-size="large"
        aria-label="Sponsor @Oli8 on GitHub">Sponsor</a
      >
    </p>
  </div>
</div>
