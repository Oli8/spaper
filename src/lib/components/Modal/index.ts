import type { SvelteComponent } from 'svelte';
import type { ComponentProps } from '../../utils';
import Modal from './Modal.svelte';

type ModalProps = ComponentProps<Modal>;

interface ProgrammaticModal {
  open?: (props: Omit<ModalProps, 'active'>) => ProgrammaticModalInstance;
  close?: () => void;
}

type ProgrammaticModalComponent = ProgrammaticModal & typeof SvelteComponent;
type ProgrammaticModalInstance = ProgrammaticModal & SvelteComponent;

const TRANSITION_TIME = 235;

function open(props: Record<string, any>) {
  const modal: ProgrammaticModalInstance = new Modal({
    target: document.body,
    props,
  });
  // Preserve transition
  setTimeout(modal.$set.bind(modal, { active: true }), 1);

  modal.close = () => {
    modal.$set({ active: false });
    setTimeout(modal.$destroy, TRANSITION_TIME);
  }

  return modal;
}

(Modal as ProgrammaticModalComponent).open = open;

export default (Modal as ProgrammaticModalComponent);
