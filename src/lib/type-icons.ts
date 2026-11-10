import type { PaperType } from './types'
import { Check, CircleX, Info, TriangleAlert, type IconNode } from './icons'

/** Icon shown for a paper type. Info covers primary and secondary. */
export const typeIcons: Record<PaperType, IconNode> = {
  success: Check,
  warning: TriangleAlert,
  danger: CircleX,
  primary: Info,
  secondary: Info,
}
