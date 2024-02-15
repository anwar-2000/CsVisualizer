import { useContext, useRef  } from "react";
import FileContext from "../store/FileContext.js";
import classes from "../styles/visualizeHeader.module.css";
import { BsDownload } from "react-icons/bs";
import { TfiSave } from "react-icons/tfi";
import Papa from "papaparse";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";
import RowsColsEvents from "./RowsColsEvents.jsx";


function VisualizeHeader() {
  const downloadLink = useRef();
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
  return (
    <>
      <div className={classes.VisualizeHeader}>
        <h4 className={classes.title}>
          {file.name} <BsDownload size={20} style={{ cursor: "pointer" }} />{" "}
        </h4>
        <TfiSave
          size={20}
          color="black"
          style={{ cursor: "pointer" }}
          onClick={handleSaveNewFile}
        />
        <a href="" ref={downloadLink} className={{ display: "hidden" }} />
      </div>
    </>
  );
}

export default VisualizeHeader;
