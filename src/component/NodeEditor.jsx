import React from "react";
import Node from "./Node";

function NodeEditor({nodes, onSelectNode, onMoveNode}) {

    return (
        <div className="node-editor">
            <div className="editor-content">
                {nodes.map((node) => (
                    <Node
                        key={node.id}
                        {...node}
                        onSelect={onSelectNode}
                        onDrag={onMoveNode}   // ← 드래그 시 위치 변경
                    />
                ))}

                <div className="editor-toolbar">
                    <button title="Zoom In">+</button>
                    <button title="Zoom Out">-</button>
                    <button title="Fit to Screen">Fit</button>
                </div>
            </div>
        </div>
    );
}

export default NodeEditor;
