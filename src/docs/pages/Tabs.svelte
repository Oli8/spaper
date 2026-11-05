<script lang="ts">
/* oxlint-disable no-useless-escape -- <\/script> must not close this block */
import { Tabs, Tab, Select, Icon, Divider } from '#lib'
import { House, User, Settings } from '#lib/icons.js'
import Example from '#docs/Example.svelte'
import API, { propDoc } from '#docs/API.svelte'
import Header from '#docs/Header.svelte'

let selected = '2'

const exampleCode: Record<string, string> = {
  usage: `
<Tabs>
  <Tab label="A">
    A: Doggo ipsum wow such tempt snoot tungg long
    woofer doggorino, aqua doggo boofers doggorino...
  </Tab>
  <Tab label="B">
    B: Doggo ipsum very hand that feed shibe fluffer
    tungg boofers shooberino you are doin me a concern...
  </Tab>
  <Tab label="C">
    C: Doggo ipsum long doggo long woofer heckin you
    are doing me the shock boof maximum borkdrive...
  </Tab>
</Tabs>`,
  header: `
<script>
import { Icon } from 'spaper';
import { House, User, Settings } from 'spaper/icons';
<\/script>

<Tabs>
  <Tab label="Home" icon={House}>Welcome home</Tab>
  <Tab label="Account" icon={User}>Account details</Tab>
  <Tab label="Settings" icon={Settings}>Preferences</Tab>
</Tabs>

<Tabs>
  <Tab label="Home">
    {#snippet header()}
      <span class="flex gap-1.5">
        <Icon name={House} size={18} /> Home
      </span>
    {/snippet}
    Welcome home
  </Tab>
  <Tab label="Account">
    {#snippet header()}
      <span class="flex gap-1.5">
        <Icon name={User} size={18} /> Account
      </span>
    {/snippet}
    Account details
  </Tab>
  <Tab label="Settings">
    {#snippet header()}
      <span class="flex gap-1.5">
        <Icon name={Settings} size={18} /> Settings
      </span>
    {/snippet}
    Preferences
  </Tab>
</Tabs>`,
  placement: `
<Tabs>
  <Tab label="A">spaces (default)</Tab>
  <Tab label="B">spaces (default)</Tab>
  <Tab label="C">spaces (default)</Tab>
</Tabs>

<Divider />

<Tabs placement="edges">
  <Tab label="A">edges</Tab>
  <Tab label="B">edges</Tab>
  <Tab label="C">edges</Tab>
</Tabs>

<Divider />

<Tabs placement="right">
  <Tab label="A">right</Tab>
  <Tab label="B">right</Tab>
  <Tab label="C">right</Tab>
</Tabs>

<Divider />

<Tabs placement="center">
  <Tab label="A">center</Tab>
  <Tab label="B">center</Tab>
  <Tab label="C">center</Tab>
</Tabs>

<Divider />

<Tabs placement="left">
  <Tab label="A">left</Tab>
  <Tab label="B">left</Tab>
  <Tab label="C">left</Tab>
</Tabs>`,
  active: `
<script>
  let selected = 2;
<\/script>

<Select label="Active tab"
        bind:value={selected}>
  <option value={0}>A</option>
  <option value={1}>B</option>
  <option value={2}>C</option>
</Select>

<Tabs bind:activeTab={selected}>
  <Tab label="A">A</Tab>
  <Tab label="B">B</Tab>
  <Tab label="C">C</Tab>
</Tabs>`,
}

const tabsProps = [
  {
    name: 'activeTab',
    description: 'Active tab index',
    type: propDoc.numberType,
    values: propDoc.blank,
    default: '0',
  },
  {
    name: 'placement',
    description: 'Tabs label placement',
    type: propDoc.stringType,
    values: 'spaces, edges, right, center, left',
    default: 'spaces',
  },
  {
    name: 'contentAlign',
    description: "Tab content 'text-align' value",
    type: propDoc.stringType,
    values: 'Any valid values for css text-align property',
    default: 'left',
  },
  {
    name: 'onchange',
    description: 'Called when the active tab changes',
    type: '(index: number) => void',
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'children',
    description: 'Place to put Tab components',
    type: propDoc.snippetType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
]

const tabProps = [
  {
    name: 'label',
    description: 'Tab label/title',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'icon',
    description: 'Icon shown to the left of the header text',
    type: 'IconNode',
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'header',
    description: 'Custom tab header. Replaces the label',
    type: propDoc.snippetType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'children',
    description: 'Tab content',
    type: propDoc.snippetType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
]
</script>

<Header name="Tabs" legend="Easily switch between different views" />

<section>
  <Example title="basic usage" code={exampleCode.usage}>
    <Tabs>
      <Tab label="A">
        A: Doggo ipsum shoober borkf shoober heckin angery woofer stop it fren
        noodle horse doggo smol lotsa. Ur givin me a spook mlem smol borking
        doggo with a long. Thicc borkf doing me a frighten you are doing me the
        shock you are. Super chub floofs he made many woofs heckin. Ur givin me
        a spook big ol pupper heckin angery woofer heckin. Maximum borkdrive
        most angery pupper I have ever seen heckin good boys doing me a frighten
        the neighborhood. You are doin me a concern shoob such treat blop length
        boy maximum borkdrive stop it fren. Very taste wow very good spot wow
        very biscit very good. Long doggo waggy wags very good spot boofers ruff
        woofer clouds. Pupperino I am bekom fat adorable doggo lotsa pats big ol
        pupper shibe heckin good. Very jealous pupper corgo bork pupper very
        jealous pupper snoot very taste wow very jealous. Woofer waggy wags sub
        woofer blop you are doing me a frighten wrinkler puggorino. Puggorino
        lotsa pats porgo very good spot pats super.
      </Tab>
      <Tab label="B">
        B: Doggo ipsum very hand that feed shibe fluffer tungg boofers
        shooberino you are doin me a concern, waggy wags very taste wow most
        angery pupper I have ever seen. Puggo ur givin me a spook what a nice
        floof very jealous pupper he made many woofs woofer, wrinkler he made
        many woofs borkdrive vvv. Heckin good boys and girls extremely cuuuuuute
        tungg blop pupper very good spot puggo you are doing me a frighten,
        clouds pupper extremely cuuuuuute big ol pupper wrinkler. The
        neighborhood pupper such treat pats h*ck pupper big ol pupper, smol
        shoob woofer puggo. Big ol pupper porgo fat boi snoot stop it fren,
        corgo shibe borking doggo floofs, super chub corgo pupper. Woofer
        shooberino clouds blop puggorino doge maximum borkdrive, smol clouds sub
        woofer h*ck lotsa pats pats waggy wags, boof doge long woofer noodle
        horse boof.
      </Tab>
      <Tab label="C">
        C: Doggo ipsum long doggo long woofer heckin you are doing me the shock
        boof maximum borkdrive, blop long woofer heckin good boys. Sub woofer
        very taste wow the neighborhood pupper waggy wags heckin good boys wow
        very biscit, pats smol borking doggo with a long snoot for pats borking
        doggo. He made many woofs fluffer long water shoob woofer long water
        shoob woofer tungg many pats, corgo doggo super chub you are doing me a
        frighten super chub.
      </Tab>
    </Tabs>
  </Example>

  <Example title="header" code={exampleCode.header}>
    <Tabs>
      <Tab label="Home" icon={House}>Welcome home</Tab>
      <Tab label="Account" icon={User}>Account details</Tab>
      <Tab label="Settings" icon={Settings}>Preferences</Tab>
    </Tabs>
    <Tabs>
      <Tab label="Home">
        {#snippet header()}
          <span class="flex gap-1.5">
            <Icon name={House} size={18} /> Home
          </span>
        {/snippet}
        Welcome home
      </Tab>
      <Tab label="Account">
        {#snippet header()}
          <span class="flex gap-1.5">
            <Icon name={User} size={18} /> Account
          </span>
        {/snippet}
        Account details
      </Tab>
      <Tab label="Settings">
        {#snippet header()}
          <span class="flex gap-1.5">
            <Icon name={Settings} size={18} /> Settings
          </span>
        {/snippet}
        Preferences
      </Tab>
    </Tabs>
  </Example>

  <Example title="placement" code={exampleCode.placement}>
    <Tabs>
      <Tab label="A">spaces (default)</Tab>
      <Tab label="B">spaces (default)</Tab>
      <Tab label="C">spaces (default)</Tab>
    </Tabs>

    <Divider />

    <Tabs placement="edges">
      <Tab label="A">edges</Tab>
      <Tab label="B">edges</Tab>
      <Tab label="C">edges</Tab>
    </Tabs>

    <Divider />

    <Tabs placement="right">
      <Tab label="A">right</Tab>
      <Tab label="B">right</Tab>
      <Tab label="C">right</Tab>
    </Tabs>

    <Divider />

    <Tabs placement="center">
      <Tab label="A">center</Tab>
      <Tab label="B">center</Tab>
      <Tab label="C">center</Tab>
    </Tabs>

    <Divider />

    <Tabs placement="left">
      <Tab label="A">left</Tab>
      <Tab label="B">left</Tab>
      <Tab label="C">left</Tab>
    </Tabs>
  </Example>

  <Example title="active" code={exampleCode.active}>
    <Select label="Active tab" bind:value={selected}>
      <option value={0}>A</option>
      <option value={1}>B</option>
      <option value={2}>C</option>
    </Select>

    <Tabs bind:activeTab={selected} class="mt-4">
      <Tab label="A">A</Tab>
      <Tab label="B">B</Tab>
      <Tab label="C">C</Tab>
    </Tabs>
  </Example>
</section>

<section>
  <API label="Tabs" props={tabsProps} componentSource="Tabs/Tabs" />
  <API
    label="Tab"
    showHeader={false}
    props={tabProps}
    componentSource="Tabs/Tab"
  />
</section>
