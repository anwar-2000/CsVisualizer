import { createContext } from "react";

const FileContext = createContext({
    file : {
        name : "",
        content : [],
        headers : [],
        rows : [],
        showEditModal : false
    },
    setFile : () =>{}
})
export default FileContext;
