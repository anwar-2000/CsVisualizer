import {useContext } from 'react';
import FileContext from "../store/FileContext.js"
import Table from "../components/Table"
import classes from "../styles/visualize.module.css"
import { BsDownload } from "react-icons/bs";
import { TfiSave } from "react-icons/tfi";


function Visualize() {
  const {file} = useContext(FileContext)
  return <>
  <div className={classes.VisualizeHeader}>
    <h4 className={classes.title}>File : {file.name}  <BsDownload size={20} style={{cursor : "pointer"}}/> </h4>
    <TfiSave size={20} color="black" style={{cursor : "pointer"}} />
  </div>
    <div className={classes.visualize_table}>
       <Table />
    </div>
    </>
}

export default Visualize