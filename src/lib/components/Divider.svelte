<script lang="ts">
interface Props {
  [key: string]: any
}

let { ...rest }: Props = $props()
</script>

<hr {...rest} class={['divider-paper', rest.class]} />
