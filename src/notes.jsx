import "./notes.css"
import{ useState, useCallback }from "react";
import { memo } from "react";


function Note({note, handleDelete, handleSave}){

    const [heading, setHeading] = useState(note?.title||"");
    const [body, setBody] = useState(note?.body||"");

    return(
        <div className="note-block">
                <div className="note-heading">
                    <input type="text" value={heading} onChange={(e)=>setHeading(e.target.value)}/>
                </div>
                <div className="note-description">
                    <input type="textarea" value={body} onChange={(e)=>setBody(e.target.value)}/>
                </div>
                <button className="edit-button" onClick={()=>handleSave(note.id, heading, body)}>
                    Save
                </button>
                <button className="delete-button" onClick={()=>handleDelete(note.id)}>
                    Delete
                </button>
        </div>
    )
}

export default memo(Note);