<script lang="ts">
/* oxlint-disable no-useless-escape -- <\/script> must not close this block */
import { Select } from '#lib'
import Example from '#docs/Example.svelte'
import API, { propDoc } from '#docs/API.svelte'
import Header from '#docs/Header.svelte'

let boardSize = '8'
let wheelSize = '53'

const exampleCode: Record<string, string> = {
  example: `
<script>
  let boardSize = '8';
  let wheelSize = '53';
<\/script>

<div class="flex flex-col gap-4">
  <Select label="Board Size" bind:value={boardSize}>
    <option value="7.5">7.5</option>
    <option value="7.6">7.6</option>
    <option value="7.75">7.75</option>
    <option value="7.87">7.87</option>
    <option value="8">8</option>
    <option value="8.125">8.125</option>
    <option value="8.25">8.25</option>
    <option value="8.5">8.5</option>
  </Select>

  <Select label="Wheel Size" bind:value={wheelSize}>
    <option value="50">50</option>
    <option value="52">52</option>
    <option value="53">53</option>
    <option value="54">54</option>
    <option value="55">55</option>
    <option value="57">57</option>
    <option value="60">60</option>
  </Select>
  <p>
    Setup: <strong>{boardSize}</strong>in board with
    <strong>{wheelSize}</strong>mm wheels
  </p>
</div>`,
}

const props = [
  {
    name: 'label',
    description: 'Select label',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'value',
    description: 'Select value',
    type: propDoc.stringType,
    values: propDoc.blank,
    default: propDoc.blank,
  },
  {
    name: 'onchange',
    description: 'Called when the value changes',
    type: '(value: string) => void',
    values: propDoc.blank,
    default: propDoc.blank,
  },
]
</script>

<Header name="Select" />

<section>
  <Example title="usage" code={exampleCode.example}>
    <div class="flex flex-col gap-4">
      <Select label="Board Size" bind:value={boardSize}>
        <option value="7.5">7.5</option>
        <option value="7.6">7.6</option>
        <option value="7.75">7.75</option>
        <option value="7.87">7.87</option>
        <option value="8">8</option>
        <option value="8.125">8.125</option>
        <option value="8.25">8.25</option>
        <option value="8.5">8.5</option>
      </Select>

      <Select label="Wheel Size" bind:value={wheelSize}>
        <option value="50">50</option>
        <option value="52">52</option>
        <option value="53">53</option>
        <option value="54">54</option>
        <option value="55">55</option>
        <option value="57">57</option>
        <option value="60">60</option>
      </Select>
      <p>
        Setup: <strong>{boardSize}</strong>inches board with
        <strong>{wheelSize}</strong>mm wheels
      </p>
    </div>
  </Example>
</section>

<section>
  <API {props} componentSource="Form/Select" />
</section>
