import React from 'react'
import FileContext from './FileContext'
import { useState } from 'react';

function FileContextProvider({children}) {
  const [file, setFile] = useState({
    name : "",
    content :  "",
    headers : [],
    rows : []
  });
  const contextValue = {
    file,
    setFile
  }
  return <FileContext.Provider value={contextValue}>
        {children}
  </FileContext.Provider>
}

export default FileContextProvider