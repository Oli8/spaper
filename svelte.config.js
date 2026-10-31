import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      fallback: process.env.BASE_PATH ? '404.html' : undefined,
    }),
    alias: {
      $docs: 'src/docs',
    },
    paths: {
      base: process.env.BASE_PATH ?? '',
    },
  },
}

export default config
