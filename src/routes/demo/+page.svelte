<script lang="ts">
import {
  Alert,
  Article,
  Avatar,
  AvatarGroup,
  Button,
  Card,
  Carousel,
  CarouselItem,
  Checkbox,
  CloseButton,
  Collapsible,
  CopyButton,
  Divider,
  Hero,
  Icon,
  Input,
  Modal,
  Navbar,
  NumberInput,
  Pagination,
  Popover,
  Progress,
  Radio,
  Select,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Tab,
  Table,
  Tabs,
  Tag,
  Toast,
  Breadcrumb,
} from '#lib'
import {
  Heart,
  Star,
  Home,
  User,
  Search,
  Bell,
  Check,
  Mail,
  Download,
  Copy,
} from '#lib/icons.js'
import { resolve } from '$app/paths'

const paperTypes = [
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
] as const

let modalOpen = $state(false)
let page = $state(1)
let checkGroup = $state<string[]>(['svelte'])
let radioGroup = $state('a')
let switchOn = $state(true)
let sliderValue = $state(40)
let numberValue = $state(3)
let selectValue = $state('neucha')
let inputValue = $state('')
let collapsibleOpen = $state(true)
let carouselIndex = $state(0)
let activeTab = $state(0)

const tableData = [
  { rank: 1, name: 'Jannik Sinner', country: 'Italy' },
  { rank: 2, name: 'Alexander Zverev', country: 'Germany' },
  { rank: 3, name: 'Carlos Alcaraz', country: 'Spain' },
  { rank: 4, name: 'Ben Shelton', country: 'USA' },
]

function showToast(type: (typeof paperTypes)[number] = 'secondary') {
  Toast.open({
    message: `Toast · ${type}`,
    type,
    duration: 2500,
    position: 'top-right',
    dismissible: true,
  })
}
</script>

<Navbar class="mb-6 bg-secondary-soft p-2">
  {#snippet brand()}
    <a href={resolve('/')} class="font-paper-heading text-2xl no-underline">Spaper</a>
  {/snippet}
  <ul class="inline">
    <li><a href="#icons">Icons</a></li>
    <li><a href="#buttons">Buttons</a></li>
    <li><a href="#forms">Forms</a></li>
    <li><a href="#feedback">Feedback</a></li>
    <li>
      <Button
        type="secondary"
        size="small"
        href="https://github.com/Oli8/spaper"
        external
        isLink
      >
        GitHub
      </Button>
    </li>
  </ul>
</Navbar>

<main class="font-paper mx-auto max-w-5xl space-y-14 p-4 pb-24">
  <Hero
    type="secondary"
    title="Spaper"
    textLead="PapierCSS components for Svelte — live demo of every component."
  >
    <Button type="secondary" onclick={() => showToast('success')}
      >Show a toast</Button
    >
  </Hero>

  <!-- Breadcrumb -->
  <section id="breadcrumb" class="space-y-4">
    <h2 class="font-paper-heading text-3xl">Breadcrumb</h2>
    <Breadcrumb
      items={[
        { text: 'Home', href: resolve('/') },
        { text: 'Components' },
        { text: 'Demo' },
      ]}
    />
    <Breadcrumb
      border
      items={[
        { text: 'Docs', href: '#' },
        { text: 'Components', href: '#buttons' },
        { text: 'Breadcrumb' },
      ]}
    />
    <Breadcrumb
      items={[
        { text: 'Home', href: resolve('/') },
        { text: 'Library', href: '#' },
        { text: 'Form', href: '#forms' },
        { text: 'Input' },
      ]}
    />
  </section>

  <Divider />

  <!-- Icon -->
  <section id="icons" class="space-y-4">
    <h2 class="font-paper-heading text-3xl">Icon</h2>
    <p class="text-secondary m-0">
      Sketchy icons via <code>spaper/icons</code> — pass an
      <code>IconNode</code>
      to <code>name</code>.
    </p>
    <div class="flex flex-wrap items-center gap-4">
      {#each paperTypes as type}
        <Icon name={Heart} {type} size={28} />
      {/each}
      <Icon name={Star} type="muted" size={28} />
    </div>
    <div class="flex flex-wrap items-center gap-4">
      <Icon name={Home} size={16} />
      <Icon name={Home} size={24} />
      <Icon name={Home} size={36} />
      <Icon name={Search} size={28} strokeWidth={1.5} />
      <Icon name={Search} size={28} strokeWidth={3} />
      <Icon name={Heart} type="danger" size={28} fill="danger" />
    </div>
    <div class="flex flex-wrap items-center gap-4">
      <Icon name={User} type="secondary" size={28} />
      <Icon name={Bell} type="warning" size={28} />
      <Icon name={Mail} type="primary" size={28} />
      <Icon name={Check} type="success" size={28} />
      <Icon name={Download} color="#41403e" size={28} />
      <Button type="secondary" size="small">
        <Icon name={Copy} size={16} class="mr-1 inline" />
        With button
      </Button>
    </div>
  </section>

  <Divider />

  <!-- Buttons -->
  <section id="buttons" class="space-y-4">
    <h2 class="font-paper-heading text-3xl">Button</h2>
    <div class="flex flex-wrap gap-2">
      {#each paperTypes as type}
        <Button {type}>{type}</Button>
      {/each}
    </div>
    <div class="flex flex-wrap gap-2">
      {#each paperTypes as type}
        <Button outline={type}>{type} outline</Button>
      {/each}
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <Button size="small">Small</Button>
      <Button>Default</Button>
      <Button size="large">Large</Button>
      <Button disabled>Disabled</Button>
      <Button loading type="secondary">Loading</Button>
      <Button block type="secondary">Block</Button>
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <CopyButton text="npm i spaper" type="success">
        <Icon name={Copy} size={16} class="mr-1 inline" />
        Copy install
      </CopyButton>
      <CloseButton />
    </div>
  </section>

  <Divider />

  <!-- Popover -->
  <section id="popover" class="space-y-4">
    <h2 class="font-paper-heading text-3xl">Popover</h2>
    <div class="flex flex-wrap items-center gap-6 py-8">
      {#each ['top', 'right', 'bottom', 'left'] as const as position}
        <Popover label={`Popover · ${position}`} {position}>
          <Button outline="secondary">{position}</Button>
        </Popover>
      {/each}
    </div>
    <div class="flex flex-wrap items-center gap-6">
      <Popover label="Always visible" position="top" always>
        <Button type="secondary">always</Button>
      </Popover>
      <Popover label="Forced active" position="bottom" active>
        <Button outline="primary">active</Button>
      </Popover>
      <Popover label="Block layout" position="top" inline={false}>
        <Button outline="success">inline=false</Button>
      </Popover>
    </div>
  </section>

  <Divider />

  <!-- Tags & Alerts -->
  <section id="feedback" class="space-y-4">
    <h2 class="font-paper-heading text-3xl">Tag & Alert</h2>
    <div class="flex flex-wrap gap-2">
      {#each paperTypes as type}
        <Tag {type}>{type}</Tag>
        <Tag {type} rounded>{type}</Tag>
      {/each}
    </div>
    {#each paperTypes as type}
      <Alert {type} dismissible={type === 'danger'}>
        Alert · {type}{#if type === 'danger'}
          (dismissible){/if}
      </Alert>
    {/each}
  </section>

  <Divider />

  <!-- Progress / Spinner / Skeleton -->
  <section class="space-y-4">
    <h2 class="font-paper-heading text-3xl">Progress, Spinner & Skeleton</h2>
    <Progress value={35} type="primary" showValue />
    <Progress value={70} type="success" striped />
    <Progress type="warning" indeterminate />
    <div class="flex flex-wrap items-center gap-4">
      <Spinner type="primary" />
      <Spinner type="secondary" size="large" />
      <Spinner type="success" inline ariaLabel="Loading…" />
    </div>
    <div class="grid gap-2" style="--height: 1.25rem">
      <Skeleton count={3} />
      <div class="flex items-center gap-2">
        <Skeleton circle style="--width: 3rem; --height: 3rem" />
        <Skeleton style="--width: 12rem; --height: 1rem" />
      </div>
    </div>
  </section>

  <Divider />

  <!-- Avatars -->
  <section class="space-y-4">
    <h2 class="font-paper-heading text-3xl">Avatar</h2>
    <div class="flex flex-wrap items-center gap-3">
      {#each paperTypes as type}
        <Avatar label={type.slice(0, 2).toUpperCase()} {type} />
      {/each}
      <Avatar label="LG" size="large" type="secondary" />
      <Avatar label="SM" size="small" type="muted" />
    </div>
    <AvatarGroup>
      <Avatar label="AD" type="primary" />
      <Avatar label="BO" type="secondary" />
      <Avatar label="CY" type="success" />
    </AvatarGroup>
  </section>

  <Divider />

  <!-- Forms -->
  <section id="forms" class="space-y-6">
    <h2 class="font-paper-heading text-3xl">Form controls</h2>
    <div class="max-w-md space-y-4">
      <Input label="Name" placeholder="Your name" bind:value={inputValue} />
      <Input
        label="Bio"
        type="textarea"
        placeholder="Say something…"
        noResize
      />
      <Select label="Font" bind:value={selectValue}>
        <option value="neucha">Neucha</option>
        <option value="patrick">Patrick Hand</option>
        <option value="system">System</option>
      </Select>
      <NumberInput label="Quantity" bind:value={numberValue} min={0} max={10} />
      <Slider
        label="Volume"
        bind:value={sliderValue}
        class="w-full"
        percentage
      />
      <div class="space-y-1">
        <Checkbox
          label="Svelte"
          value="svelte"
          name="libs"
          bind:group={checkGroup}
        />
        <Checkbox
          label="PapierCSS"
          value="papiercss"
          name="libs"
          bind:group={checkGroup}
        />
        <Checkbox label="Disabled" value="x" name="libs" disabled />
      </div>
      <div class="space-y-1">
        <Radio label="Option A" value="a" bind:group={radioGroup} />
        <Radio label="Option B" value="b" bind:group={radioGroup} />
      </div>
      <div class="flex flex-wrap items-center gap-4">
        <Switch bind:checked={switchOn} round>Notifications</Switch>
        <Switch inline>Compact</Switch>
      </div>
      <Button type="secondary">Submit</Button>
    </div>
  </section>

  <Divider />

  <!-- Card & Article -->
  <section class="space-y-4">
    <h2 class="font-paper-heading text-3xl">Card & Article</h2>
    <div class="grid gap-4 md:grid-cols-2">
      <Card
        title="Paper card"
        subTitle="with papiercss"
        header="Featured"
        footer="Footer note"
      >
        Cards keep the hand-drawn look while staying opt-in.
      </Card>
      <Article title="Paper article" border>
        {#snippet meta()}Written for the Spaper demo{/snippet}
        {#snippet textLead()}A short lead paragraph in the paper style.{/snippet}
        Body copy sits inside <code>article-paper</code>.
        {#snippet footer()}
          <div class="flex gap-2">
            <Button size="small">Read more</Button>
            <Button size="small" outline="secondary">Comments</Button>
          </div>
        {/snippet}
      </Article>
    </div>
  </section>

  <Divider />

  <!-- Collapsible & Tabs -->
  <section class="space-y-4">
    <h2 class="font-paper-heading text-3xl">Collapsible & Tabs</h2>
    <Collapsible label="Open me" bind:open={collapsibleOpen}>
      Hidden content revealed with <code>collapsible-paper</code>.
    </Collapsible>
    <Collapsible label="Another section">
      More accordion-style content.
    </Collapsible>

    <Tabs bind:activeTab>
      <Tab label="One">First tab panel</Tab>
      <Tab label="Two">Second tab panel</Tab>
      <Tab label="Three">
        {#snippet header()}Custom header{/snippet}
        Third tab with a custom header snippet.
      </Tab>
    </Tabs>
  </section>

  <Divider />

  <!-- Table & Pagination -->
  <section class="space-y-4">
    <h2 class="font-paper-heading text-3xl">Table & Pagination</h2>
    <Table
      data={tableData}
      columns={['rank', 'name', 'country']}
      striped
      hoverable
    />
    <Pagination total={48} pageSize={10} bind:current={page} jumper />
  </section>

  <Divider />

  <!-- Carousel -->
  <section class="space-y-4">
    <h2 class="font-paper-heading text-3xl">Carousel</h2>
    <Carousel
      bind:index={carouselIndex}
      interval={3000}
      class="border-paper p-4"
    >
      <CarouselItem>
        <div class="bg-primary-soft p-8 text-center text-xl">Slide one</div>
      </CarouselItem>
      <CarouselItem>
        <div class="bg-secondary-soft p-8 text-center text-xl">Slide two</div>
      </CarouselItem>
      <CarouselItem>
        <div class="bg-success-soft p-8 text-center text-xl">Slide three</div>
      </CarouselItem>
    </Carousel>
  </section>

  <Divider />

  <!-- Modal & Toast -->
  <section class="space-y-4">
    <h2 class="font-paper-heading text-3xl">Modal & Toast</h2>
    <div class="flex flex-wrap gap-2">
      <Button type="secondary" onclick={() => (modalOpen = true)}
        >Open modal</Button
      >
      {#each paperTypes as type}
        <Button outline={type} onclick={() => showToast(type)}
          >Toast {type}</Button
        >
      {/each}
    </div>
  </section>
</main>

<Modal
  bind:active={modalOpen}
  title="Demo modal"
  subTitle="papiercss · modal-paper"
  closeBtnText="Done"
>
  This modal is controlled with <code>bind:active</code>. You can also open one
  programmatically via <code>Modal.open()</code>.
  {#snippet footer()}
    <Button outline="secondary" onclick={() => (modalOpen = false)}>
      Cancel
    </Button>
  {/snippet}
</Modal>
