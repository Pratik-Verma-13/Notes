import { useState, useEffect, useCallback } from 'react'
import './App.css';
import Header from './header.jsx';
import SideBar from './sidebar.jsx';
import Note from "./notes.jsx";
import Folder from "./folders.jsx";
import Home from "./home.jsx"

function App() {
  // const [notes, setNotes] = useState([
  //   {
  //     id: 1,
  //     title: "My-first-note",
  //     body: "this is my first note description",
  //     folder: "default",
  //     tag: [],
  //   },
  //   {
  //     id: 2,
  //     title: "My-second-note",
  //     body: "this is my second note description",
  //     folder: "homework",
  //     tag: [],
  //   },
  //   {
  //     id: 3,
  //     title: "My-third-note",
  //     body: "this is my third note description",
  //     folder: "study",
  //     tag: [],
  //   },
  //   {
  //     id: 4,
  //     title: "My-fourth-note",
  //     body: "this is my fourth note description",
  //     folder: "homework",
  //     tag: [],
  //   }
  // ]);

  // localStorage.setItem("notes", notes);

  const firstFetch = localStorage.getItem("notes");
  const [notes, setNotes] = useState(JSON.parse(firstFetch));

  const [folders, setFolders] = useState(
    [
      {
        name: "default",
        id: 1,
      },
      {
        name: "homework",
        id: 2,
      },
      {
        name: "study",
        id: 3
      }
    ]
  );
  const [activeSideBar, setActiveSideBar] = useState(true);


  const handleClickSideBar = useCallback(() => {
    setActiveSideBar(!activeSideBar);
  }, [activeSideBar]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("folders", JSON.stringify(folders));
  }, [folders]);


  const [noteId, setNoteId] = useState(1);
  const [noteToRender, setNoteToRender] = useState(null);
  const handleNoteRendering = useCallback((id) => {
    setNoteId(id);
    const selectedNote = notes.find(note => note.id === id);
    setNoteToRender(selectedNote || null);
    setToRender("Note");
  }, [notes]);
  
  const [renderedFolder, setRenderedFolder] = useState("default");
  // const [renderedFolderNotes, setRenderedFolderNotes] = useState(notes.filter(note=>note.folder==renderedFolder));
  const handleFolderRender = (folder) => {
    setRenderedFolder(folder);
  }

  const [toRender, setToRender] = useState("Home");

  const renderContent = () => {
    switch(toRender){
      case "Home":
        return <Home folders={folders} setToRender={setToRender} setRenderedFolder={setRenderedFolder}/>
      case "Note":
        return(
          <Note
            key={noteId}
            note={noteToRender}
            handleDelete={handleDelete}
            handleSave={handleSave}
          />
        )
      case "Folder":
        return(
          <Folder
            folderName = {renderedFolder}
            folderNotes = {notes.filter(note=>note.folder==renderedFolder)}
            setToRender={setToRender}
            setNoteToRender={setNoteToRender}
          />
        )
    }
  }

  const handleCreateNote = () => {
    const newNote = {
        id: notes.length > 0 ? Math.max(...notes.map(note => note.id)) + 1 : 1,
        title: "Untitled",
        body: "",
        folder: "default",
        tag: [],
    };
    setNotes(prevNotes => [...prevNotes, newNote]);
    setToRender("Note");
    setNoteToRender(newNote);
  };

  const handleSave = (noteId, heading, body) => {
      setNotes(prevnotes => {
        const updatedNotes = prevnotes.map(note=>{
          
          return note.id === noteId? {...note, title:heading, body:body}:note;
        })
        return updatedNotes;
      }
      )
      localStorage.setItem("notes", JSON.stringify(notes));
      alert("Note has been saved");
  }

  const handleDelete = (idOfNote) => {
    const noteToDelete = notes.find(note => note.id === idOfNote);
    const folderToRender = noteToDelete.folder;      
    setNotes(prevNotes => prevNotes.filter(note => note.id !== idOfNote));
    setToRender("Folder");
    setRenderedFolder(folderToRender);
}

  return (
    <>
      <Header handleClickSideBar={handleClickSideBar} handleCreateNote={handleCreateNote} />
      <div className="sidebar-note-block">
        {activeSideBar && (
          <SideBar 
            folders={folders} 
            handleNoteRendering={handleNoteRendering}
            notes={notes}
            handleFolderRender={handleFolderRender}
            setToRender={setToRender}
            // key={lastSaveTime}
          />
        )}
        {renderContent()}
      </div>
    </>
  )
}

export default App;
