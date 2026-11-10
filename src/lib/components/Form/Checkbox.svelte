<script lang="ts">
interface Props {
  label?: string
  value?: string
  name?: string
  group?: string[]
  checked?: boolean
  disabled?: boolean
  onchange?: (checked: boolean) => void
  onfocus?: (e: FocusEvent) => void
  onblur?: (e: FocusEvent) => void
  [key: string]: any
}

let {
  label = '',
  value = '',
  name = '',
  group = $bindable([]),
  checked = $bindable(false),
  disabled = false,
  onchange,
  onfocus,
  onblur,
  ...rest
}: Props = $props()

function handleChange({ target }: Event) {
  const el = target as HTMLInputElement
  const { value: nextValue, checked: nextChecked } = el
  checked = nextChecked
  if (nextChecked) {
    group = [...group, nextValue]
  } else {
    group = group.filter((item) => item !== nextValue)
  }

  onchange?.(checked)
}
</script>

<label {...rest} class={['paper-check', rest.class]}>
  <input
    type="checkbox"
    {value}
    {name}
    {disabled}
    checked={group.includes(value) || checked}
    {onfocus}
    {onblur}
    onchange={handleChange}
  />
  <span>{label}</span>
</label>
