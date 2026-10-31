import * as transition from 'svelte/transition'
import type { Snippet } from 'svelte'
import type { Attributes, StringOrSnippet } from './types'

interface getDomAttributesParams {
  props: Attributes
  classes: string
  toOmit?: string[]
}

const sizeAlias: Record<string, string> = {
  small: 'sm',
  large: 'lg',
}

const propToClass: Record<string, (prefix: string, val: any) => string> = {
  size: (pf, val) => {
    if (!val || val === 'default') return ''
    const mapped = sizeAlias[val] ?? val
    return `${pf}-${mapped}`
  },
  block: (pf, _val) => `${pf}-block`,
  type: (pf, val) => `${pf}-${val}`,
  outline: (pf, val) => `${pf}-${val}-outline`,
}

function omit(
  obj: Record<string, any>,
  properties: string[],
): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, _val]) => !properties.includes(key)),
  )
}

export function computeClasses(
  elPrefix: string,
  props: Record<string, any>,
): string {
  return Object.entries(props)
    .filter(([_prop, val]) => val)
    .map(([prop, val]) => propToClass[prop](elPrefix, val))
    .filter(Boolean)
    .join(' ')
}

export function getDomAttributes({
  props,
  classes,
  toOmit = [],
}: getDomAttributesParams): Attributes {
  return {
    ...omit(props, toOmit),
    class: classes,
  }
}

export type { ComponentProps } from 'svelte'

export function isSnippet(value: StringOrSnippet): value is Snippet {
  return typeof value === 'function'
}

export function configureTransition(
  node: Element,
  {
    name,
    disabled,
  }: { name?: keyof typeof transition | null; disabled?: boolean },
) {
  if (
    disabled ||
    !name ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return { duration: 0 }
  }

  // crossfade returns a tuple; other transitions return TransitionConfig
  return (transition[name] as any)(node)
}
