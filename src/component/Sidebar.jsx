// import React, {useRef } from "react";


function Sidebar({onAddNode, onSaveJSON, onLoadJSON }) {
    // const fileInputRef = useRef(null);
    //
    // const handleFileChange = (e) => {
    //
    // };

    return (
        <div className="sidebar">
            <div className="sidebar-icon" onClick={ onAddNode }> Add Node</div>
            <div className="sidebar-icon">🛠 SaveJSON </div>
            <div className="sidebar-icon">⚙️</div>
            <div className="sidebar-icon">🔌</div>
        </div>
    );
}

export default Sidebar