import { componentNames } from '#docs/nav.js'

export function entries() {
  return componentNames.map((component) => ({ component }))
}
