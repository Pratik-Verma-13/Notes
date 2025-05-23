import "./home.css"

function Home({folders, setToRender, setRenderedFolder}){
    return(
        <div className="home-section" >
            <div className="home-heading">
                <h1>Welcome to the notes</h1>
            </div>
            <div className="folders-grid">
            {
                folders.map((folder)=>{
                    return(
                        <div className="folders-grid-item" key={folder.id} onClick={()=>{setToRender("Folder"); setRenderedFolder(folder.name)}}>
                            {folder.name}
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default Home;