import { useRef } from "react";
import { useContext, useState } from "react";
import FileContext from "../store/FileContext.js";
import classes from "../styles/table.module.css";
const Table = () => {
  const { file } = useContext(FileContext);
  const [selectedText,setSelectedText] = useState({
    indexRow : null,
    indexItem : null,
    content : "",
  })
  const ItemContent = useRef(null)
  const handleDoubleClickTitle = (index) => {
    //console.log(index, file.headers[index]);
    setSelectedText({indexRow : null , indexItem : index , content : file.headers[index]})
  };
  const handleDoubleClickRow = (index) => {
   // console.log(index, file.rows[index]);
  };
  const handleDoubleClickItem = (indexRow, indexItem) => {
   // console.log(indexRow, indexItem, file.rows[indexRow]);
    //when indexItem is null
    if(!indexItem){
      setSelectedText({indexRow : indexRow , indexItem : null , content : file.rows[indexRow]})
      return;
    }
    //console.log(indexRow, indexItem, file.rows[indexRow][indexItem]);
    setSelectedText({indexRow : indexRow , indexItem : indexItem , content : file.rows[indexRow][indexItem] })
  };
  const handleTitleItemTextChange = (state) => {
    const newValue = ItemContent.current.value;
    if(selectedText.content !== newValue){
     file.headers[selectedText.indexItem] = newValue
    }
    setSelectedText({indexItem : null , indexRow : null , content : ""})
  }
  const handleRowItemTextChange = (state) => {
    const newValue = ItemContent.current.value;
    if(selectedText.content !== newValue){
      // duplex means 2 , we have two pointers of row item , otherwise its just 1
     state === "duplex" ? file.rows[selectedText.indexRow][selectedText.indexItem] = newValue : file.rows[selectedText.indexRow] = newValue
    }else{
      return;
    }
    setSelectedText({indexItem : null , indexRow : null , content : ""})
  }
  return (
    <table className={classes.table}>
      <thead>
        <tr>
          {file.headers.length > 1
            ? file.headers.map((value, i) => (
                <th key={i} onDoubleClick={() => handleDoubleClickTitle(i)}>
                  {
                ( selectedText.indexItem === i) ?
                      <input ref={ItemContent} onBlur={handleTitleItemTextChange} type="text" name="content" defaultValue={selectedText.content} /> 
                 :
                  value
                }
                </th>
              ))
            : <th onDoubleClick={() => handleDoubleClickTitle(0)}>
                    {
                (selectedText.indexItem === 0) ?
                      <input ref={ItemContent} onBlur={handleTitleItemTextChange} type="text" name="content" defaultValue={selectedText.content} /> 
                 :
                  "Change header"
                }
                  </th>}
              
              
        </tr>
      </thead>
      <tbody>
      {file.rows.map((item, j) => (
        <tr key={j} onDoubleClick={() => handleDoubleClickRow(j)}>
          {item.length > 1 ? (
            item.map((value, i) => (
              <td key={i} onDoubleClick={() => handleDoubleClickItem(j, i)}>
                {
                (selectedText.indexRow === j && selectedText.indexItem === i) ?
                      <input ref={ItemContent} onBlur={()=>handleRowItemTextChange("duplex")} type="text" name="content" defaultValue={selectedText.content} /> 
                 :
                  value
                }
              </td>
            ))
          ) : (
            <td key={j} onDoubleClick={() => handleDoubleClickItem(j,null)}>
              {
                (selectedText.indexRow === j) ?
                      <input ref={ItemContent} onBlur={()=>handleRowItemTextChange("only one index")} type="text" name="content" defaultValue={selectedText.content} /> 
                 :
                  item
                }
            </td>
          )}
        </tr>
      ))}
      </tbody>
    </table>
  );
};

export default Table;
