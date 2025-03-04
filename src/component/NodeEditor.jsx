import Node from "./Node";

function NodeEditor({nodes, onSelectNode}) {

    return (
        <div className="node-editor">
            <div className="editor-content">
                {nodes.map((node) => (
                    <Node
                        key={node.id}
                        {...node}                // id, title, nodeType, top, left, selected
                        onSelect={onSelectNode}  // 클릭 시 특정 id를 상위에 알려줌
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
