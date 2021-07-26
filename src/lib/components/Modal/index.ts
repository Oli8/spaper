import Modal from './Modal.svelte';

function open(props) {
  const modal = new Modal({
    target: document.body,
    props: { active: true, ...props },
    intro: true
  });

  modal.close = modal.$destroy;

  return modal;
}

(Modal as any).open = open;

export default Modal;
