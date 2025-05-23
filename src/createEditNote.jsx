import { useState } from "react";
import "./createEditNote.css";
// import "./notes.css";

function CreateEditNote({note}){
    const [heading, setHeading] = useState(note?.title||"");
    const [body, setBody] = useState(note?.body||"");

    const handleSave = (noteId) => {
        const notes = localStorage.getItem("notes");
        const processedNotes = JSON.parse(notes);
        const noteIndex = processedNotes.findIndex(noteObject => noteObject.id == noteId);
        processedNotes[noteIndex].title = heading;
        processedNotes[noteIndex].body = body;
        localStorage.setItem("notes", JSON.stringify(processedNotes));
    }

    return(
            <div className="note-block">
                
                <button className="save-button" onClick={()=>handleSave(note.id)}>
                    Save
                </button>
            </div>
    )
}

export default CreateEditNote;