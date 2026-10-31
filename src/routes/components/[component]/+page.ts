import { componentNames } from '$docs/nav'

export function entries() {
  return componentNames.map((component) => ({ component }))
}
