import React, { useContext } from "react";
import FileContext from "../store/FileContext";
import classes from "../styles/rowsColsEvents.module.css";

function RowsColsEvents({ type }) {  // type = "ROW || COL"
  const { file } = useContext(FileContext);


  const handleAddBefore = (type,index) => {
    // type = "ROW || COL"
  }
  const handleAddAfter = (type,index) => {
    // type = "ROW || COL"

  }
  return (
    <div className="container">
      <ul>
        {type === "COL"
          ? file.headers.map((col, i) => <>
            <li key={i} onClick={()=>handleAddBefore("COL",i)}> before {col}</li>
            <li key={i+1} onClick={()=>handleAddAfter("COL",i)}> after {col}</li>
          </>)
          : file.content.map((row, i) => <>
            <li key={i} onClick={()=>handleAddBefore("ROW",i)}> before {row}</li>
            <li key={i+1} onClick={()=>handleAddAfter("ROW",i)}> after {row}</li>
          </>)}
      </ul>
    </div>
  );
}

export default RowsColsEvents;
