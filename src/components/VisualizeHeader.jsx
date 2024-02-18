import { useContext, useRef , useState  } from "react";
import FileContext from "../store/FileContext.js";
import classes from "../styles/visualizeHeader.module.css";
import { BsDownload } from "react-icons/bs";
import { TfiSave } from "react-icons/tfi";
import Papa from "papaparse";
import { BsLayoutThreeColumns } from "react-icons/bs";
import { BsReverseListColumnsReverse } from "react-icons/bs";
import { MdDeleteSweep } from "react-icons/md";

import Modal from "./Modal.jsx";


function VisualizeHeader() {
  const colRowsEditingModal = useRef();
  const downloadLink = useRef();
  const [editType, setEditType] = useState("col") 
  const { file } = useContext(FileContext);

  const handleSaveNewFile = () => {
    //console.log(file)
    const newFileContent = [file.headers, ...file.rows];
    const newCsvFile = Papa.unparse(newFileContent);

    //creating a blob with the csv file
    const blob = new Blob([newCsvFile], { type: "text/csv" });

    // creating an temporary url from that blob
    const fileURL = URL.createObjectURL(blob);

    //setting the href attr and triggering a click event on the link
    downloadLink.current.href = fileURL;
    downloadLink.current.download = `${file.name}_edit_.csv`;
    downloadLink.current.click();
  };
  const handleEditColumns = (type) =>{
    setEditType(type)
    colRowsEditingModal.current.openModal()
  }
  return (
    <>
      <Modal ref={colRowsEditingModal} type={editType} />
      <div className={classes.VisualizeHeader}>
        <h4 className={classes.title}>
          {file.name} <BsDownload size={20} style={{ cursor: "pointer" }} />
        </h4>
        <TfiSave
          size={20}
          color="white"
          style={{ cursor: "pointer" }}
          onClick={handleSaveNewFile}
        />
        <a href="" ref={downloadLink} className={{ display: "hidden" }} />
        <BsLayoutThreeColumns color="white" size={20} style={{ cursor: "pointer" }} onClick={()=>handleEditColumns("col")}/>
        <BsReverseListColumnsReverse color="white" size={20} style={{ cursor: "pointer" }} onClick={()=>handleEditColumns("row")}/>
        <MdDeleteSweep color="white" size={27} style={{ cursor: "pointer" }} />
      </div>
    </>
  );
}

export default VisualizeHeader;
