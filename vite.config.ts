import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

function basePath(): '' | `/${string}` {
  const base = process.env.BASE_PATH
  if (!base) return ''
  if (base.startsWith('/')) return base as `/${string}`
  throw new Error(`BASE_PATH must start with "/", received "${base}"`)
}

const base = basePath()

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit({
      preprocess: vitePreprocess(),
      adapter: adapter({
        fallback: base ? '404.html' : undefined,
      }),
      paths: { base },
    }),
  ],
})
