import { createContext } from "react";

const FileContext = createContext({
    file : {
        name : "",
        content : [],
        headers : [],
        rows : []
    },
    setFile : () =>{}
})
export default FileContext;
