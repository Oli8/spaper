<script lang="ts">
/* oxlint-disable no-useless-escape -- <\/script> must not close this block */
import { Button, Carousel, CarouselItem, Hero } from '#lib'
import type { CarouselControls } from '#lib'
import Example from '#docs/Example.svelte'
import API, { propDoc } from '#docs/API.svelte'
import Header from '#docs/Header.svelte'

const thumbnailSlides = [
  'https://picsum.photos/id/10/600/300',
  'https://picsum.photos/id/22/600/300',
  'https://picsum.photos/id/25/600/300',
]

const exampleCode: Record<string, string> = {
  example: `
<Carousel --min-height="300px">
  <CarouselItem>
    <img src="https://picsum.photos/id/10/600/300">
  </CarouselItem>
  <CarouselItem>
    <img src="https://picsum.photos/id/22/600/300">
  </CarouselItem>
  <CarouselItem>
    <img src="https://picsum.photos/id/25/600/300">
  </CarouselItem>
  <CarouselItem>
    <img src="https://picsum.photos/id/43/600/300">
  </CarouselItem>
  <CarouselItem>
    <img src="https://picsum.photos/id/45/600/300">
  </CarouselItem>
</Carousel>`,
  hero: `
<Carousel>
  <CarouselItem>
    <Hero title="Hey there!" />
  </CarouselItem>
  <CarouselItem>
    <Hero title="How you like spaper? :D" />
  </CarouselItem>
  <CarouselItem>
    <Hero title="See ya!" />
  </CarouselItem>
</Carousel>`,
  controls: `
<script>
import { Button, Carousel, CarouselItem } from 'spaper'
<\/script>

<Carousel --min-height="300px">
  {#snippet controls({ index, length, next, previous })}
    <div class="mt-2 flex items-center justify-center gap-2">
      <Button size="small" onclick={previous}>Prev</Button>
      <span>{index + 1} / {length}</span>
      <Button size="small" onclick={next}>Next</Button>
    </div>
  {/snippet}
  <CarouselItem>
    <img src="https://picsum.photos/id/10/600/300">
  </CarouselItem>
  <CarouselItem>
    <img src="https://picsum.photos/id/22/600/300">
  </CarouselItem>
  <CarouselItem>
    <img src="https://picsum.photos/id/25/600/300">
  </CarouselItem>
</Carousel>`,
  thumbnails: `
<script>
import { Carousel, CarouselItem } from 'spaper'

const slides = [
  'https://picsum.photos/id/10/600/300',
  'https://picsum.photos/id/22/600/300',
  'https://picsum.photos/id/25/600/300',
]
<\/script>

<Carousel autoplay={false} --min-height="300px">
  {#snippet controls({ index, goTo })}
    <div class="mt-2 flex justify-center gap-2">
      {#each slides as src, i}
        <button
          type="button"
          class={[
            'cursor-pointer overflow-hidden border-paper p-0',
            'opacity-70 transition hover:opacity-100 hover:shadow-paper',
            i === index && 'border-primary opacity-100',
          ]}
          onclick={() => goTo(i)}
        >
          <img {src} alt="" class="block h-12 w-20 object-cover" />
        </button>
      {/each}
    </div>
  {/snippet}
  {#each slides as src, i}
    <CarouselItem>
      <img {src} alt="Slide {i + 1}">
    </CarouselItem>
  {/each}
</Carousel>`,
}

const props = [
  {
    name: 'index',
    description: 'Active item index',
    type: propDoc.numberType,
    values: propDoc.blank,
    default: '0',
  },
  {
    name: 'interval',
    description: 'milliseconds between two items',
    type: propDoc.numberType,
    values: propDoc.blank,
    default: '2500',
  },
  {
    name: 'autoplay',
    description: 'Whether to automatically starts the slides',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.trueStr,
  },
  {
    name: 'repeat',
    description:
      'Controls whether the carousel loops around at the start and end',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.trueStr,
  },
  {
    name: 'pauseOnHover',
    description: 'Pause carousel when mouse enter',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.trueStr,
  },
  {
    name: 'bullets',
    description: 'Display item indicators. Ignored when `controls` is set',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.trueStr,
  },
  {
    name: 'keyNavigation',
    description: 'Allow right and left key to control carousel navigation',
    type: propDoc.booleanType,
    values: propDoc.blank,
    default: propDoc.trueStr,
  },
  {
    name: 'transition',
    description: 'Which transition to use between to slide (or none)',
    type: propDoc.stringType + ' | null',
    values: 'blur, fade, fly, slide, scale, draw, crossfade',
    default: 'fade',
  },
  {
    name: 'onchange',
    description: 'Called when the displayed item changes',
    type: '(index: number) => void',
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'controls',
    description:
      'Custom navigation. Replaces the default bullets. Receives index, length, goTo, next, previous (0-based)',
    type: 'Snippet<[CarouselControls]>',
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'children',
    description: 'Place to put CarouselItem components',
    type: propDoc.snippetType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
]

const cssProps = [
  {
    name: 'min-height',
    description: 'min height of the carousel',
    default: '120px',
  },
  {
    name: 'height',
    description: 'height of the carousel',
    default: 'auto',
  },
  {
    name: 'max-height',
    description: 'max height of the carousel',
    default: 'none',
  },
  {
    name: 'min-width',
    description: 'min width of the carousel',
    default: '0',
  },
  {
    name: 'width',
    description: 'width of the carousel',
    default: 'auto',
  },
  {
    name: 'max-width',
    description: 'max width of the carousel',
    default: 'none',
  },
]

const itemProps = [
  {
    name: 'children',
    description: 'CarouselItem content',
    type: propDoc.snippetType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
]
</script>

<Header name="Carousel" />

<section>
  <Example title="usage" code={exampleCode.example}>
    <Carousel --min-height="300px">
      <CarouselItem>
        <img src="https://picsum.photos/id/10/600/300" alt="Carousel slide 1" />
      </CarouselItem>
      <CarouselItem>
        <img src="https://picsum.photos/id/22/600/300" alt="Carousel slide 2" />
      </CarouselItem>
      <CarouselItem>
        <img src="https://picsum.photos/id/25/600/300" alt="Carousel slide 3" />
      </CarouselItem>
      <CarouselItem>
        <img src="https://picsum.photos/id/43/600/300" alt="Carousel slide 4" />
      </CarouselItem>
      <CarouselItem>
        <img src="https://picsum.photos/id/45/600/300" alt="Carousel slide 5" />
      </CarouselItem>
    </Carousel>
  </Example>

  <Example title="Hero elements" code={exampleCode.hero}>
    <Carousel>
      <CarouselItem --paper-hero-margin-bottom="0">
        <Hero title="Hey there!" />
      </CarouselItem>
      <CarouselItem --paper-hero-margin-bottom="0">
        <Hero title="How you like spaper? :D" />
      </CarouselItem>
      <CarouselItem --paper-hero-margin-bottom="0">
        <Hero title="See ya!" />
      </CarouselItem>
    </Carousel>
  </Example>

  <Example title="custom controls" code={exampleCode.controls}>
    <Carousel --min-height="300px">
      {#snippet controls({ index, length, next, previous }: CarouselControls)}
        <div class="mt-2 flex items-center justify-center gap-2">
          <Button size="small" onclick={previous}>Prev</Button>
          <span>{index + 1} / {length}</span>
          <Button size="small" onclick={next}>Next</Button>
        </div>
      {/snippet}
      <CarouselItem>
        <img src="https://picsum.photos/id/10/600/300" alt="Carousel slide 1" />
      </CarouselItem>
      <CarouselItem>
        <img src="https://picsum.photos/id/22/600/300" alt="Carousel slide 2" />
      </CarouselItem>
      <CarouselItem>
        <img src="https://picsum.photos/id/25/600/300" alt="Carousel slide 3" />
      </CarouselItem>
    </Carousel>
  </Example>

  <Example title="thumbnails" code={exampleCode.thumbnails}>
    <Carousel autoplay={false} --min-height="300px">
      {#snippet controls({ index, goTo }: CarouselControls)}
        <div class="mt-2 flex justify-center gap-2">
          {#each thumbnailSlides as src, i}
            <button
              type="button"
              class={[
                'cursor-pointer overflow-hidden border-paper p-0',
                'opacity-70 transition hover:opacity-100 hover:shadow-paper',
                i === index && 'border-primary opacity-100',
              ]}
              onclick={() => goTo(i)}
            >
              <img {src} alt="" class="block h-12 w-20 object-cover" />
            </button>
          {/each}
        </div>
      {/snippet}
      {#each thumbnailSlides as src, i}
        <CarouselItem>
          <img {src} alt="Slide {i + 1}" />
        </CarouselItem>
      {/each}
    </Carousel>
  </Example>
</section>

<section>
  <API
    label="Carousel"
    {props}
    {cssProps}
    componentSource="Carousel/Carousel"
  />
  <API
    label="CarouselItem"
    props={itemProps}
    componentSource="Carousel/CarouselItem"
  />
</section>
