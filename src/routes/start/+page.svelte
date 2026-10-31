<script lang="ts">
/* oxlint-disable no-useless-escape -- <\/script> must not close this block */
import CodeBlock from '$docs/CodeBlock.svelte'
import Header from '$docs/Header.svelte'

const cssImport = `@import "papiercss/fonts.css"; /* optional */
@import "tailwindcss";
@import "papiercss";
@source "../node_modules/spaper";`

const usage = `<script>
  import { Button } from 'spaper';
<\/script>

<Button>Click me</Button>`

const cssVars = `<Spinner --paper-spinner-duration="2s" />
<Hero --paper-hero-margin-bottom="0" />`
</script>

<Header name="Start" legend="How to install and use Spaper" />

<h3 class="mt-8 mb-2 text-xl">Install</h3>
<CodeBlock code="npm i spaper papiercss tailwindcss" lang="bash" />

<h3 class="mb-2 text-xl">Import papiercss</h3>
<p class="mb-2">
  <code>@source</code> is relative to the CSS file. This scans the installed package
  so Tailwind generates the utility classes used inside the components.
</p>
<CodeBlock code={cssImport} lang="css" />

<h3 class="mt-8 mb-2 text-xl">Usage</h3>
<CodeBlock code={usage} />

<h3 class="mt-8 mb-2 text-xl">Override CSS variables</h3>
<p>
  PapierCSS tokens can be set per component with CSS custom properties as
  attributes. Values apply to that instance (and its children).
</p>
<p>
  The full list of variables per component can be found in the
  <a
    class="link-paper"
    href="https://oli8.github.io/papiercss/#/components"
    target="_blank"
    rel="noreferrer">PapierCSS docs</a
  >.
</p>
<CodeBlock code={cssVars} copy={false} class="my-4" />

<p>
  For regular theming, see
  <a
    class="link-paper"
    href="https://oli8.github.io/papiercss/#/guide/theming"
    target="_blank"
    rel="noreferrer">Theming</a
  >.
</p>
