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
