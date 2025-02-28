import { useState } from 'react'
import './App.css'
import NodeEditor from "./component/NodeEditor.jsx";

function App() {

  return (
    <>
        <div className ="app-container">
            <div className = "side-bar">
                <div className={"logo"}>🗂</div>
                <div className={"logo"}>🛠</div>
                <div className={"logo"}>⚙️</div>
                <div className={"logo"}>🗂</div>
            </div>
        </div>
        <NodeEditor />
    </>
  );
}

export default App
