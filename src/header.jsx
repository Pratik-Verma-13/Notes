import { useCallback } from 'react';
import "./header.css";
import sideBarIcon from "./assets/sidebar.png";

function Header({handleClickSideBar, handleCreateNote}) {

    return(
        <header className="header">
            <button className="sideBarIcon" onClick={handleClickSideBar}>
                <img src={sideBarIcon} alt="sidebar icon" />
            </button>
            <div className="headerTitle">Notes</div>
            <button className="createNote" onClick={()=>handleCreateNote()}>
                Create Note
            </button>
        </header>
    )
}

export default Header;