import React, {useState} from "react";
// Node 자체는 별도의 CSS 파일 없이 NodeEditor.css를 사용한다면 import 불필요
// import "./Node.css"; // 필요하면 별도의 CSS 모듈/파일로 분리 가능

function Node({ id, title, nodeType, config, top, left, selected, onSelect }) {
    const [diffPos, setDiffPos] = useState( {x: left, y: top});
    const style = {
        id: id,
        top: `${diffPos.y}px`,
        left: `${diffPos.x}px`,
        position: "absolute",

    };

    const handleClick = () => {
        console.log("clicked on node", id);
        if(onSelect){
            onSelect(id);
        }
    };

    return (
        <div className={`node ${selected ? "selected" : ""}`}
             style={style}
             onMouseDown={handleClick}
             onPointerDown={ (e) => {
                 const initX = e.clientX;
                 const initY = e.clientY;

                 const dragMove = (e) => {
                     const newDiffPos = {
                         x: diffPos.x + e.clientX - initX,
                         y: diffPos.y + e.clientY - initY
                     };
                     setDiffPos(newDiffPos);
                 };
                 const dragEnd = () => {
                     document.removeEventListener("pointermove", dragMove);
                 };

                 document.addEventListener("pointermove", dragMove);
                 document.addEventListener("pointerup", dragEnd, { once: true });
             }}
        >
            <div className="node-header">{title}</div>
            <div className="node-type">{nodeType}</div>
            <div className="node-id">{id}</div>
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
