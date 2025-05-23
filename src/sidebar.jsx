import "./sidebar.css";
import {useState} from "react";

function SideBar({folders, handleNoteRendering, notes, handleFolderRender, setToRender}){

    const [folderClicked, setFolderClicked] = useState("");
    const handleActiveFolder = (folderName) => {
        if (folderName == folderClicked){
            setFolderClicked("")
        }
        else{
            setFolderClicked(folderName)
        }
        handleFolderRender(folderName);
        setToRender("Folder")
    }

    return(
        <div className="sidebar">
        <div className="home-navigation" onClick={()=>setToRender("Home")}>
            Home
        </div>
        <ul className="folder-list">
            {
                folders.map((folder)=>{
                    const filteredNotes = notes.filter(note => note.folder == folder.name)
                    return(
                        <>
                            <li onClick={()=>handleActiveFolder(folder.name)} >{folder.name}</li>
                                <ul>
                                    {
                                        filteredNotes.map((note)=>{
                                            return(
                                                <li
                                                    onClick={() => handleNoteRendering(note.id)}
                                                    className={[
                                                        "sidebar-note",
                                                        folderClicked == folder.name ? "show" : "hide"
                                                    ].join(" ")
                                                }
                                                key={note.id}
                                                >
                                                    {note.title}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                        </>
                    )
                })
            } 
        </ul>
        </div>
    )
}

export default SideBar;