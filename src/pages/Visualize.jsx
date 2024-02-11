import {useContext } from 'react';
import FileContext from "../store/FileContext.js"
import Table from "../components/Table"
import classes from "../styles/visualize.module.css"
import { BsDownload } from "react-icons/bs";

function Visualize() {
  const {file} = useContext(FileContext)
  return <>
  <div className="">
    <h4 className={classes.title}>File : {file.name}  <BsDownload size={20} style={{cursor : "pointer"}}/> </h4>
   
  </div>
    <div className={classes.visualize_table}>
       <Table />
    </div>
    </>
}

export default Visualize