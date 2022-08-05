![version](https://img.shields.io/npm/v/spaper)

# Spaper
PaperCSS components for Svelte

## Documentation

Browse [documentation and demo here](https://oli8.github.io/spaper/).

## Start

### Import papercss

Add a link to the CDN into your HTML file:  

```html
<link rel="stylesheet" href="https://unpkg.com/papercss@1.8.3/dist/paper.min.css">
```

Or use NPM:

```bash
npm i papercss
```  

then import in your main component:
```html
<script>
  import 'papercss/dist/paper.min.css'
</script>
```

### Install spaper

```bash
npm i spaper
```

### Usage

```html
<script>
  import { Button } from 'spaper';
  // or
  import Alert from 'spaper/components/Alert.Svelte';
</script>

<Alert>...</Alert>
<Button>Click me</Button>
```

<hr />

### Sponsors

Thanks to these generous people! :heart:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/mehdi-dalil">
        <img src="https://avatars.githubusercontent.com/u/65339771?v=4" width="80px;" alt=""/><br />
        <sub><b>mehdi-dalil</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/t0kido">
        <img src="https://avatars.githubusercontent.com/u/12486500?v=4" width="80px;" alt=""/><br />
        <sub><b>t0kido</b></sub>
      </a>
    </td>
  </tr>
</table>    


### Donate

Any donation is greatly appreciated :heart:

| Source          | Link / Address                             |
| :-------------- | :------------------------------------------|
| Github Sponsor  | https://github.com/sponsors/Oli8           |
| PayPal          | https://paypal.me/OliCrt                   |
| Bitcoin         | 1Ez3Ts2WShUcbeGCjhZapdxVDK77DbYjdU         |
| Ethereum        | 0x6cd3d316a6ee6d210894981e1fcc83a00a27ede2 |

#### Components

- Alert
- Article
- Badge
- Breadcrumb
- Button
- Card
- CloseButton
- Collapsible
- CopyButton
- Form
- Checkbox
- Input
- Radio
- Select
- Slider
- Switch
- Modal
- Navbar
- Pagination
- Popover
- Progress
- Table
- Tabs
- Toast
