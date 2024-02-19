export function addRow(file, position) {
    //console.log(position);
    const newElements = "New";

    //creating an array with the convenient length.
    const newRow = Array(file.headers.length).fill(newElements);
    
    if (position === "start") {
        //console.log([newRow, ...file.rows]); // Adding new row at the start
        return [newRow, ...file.rows];
    } else {
        //console.log([...file.rows, newRow]); // Adding new row at the end
        return [...file.rows, newRow];
    }
}
export function deleteRow(file,index){
    const parsedIndex = parseInt(index)
    //console.log(index)
    //console.log(file.rows[parsedIndex])
    file.rows.splice(parsedIndex,1)
    return file;
}