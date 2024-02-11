import classes from "../styles/uploadFile.module.css"
import { BsFiletypeCsv } from "react-icons/bs";
import { useContext, useRef } from "react";
import {useNavigate} from "react-router-dom"
import FileContext from "../store/FileContext.js"
import Papa from "papaparse"
function UploadFile() {
  const {file , setFile} = useContext(FileContext)
  const navigate = useNavigate()
  const fileInput = useRef(null) 
  const OpenFileSelection = () => {
    fileInput.current.click()
  }

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const parsedData = Papa.parse(e.target.result);
        if (parsedData && parsedData.data) {
         // setFile((prev)=>({...prev, Json : parsedData.data}));
          setFile({
            name: selectedFile.name,
            content: parsedData.data,
            headers : parsedData.data[0],
            rows : parsedData.data.slice(1)
          });
          navigate("visualize")
        }
      };

      reader.readAsText(selectedFile); // Read file as text
      //console.log(file)
      
    }
  };
  return (
    <div className={classes.container} onClick={OpenFileSelection}>
        <input ref={fileInput} type="file" accept=".csv" name="csvFile" onChange={handleFileChange}  />
        <BsFiletypeCsv size={35} />
    </div>
  )
}
export default UploadFile
