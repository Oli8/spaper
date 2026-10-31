import { mount, unmount } from 'svelte'
import type { ComponentProps } from 'svelte'
import Modal from './Modal.svelte'

type ModalProps = ComponentProps<typeof Modal>
type ProgrammaticModalProps = Omit<ModalProps, 'active'>

interface ProgrammaticModalInstance {
  close: () => void
}

type ProgrammaticModalComponent = typeof Modal & {
  open: (props: ProgrammaticModalProps) => ProgrammaticModalInstance
}

const TRANSITION_TIME = 300

function open(props: ProgrammaticModalProps): ProgrammaticModalInstance {
  let closing = false

  const modal = mount(Modal, {
    target: document.body,
    props: {
      ...props,
      active: true,
      onclose: () => {
        props.onclose?.()
        if (closing) return
        closing = true
        setTimeout(() => unmount(modal), TRANSITION_TIME)
      },
    },
  })

  return {
    close: () => {
      if (closing) return
      modal.close()
    },
  }
}

;(Modal as ProgrammaticModalComponent).open = open

export default Modal as ProgrammaticModalComponent
