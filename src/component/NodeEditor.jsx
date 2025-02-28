import React from "react";
import Node from "./Node";

function NodeEditor() {
    // 샘플 노드 데이터
    const nodes = [
        {
            id: 1,
            title: "Reddit Fetch",
            nodeType: "SOURCE",
            config: [
                { label: "API Endpoint", value: "/web_design" },
                { label: "Fetch Limit", value: "300" },
                { label: "Filter", value: "chrome" },
            ],
            top: 50,
            left: 100,
            selected: false,
        },
        {
            id: 2,
            title: "Timer",
            nodeType: "DECISION",
            config: [{ label: "Interval", value: "60 (sec)" }],
            top: 200,
            left: 280,
            selected: true,
        },
        {
            id: 3,
            title: "API Post",
            nodeType: "ACTION",
            config: [{ label: "Endpoint", value: "/post_data" }],
            top: 100,
            left: 500,
            selected: false,
        },
    ];

    return (
        <div className="node-editor">
            <div className="editor-content">
                {nodes.map((node) => (
                    <Node
                        key={node.id}
                        title={node.title}
                        nodeType={node.nodeType}
                        config={node.config}
                        top={node.top}
                        left={node.left}
                        selected={node.selected}
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
