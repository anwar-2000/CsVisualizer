import { useRef } from "react";
import { useContext, useState } from "react";
import FileContext from "../store/FileContext.js";
import classes from "../styles/table.module.css";

const Table = () => {

  const { file } = useContext(FileContext);

  const [selectedText,setSelectedText] = useState({
    indexRow : null,
    indexItem : null,
    titleIndex : null,
    content : "",
    col : null,
    row : null,
  })

  const ItemContent = useRef(null)
  const handleDoubleClickTitle = (index) => {
    //console.log(index, file.headers[index]);
    setSelectedText({indexRow : null , titleIndex : index , indexItem : null, content : file.headers[index]})
  };
  const handleDoubleClickItem = (e,indexRow, indexItem) => {
     e.stopPropagation()
   //console.log(indexRow, indexItem, file.rows[indexRow]);

    //when indexItem is null
    if(indexItem === null){
      setSelectedText({indexRow : indexRow , indexItem : null , content : file.rows[indexRow]})
      return;
    }
    //console.log(indexRow, indexItem, file.rows[indexRow][indexItem]);
    setSelectedText({indexRow : indexRow , indexItem : indexItem , content : file.rows[indexRow][indexItem] })
  };
  const handleTitleItemTextChange = () => {
    const newValue = ItemContent.current.value;
    if(selectedText.content !== newValue){
     file.headers[selectedText.titleIndex] = newValue
    }
    setSelectedText({indexItem : null , indexRow : null , titleIndex : null , content : ""})
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
  return <>
    {/* <Modal ref={colRowsEditingModal} rowIndex={selectedText.row} /> */}
    <table className={classes.table}>
      <thead>
        <tr>
          <th>N°</th>
          {file.headers.length > 1
            ? file.headers.map((value, i) => (
                <th key={i} onDoubleClick={() => handleDoubleClickTitle(i)} onClick={()=>setSelectedText((prev)=>({...prev,col : i}))}>
                  {
                ( selectedText.titleIndex === i) ?
                      <input ref={ItemContent} onBlur={handleTitleItemTextChange} style={{outline : "none" , border : "none" , padding : "0.6rem"}} type="text" name="content" defaultValue={selectedText.content} /> 
                 :
                  value
                }
                </th>
              ))
            : <th onDoubleClick={() => handleDoubleClickTitle(0)}>
                    {
                (selectedText.titleIndex === 0) ?
                      <input ref={ItemContent} onBlur={handleTitleItemTextChange} style={{outline : "none" , border : "none" , padding : "0.6rem"}} type="text" name="content" defaultValue={selectedText.content} /> 
                 :
                  "Change header"
                }
                  </th>}              
        </tr>
      </thead>
      <tbody>
      {file.rows.map((item, j) => (
        <tr key={j} >
          <td>{j + 1}</td>
          {item.length > 1 ? (
            item.map((value, i) => (
              <td key={i} onDoubleClick={(e) => handleDoubleClickItem(e,j, i)}>
                {
                (selectedText.indexRow === j && selectedText.indexItem === i) ?
                      <input ref={ItemContent} onBlur={()=>handleRowItemTextChange("duplex")} style={{outline : "none" , border : "none" , padding : "0.6rem"}} type="text" name="content" defaultValue={selectedText.content} /> 
                 :
                  value
                }
              </td>
            ))
          ) : (
            <td key={j} onDoubleClick={() => handleDoubleClickItem(j,null)}>
              {
                (selectedText.indexRow === j) ?
                      <input ref={ItemContent} onBlur={()=>handleRowItemTextChange("only one index")} style={{outline : "none" , border : "none" , padding : "0.6rem"}} type="text" name="content" defaultValue={selectedText.content} /> 
                 :
                  item
                }
            </td>
          )}
        </tr>
      ))}
      </tbody>
    </table>
  </>
};

export default Table;
