![version](https://img.shields.io/npm/v/spaper)

# Spaper

PapierCSS components for Svelte

## Documentation

Browse [documentation and demo here](https://oli8.github.io/spaper/).

## Start

### Install

```bash
npm i spaper papiercss tailwindcss
```

### Import papiercss

```css
@import 'papiercss/fonts.css'; /* optional */
@import 'tailwindcss';
@import 'papiercss';
@source '../node_modules/spaper';
```

`@source` is relative to the CSS file. This scans the installed package so Tailwind generates the utility classes used inside the components.

### Usage

```svelte
<script>
import { Button } from 'spaper'
</script>

<Button>Click me</Button>
```

<hr />

### Donate

Any donation is greatly appreciated :heart:

| Source         | Link / Address                   |
| :------------- | :------------------------------- |
| Github Sponsor | https://github.com/sponsors/Oli8 |
| PayPal         | https://paypal.me/OliCrt         |

#### Components

- Alert
- Article
- Tag
- Breadcrumb
- Button
- Card
- Carousel
- CloseButton
- Collapsible
- CopyButton
- Checkbox
- Input
- NumberInput
- Radio
- Select
- Slider
- Switch
- Hero
- Modal
- Navbar
- Pagination
- Popover
- Progress
- Skeleton
- Table
- Tabs
- Toast
