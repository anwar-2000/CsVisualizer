import { forwardRef, useImperativeHandle , useRef} from "react";

const Modal = forwardRef((props, ref) => {
    const dialog = useRef()
  useImperativeHandle(ref, () => ({
    openModal: () => dialog.current.showModal(), 
    closeModal: () => dialog.current.close(),
    // Add other methods as needed
  }));

  return (
    <dialog ref={dialog} >
      <h1>Edit Table COLS/ROWS</h1>
      <form method="dialog">
        <button>
            Close
        </button>
      </form>
    </dialog>
  );
});

export default Modal;
