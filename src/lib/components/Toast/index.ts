import type { PaperType, PositionY } from '../../types';
import Toast from './Toast.svelte';

export type ToastPosition = PositionY | 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left';

interface ToastProps {
  message: string;
  type?: PaperType;
  duration?: number;
  position?: ToastPosition;
  pauseOnHover?: boolean;
  dismissible?: boolean;
  indefinite?: boolean;
  closeAriaLabel?: string;
  onClose?: Function;
}

interface ToastMethods {
  open: (props: ToastProps|string) => void;
  info: (options: OpenWithTypeParams|string) => void;
  success: (options: OpenWithTypeParams|string) => void;
  warning: (options: OpenWithTypeParams|string) => void;
  warn: (options: OpenWithTypeParams|string) => void;
  danger: (options: OpenWithTypeParams|string) => void;
  error: (options: OpenWithTypeParams|string) => void;
}

type OpenWithTypeParams = Omit<ToastProps, 'type'>

export function open(props: ToastProps|string) {
  if (typeof props === 'string')
    props = { message: props };

  new Toast({
    target: document.body,
    props,
    intro: true,
  });
}

function openType(type: PaperType) {
  return (options: OpenWithTypeParams|string) => {
    const props: ToastProps = {
      type,
      message: '',
    };

    if (typeof options === 'string')
      props.message = options
    else
      Object.assign(props, options)

    new Toast({
      target: document.body,
      props,
      intro: true,
    });
  }
}

export const info = openType('secondary');
export const success = openType('success');
export const warning = openType('warning');
export const warn = warning;
export const danger = openType('danger');
export const error = danger;

Object.assign(Toast, {
  open, info, success, warning, warn, error, danger
})

export default (Toast as unknown as ToastMethods);
