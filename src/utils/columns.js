export function addColumnAt(index,file,position) {
    //index : position of our element
    //fileHeaders : our columns
    // position : befoer or after
    //console.log(index,file,position)
    const newElement = "NEW Title"
    let last_index = parseInt(index);
    if (position === 'after') {
        last_index++;
    }
    
    // Inserting the new element at the specified index
    file.headers.splice(last_index, 0, newElement);

    // Iterating over each row in the content array
    for (let i = 0; i < file.rows.length; i++) {
        // Inserting the appropriate value at the corresponding index in each row
        file.rows[i].splice(last_index, 0, 'New Item');
    }

    //console.log(file)
    return file
}