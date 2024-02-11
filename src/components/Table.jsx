import {useContext } from 'react';
import FileContext from "../store/FileContext.js"
import classes from "../styles/table.module.css"
const Table = () => {
    const {file} = useContext(FileContext)

    const handleDoubleClickTitle = (index) => {
        console.log(index,file.headers[index])
    }
    const handleDoubleClickRow = (index) => {
        console.log(index,file.rows[index])
    }
    const handleDoubleClickItem = (indexRow,indexItem) => {
        console.log(indexRow,indexItem,file.rows[indexRow][indexItem])
    }
    return <table className={classes.table}>
    <thead>
      <tr>
        {file.headers.length > 1  ? file.headers.map((value,i)=>(
        <th key={i}  onDoubleClick={()=>handleDoubleClickTitle(i)}>{value}</th>
        )) :  Array(file.headers.map((_,i)=>(
          <th key={i} onDoubleClick={()=>handleDoubleClickTitle(i)}>Header</th>
        )))}
      </tr>
    </thead>
    <tbody>
    </tbody>
        {file.rows.map((item,j)=>(
           <tr key={j} onDoubleClick={()=>handleDoubleClickRow(j)}>
            {item.length > 1 ? item.map((value,i)=>(
            <td key={i} onDoubleClick={()=>handleDoubleClickItem(j,i)} >{value}</td>
            )) : 
            <td key={j} onDoubleClick={()=>handleDoubleClickItem(j,i)}>{item}</td>}
         </tr>
        ))}
    </table>
}

export default Table;
