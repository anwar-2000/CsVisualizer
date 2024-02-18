import {
  forwardRef,
  useContext,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import FileContext from "../store/FileContext";
import classes from "../styles/modal.module.css";
import { IoCloseOutline } from "react-icons/io5";
import { addColumnAt } from "../utils/columns";
import { addRow } from "../utils/rows";

const Modal = forwardRef(({ type }, ref) => {
  //type : "col || row"
  const dialog = useRef();
  const [values, setValues] = useState({
    index: null,
    position: null,
  });
  const { file, setFile } = useContext(FileContext);
  useImperativeHandle(ref, () => ({
    openModal: () => dialog.current.showModal(),
  }));
  //console.log(file.rows)
  const EditTable = () => {
    if (type === "col") {
      //cols logic
      //console.log(values)
      const new_file = addColumnAt(values.index, file, values.position);
      setFile((prev) => ({
        ...prev,
        headers: new_file.headers,
        content: new_file.content,
      }));
    } else {
      console.log(values);
      const new_rows = addRow(file, values.position);
      setFile((prev) => ({ ...prev, rows: new_rows }));
      return;
    }
  };
  return (
    <dialog ref={dialog} style={{ position: "relative" }}>
      <div className={classes.modalContent}>
        <h1> Edit {type === "col" ? "Columns" : "Rows"}</h1>
        {type === "col" ? (
          <>
            <select
              onChange={(e) =>
                setValues((prev) => ({ ...prev, position: e.target.value }))
              }
            >
              <option value="" disabled>
                {" "}
                Choose position{" "}
              </option>
              <option value="before">Before</option>
              <option value="after">After</option>
            </select>
            <select
              onChange={(e) =>
                setValues((prev) => ({ ...prev, index: e.target.value }))
              }
            >
              <option value="" disabled>
                {" "}
                Choose Column
              </option>
              {file.headers.map((header, i) => (
                <option key={i} value={i}>
                  {header}
                </option>
              ))}
            </select>
          </>
        ) : (
          <select
            onChange={(e) => {
              // console.log("Selected value:", e.target.value);
              setValues((prev) => ({ ...prev, position: e.target.value }));
            }}
          >
            <option value="" disabled selected>
              Choose position{" "}
            </option>
            <option value="start">Start</option>
            <option value="end">End</option>
          </select>
        )}
        <button onClick={EditTable}>Save</button>
      </div>
      <form
        method="dialog"
        style={{ position: "absolute", top: "0.5rem", right: "0rem" }}
      >
        <button className={classes.close}>
          <IoCloseOutline size={30} color="red" />
        </button>
      </form>
    </dialog>
  );
});

export default Modal;
