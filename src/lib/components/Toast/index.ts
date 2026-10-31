import type { Snippet } from 'svelte'
import type { PaperType, PositionY } from '../../types'
import type { IconNode } from '../../icons'
import Toast from './Toast.svelte'
import ToastContainer, { containerClass } from './ToastContainer.svelte'
import { mount, unmount } from 'svelte'

export type ToastPosition =
  | PositionY
  | 'top-right'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-left'

export interface ToastProps {
  /** Replaces the icon chosen from `type`. */
  icon?: IconNode | null
  /** Hides the icon, including the one chosen from `type`. */
  hideIcon?: boolean
  /** Heading shown above the message. */
  title?: string
  message?: string
  /** Custom content. Receives `close`. Replaces `message`. */
  content?: Snippet<[() => void]>
  type?: PaperType
  duration?: number
  position?: ToastPosition
  pauseOnHover?: boolean
  dismissible?: boolean
  indefinite?: boolean
  closeAriaLabel?: string
  class?: string
  onClose?: Function | null
}

interface ToastMethods {
  open: (props: ToastProps | string) => void
  info: (options: OpenWithTypeParams | string) => void
  success: (options: OpenWithTypeParams | string) => void
  warning: (options: OpenWithTypeParams | string) => void
  warn: (options: OpenWithTypeParams | string) => void
  danger: (options: OpenWithTypeParams | string) => void
  error: (options: OpenWithTypeParams | string) => void
  clear: (position?: ToastPosition) => void
}

type OpenWithTypeParams = Omit<ToastProps, 'type'>
type ToastInstance = { close: () => void }

const instances = new Map<ToastInstance, ToastPosition>()
const cleanups = new Map<ToastInstance, () => void>()

function containerSelector(position: ToastPosition) {
  return `.${containerClass}.${position}`
}

function ensureContainer(position: ToastPosition): HTMLElement {
  const existing = document.querySelector(containerSelector(position))
  if (existing instanceof HTMLElement) return existing

  mount(ToastContainer, {
    target: document.body,
    props: { position },
  })

  const created = document.querySelector(containerSelector(position))
  if (!(created instanceof HTMLElement)) {
    throw new Error(`Missing toast container for ${position}`)
  }
  return created
}

function removeContainerIfEmpty(position: ToastPosition) {
  const el = document.querySelector(containerSelector(position))
  if (el && el.children.length === 0) el.remove()
}

export function open(props: ToastProps | string) {
  if (typeof props === 'string') props = { message: props }

  const position = props.position ?? 'top'
  const userOnClose = props.onClose
  const target = ensureContainer(position)
  const anchor = target.firstChild

  let settled = false

  function finish() {
    if (settled) return
    settled = true
    cleanups.delete(instance)
    unmount(instance)
    removeContainerIfEmpty(position)
  }

  const instance = mount(Toast, {
    target,
    anchor: anchor ?? undefined,
    props: {
      ...props,
      position,
      onClose: () => {
        instances.delete(instance)
        userOnClose?.()
        // Outro is 300ms; unmount after it so the fade is not cancelled
        setTimeout(finish, 350)
      },
    },
    intro: true,
  })

  cleanups.set(instance, finish)
  instances.set(instance, position)
}

function openType(type: PaperType) {
  return (options: OpenWithTypeParams | string) => {
    const props: ToastProps = {
      type,
      message: '',
    }

    if (typeof options === 'string') props.message = options
    else Object.assign(props, options)

    open(props)
  }
}

/** Dismiss active toasts immediately (optionally only one position lane). */
export function clear(position?: ToastPosition) {
  for (const [instance, pos] of instances) {
    if (position && pos !== position) continue
    instances.delete(instance)
    cleanups.get(instance)?.()
  }
}

export const info = openType('secondary')
export const success = openType('success')
export const warning = openType('warning')
export const warn = warning
export const danger = openType('danger')
export const error = danger

Object.assign(Toast, {
  open,
  info,
  success,
  warning,
  warn,
  error,
  danger,
  clear,
})

export default Toast as unknown as ToastMethods
