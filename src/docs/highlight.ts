import { createHighlighterCoreSync } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import bash from '@shikijs/langs/bash'
import css from '@shikijs/langs/css'
import html from '@shikijs/langs/html'
import javascript from '@shikijs/langs/javascript'
import svelte from '@shikijs/langs/svelte'
import typescript from '@shikijs/langs/typescript'
import githubDark from '@shikijs/themes/github-dark'
import githubLight from '@shikijs/themes/github-light'

export type CodeLang =
  | 'svelte'
  | 'css'
  | 'bash'
  | 'html'
  | 'javascript'
  | 'typescript'

const highlighter = createHighlighterCoreSync({
  themes: [githubLight, githubDark],
  langs: [svelte, css, bash, html, javascript, typescript],
  engine: createJavaScriptRegexEngine(),
})

export function highlight(code: string, lang: CodeLang = 'svelte'): string {
  return highlighter.codeToHtml(code, {
    lang,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    defaultColor: false,
  })
}
