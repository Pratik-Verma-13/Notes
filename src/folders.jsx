import "./folders.css"

function Folder({folderName, folderNotes, setToRender, setNoteToRender}){
    return(
        <div className="folder-section">
            <div className="folder-heading">
                <h1>{folderName}</h1>
            </div>
            <div className = "notes-grid">
                { 
                    folderNotes.map((note)=>{
                        return(
                            <div className="grid-item" onClick={()=>{
                                setToRender("Note");
                                setNoteToRender(note);
                            }}>
                                {note.title}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Folder;