<script lang="ts">
/* oxlint-disable no-useless-escape -- <\/script> must not close this block */
import { Icon } from '$lib'
import { Heart, Star } from '$lib/icons'
import Example from '$docs/Example.svelte'
import API, { propDoc } from '$docs/API.svelte'
import Header from '$docs/Header.svelte'

const code = {
  colors: `<script>
import { Icon } from 'spaper';
import { Heart, Star } from 'spaper/icons';
<\/script>

<Icon name={Heart} type="danger" size={28} />
<Icon name={Star} type="warning" size={28} />
<Icon name={Heart} type="danger" size={28} fill="danger" />`,
}

const props = [
  {
    name: 'name',
    description: 'Icon geometry. IconNode from spaper/icons',
    type: 'IconNode',
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'img',
    description: 'Same as name',
    type: 'IconNode',
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'type',
    description: 'Stroke color token. Overridden by color',
    type: propDoc.stringType,
    values: `${propDoc.paperTypes} | muted`,
    default: propDoc.blank,
  },
  {
    name: 'color',
    description: 'Stroke color. A paper token or any CSS color. Wins over type',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'size',
    description: 'Width and height',
    type: `${propDoc.numberType} | ${propDoc.stringType}`,
    values: propDoc.blank,
    default: '24',
  },
  {
    name: 'strokeWidth',
    description: 'Stroke width',
    type: `${propDoc.numberType} | ${propDoc.stringType}`,
    values: propDoc.blank,
    default: '2',
  },
  {
    name: 'absoluteStrokeWidth',
    description: 'Keeps the stroke visually constant when size changes',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.falseStr,
  },
  {
    name: 'fill',
    description: 'Path fill. A paper token or any CSS color',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
]
</script>

<Header
  name="Icon"
  legend="Sketchy icons from @sketchyicons/svelte. Pass an IconNode from spaper/icons."
/>

<p class="mb-8">
  Available icons are listed on
  <a
    class="text-secondary underline"
    href="https://sketchyicons.com/icons"
    target="_blank"
    rel="noopener noreferrer"
  >
    sketchyicons.com/icons
  </a>.
</p>

<section>
  <Example title="colors" code={code.colors}>
    <Icon name={Heart} type="danger" size={28} />
    <Icon name={Star} type="warning" size={28} />
    <Icon name={Heart} type="danger" size={28} fill="danger" />
  </Example>
</section>

<section>
  <API {props} componentSource="Icon" />
</section>
