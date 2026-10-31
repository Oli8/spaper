<script lang="ts">
import { Avatar, AvatarGroup } from '#lib'
import Example from '#docs/Example.svelte'
import API, { propDoc } from '#docs/API.svelte'
import Header from '#docs/Header.svelte'

const portraits = [
  { label: 'AD', src: 'https://picsum.photos/id/64/96/96' },
  { label: 'BO', src: 'https://picsum.photos/id/91/96/96' },
  { label: 'CY', src: 'https://picsum.photos/id/129/96/96' },
]

const code = {
  usage: `<Avatar label="AD" />
<Avatar label="BO" />
<Avatar label="CY" />`,
  types: `<Avatar label="AD" type="primary" />
<Avatar label="BO" type="secondary" />
<Avatar label="CY" type="success" />
<Avatar label="DA" type="warning" />
<Avatar label="EV" type="danger" />
<Avatar label="FA" type="muted" />`,
  sizes: `<Avatar label="SM" size="small" />
<Avatar label="MD" />
<Avatar label="LG" size="large" />

<AvatarGroup size="small">
  <Avatar label="AD" />
  <Avatar label="BO" />
  <Avatar label="CY" />
</AvatarGroup>
<AvatarGroup>
  <Avatar label="AD" />
  <Avatar label="BO" />
  <Avatar label="CY" />
</AvatarGroup>
<AvatarGroup size="large">
  <Avatar label="AD" />
  <Avatar label="BO" />
  <Avatar label="CY" />
</AvatarGroup>`,
  group: `<AvatarGroup>
  <Avatar label="AD" type="primary" />
  <Avatar label="BO" type="secondary" />
  <Avatar label="CY" type="success" />
</AvatarGroup>`,
  images: `<Avatar label="AD" src="https://picsum.photos/id/64/96/96" />
<Avatar label="BO" src="https://picsum.photos/id/91/96/96" />
<Avatar label="CY" src="https://picsum.photos/id/129/96/96" />

<AvatarGroup>
  <Avatar label="AD" src="https://picsum.photos/id/64/96/96" />
  <Avatar label="BO" src="https://picsum.photos/id/91/96/96" />
  <Avatar label="CY" src="https://picsum.photos/id/129/96/96" />
</AvatarGroup>`,
  circles: `<Avatar label="AD" circle={1} />
<Avatar label="BO" circle={2} />
<Avatar label="CY" circle={3} />
<Avatar label="DA" circle={4} />
<Avatar label="EV" circle={5} />
<Avatar label="FA" circle={6} />`,
}

const avatarProps = [
  {
    name: 'label',
    description:
      'Text shown in the avatar, usually two letters. Also the image alt',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'src',
    description: 'Image URL. Falls back to initials if it fails to load',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'title',
    description: 'Tooltip. Uses label when unset',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: 'label',
  },
  {
    name: 'type',
    description: 'Color',
    type: propDoc.stringType,
    values: `${propDoc.paperTypes} | muted`,
    default: 'primary',
  },
  {
    name: 'size',
    description: 'PapierCSS size (small, default, large), or any CSS length',
    type: propDoc.stringType,
    values: propDoc.paperSizes,
    default: 'default',
  },
  {
    name: 'circle',
    description: 'Circle variant',
    type: propDoc.numberType,
    values: '1 | 2 | 3 | 4 | 5 | 6',
    default: '1',
  },
  {
    name: 'children',
    description: 'Replaces the initials',
    type: propDoc.snippetType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
]

const groupProps = [
  {
    name: 'size',
    description: 'Stack size',
    type: propDoc.stringType,
    values: propDoc.paperSizes,
    default: 'default',
  },
  {
    name: 'children',
    description: 'Avatars to stack',
    type: propDoc.snippetType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
]
</script>

<Header name="Avatar" legend="Initials or image, alone or stacked" />

<section>
  <Example title="basic usage" code={code.usage}>
    <div class="flex flex-wrap items-center gap-3">
      <Avatar label="AD" />
      <Avatar label="BO" />
      <Avatar label="CY" />
    </div>
  </Example>

  <Example title="types" code={code.types}>
    <div class="flex flex-wrap items-center gap-3">
      <Avatar label="AD" type="primary" />
      <Avatar label="BO" type="secondary" />
      <Avatar label="CY" type="success" />
      <Avatar label="DA" type="warning" />
      <Avatar label="EV" type="danger" />
      <Avatar label="FA" type="muted" />
    </div>
  </Example>

  <Example title="sizes" code={code.sizes}>
    <div class="flex flex-col items-start gap-4">
      <div class="flex flex-wrap items-center gap-3">
        <Avatar label="SM" size="small" />
        <Avatar label="MD" />
        <Avatar label="LG" size="large" />
      </div>
      <AvatarGroup size="small">
        <Avatar label="AD" />
        <Avatar label="BO" />
        <Avatar label="CY" />
      </AvatarGroup>
      <AvatarGroup>
        <Avatar label="AD" />
        <Avatar label="BO" />
        <Avatar label="CY" />
      </AvatarGroup>
      <AvatarGroup size="large">
        <Avatar label="AD" />
        <Avatar label="BO" />
        <Avatar label="CY" />
      </AvatarGroup>
    </div>
  </Example>

  <Example title="group" code={code.group}>
    <AvatarGroup>
      <Avatar label="AD" type="primary" />
      <Avatar label="BO" type="secondary" />
      <Avatar label="CY" type="success" />
    </AvatarGroup>
  </Example>

  <Example title="images" code={code.images}>
    <div class="flex flex-col items-start gap-4">
      <div class="flex flex-wrap items-center gap-3">
        {#each portraits as portrait}
          <Avatar label={portrait.label} src={portrait.src} />
        {/each}
      </div>
      <AvatarGroup>
        {#each portraits as portrait}
          <Avatar label={portrait.label} src={portrait.src} />
        {/each}
      </AvatarGroup>
    </div>
  </Example>

  <Example title="circles" code={code.circles}>
    <div class="flex flex-wrap items-center gap-3">
      <Avatar label="AD" circle={1} />
      <Avatar label="BO" circle={2} />
      <Avatar label="CY" circle={3} />
      <Avatar label="DA" circle={4} />
      <Avatar label="EV" circle={5} />
      <Avatar label="FA" circle={6} />
    </div>
  </Example>
</section>

<section>
  <API label="Avatar" props={avatarProps} componentSource="Avatar/Avatar" />
  <API
    label="AvatarGroup"
    showHeader={false}
    props={groupProps}
    componentSource="Avatar/AvatarGroup"
  />
</section>
