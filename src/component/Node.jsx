import React from "react";
// Node 자체는 별도의 CSS 파일 없이 NodeEditor.css를 사용한다면 import 불필요
// import "./Node.css"; // 필요하면 별도의 CSS 모듈/파일로 분리 가능

function Node({ title, nodeType, config, top, left, selected }) {
    const style = {
        top: `${top}px`,
        left: `${left}px`,
        position: "absolute",
    };

    return (
        <div className={`node ${selected ? "selected" : ""}`} style={style}>
            <div className="node-header">{title}</div>
            <div className="node-type">{nodeType}</div>
            <div className="node-config">
                {config.map((item, idx) => (
                    <div key={idx}>
                        <strong>{item.label}:</strong> {item.value}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Node;
