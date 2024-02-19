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
import { addColumnAt, deleteColumn } from "../utils/columns";
import { addRow, deleteRow } from "../utils/rows";

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
  const deleteColsRows = () =>{
    if(type === "col"){
      //deleting column
      const newFile = deleteColumn(values.index,file)
      setFile((prev)=>({...prev,headers : newFile.headers,rows : newFile.rows}))
    } else {
      const newFile = deleteRow(file,values.index)
      setFile((prev)=>({...prev, rows : newFile.rows}))
    }
    //closing modal
    dialog.current.close()
    setValues({index : null , position : null})
  }
  const EditTable = () => {
    if (type === "col") {
      //cols logic
      //console.log(values)
      const new_file = addColumnAt(values.index, file, values.position);
      setFile((prev) => ({
        ...prev,
        headers: new_file.headers,
        rows: new_file.rows,
      }));
    } else {
      //console.log(values);
      const new_rows = addRow(file, values.position);
      setFile((prev) => ({ ...prev, rows: new_rows }));
    }
    dialog.current.close()
    setValues({index : null , position : null})
  };
  return (
    <dialog ref={dialog} style={{ position: "relative" }}>
      <div className={classes.modalContent}>
        <h1> Edit {type === "col" ? "Columns" : "Rows"}</h1>
          <>
            <div className={classes.modal__container}>
                <div className={classes.left}>
                  { type === "col" ? <>
                  <h4>Add Columns</h4>
                  <select 
                    onChange={(e) =>
                      setValues((prev) => ({ ...prev, position: e.target.value }))
                    }
                  >
                    <option value="" disabled>
                      Choose position
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
                      Choose Column
                    </option>
                    {file.headers.map((header, i) => (
                      <option key={i} value={i}>
                        {header}
                      </option>
                    ))}
                  </select>
                  <button onClick={EditTable}>ADD</button>
                  </> : 
                  <>
                  <h4>Add Rows</h4>
                  <select
                  onChange={(e) => {
                    // console.log("Selected value:", e.target.value);
                    setValues((prev) => ({ ...prev, position: e.target.value }));
                  }}
                >
                  <option value="" disabled selected>
                    Choose position
                  </option>
                  <option value="start">Start</option>
                  <option value="end">End</option>
                </select>
                <button onClick={EditTable}>SAVE</button>
                  </> }
                </div>
                <div className={classes.right}>
                  {type === "col" ? <>
                    <h4>Delete Columns</h4>
                    <select
                      onChange={(e) =>
                        setValues((prev) => ({ ...prev, index: e.target.value }))
                      }
                    >
                      <option value="" disabled>
                        Choose Column
                      </option>
                      {file.headers.map((header, i) => (
                        <option key={i} value={i}>
                          {header}
                        </option>
                      ))}
                    </select>
                    <button onClick={deleteColsRows}>DELETE</button>
                  </> : <>
                  <h4>Delete Rows</h4>
                    <select
                      onChange={(e) =>
                        setValues((prev) => ({ ...prev, index: e.target.value }))
                      }
                    >
                      <option value="" disabled>
                        Choose Row
                      </option>
                      {file.rows.map((header, i) => (
                        <option key={i} value={i}>
                          {i+1}
                        </option>
                      ))}
                    </select>
                    <button onClick={deleteColsRows}>DELETE</button>
                  </>}
                </div>
            </div>
          </>
          <>
          </>
        
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
