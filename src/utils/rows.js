export function addRow(file, position) {
    console.log(position);
    const newElements = "New";
    const newRow = Array(file.headers.length).fill(newElements);
    
    if (position === "start") {
        //console.log([newRow, ...file.rows]); // Adding new row at the start
        return [newRow, ...file.rows];
    } else {
        //console.log([...file.rows, newRow]); // Adding new row at the end
        return [...file.rows, newRow];
    }
}