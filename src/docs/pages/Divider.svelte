<script lang="ts">
import { Divider } from '$lib'
import Example from '$docs/Example.svelte'
import Header from '$docs/Header.svelte'

const code = {
  usage: `<Divider />`,
}
</script>

<Header name="Divider" legend="Hand-drawn separator" />

<section>
  <Example title="usage" code={code.usage}>
    <p>Above</p>
    <Divider />
    <p>Below</p>
  </Example>
</section>
