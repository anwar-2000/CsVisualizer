import {useContext, useRef } from 'react';
import FileContext from "../store/FileContext.js"
import Table from "../components/Table"
import classes from "../styles/visualize.module.css"
import { BsDownload } from "react-icons/bs";
import { TfiSave } from "react-icons/tfi";
import Papa from "papaparse"
import { IoIosAdd } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";
import VisualizeHeader from '../components/VisualizeHeader.jsx';


function Visualize() {
  return <>
    <VisualizeHeader />
    <div className={classes.visualize_table}>
       <Table />
    </div>
    </>
}

export default Visualize