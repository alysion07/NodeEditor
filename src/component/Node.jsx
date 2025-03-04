import React, { useState, useEffect, useCallback } from "react";

function Node({
                  id,
                  title,
                  nodeType,
                  top,
                  left,
                  config,
                  selected,
                  onSelect,
                  onDrag // 부모에서 넘어오는 "(id, newTop, newLeft)" 콜백
              }) {
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    // 1. 드래그 시작 (마우스 다운)
    const handleMouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onSelect) {
            onSelect(id);
        }
        setIsDragging(true);

        // 마우스 좌표 - Node의 현재 (left, top)
        setOffset({
            x: e.clientX - left,
            y: e.clientY - top,
        });
    };

    // 2. 드래그 중 (mousemove)
    const handleMouseMove = useCallback(
        (e) => {
            if (!isDragging) return;
            // 부모로부터 받은 onDrag 콜백 호출
            // => 부모가 (id)에 해당하는 노드의 (top, left)를 갱신
            const newLeft = e.clientX - offset.x;
            const newTop = e.clientY - offset.y;
            onDrag(id, newTop, newLeft);
        },
        [isDragging, offset, id, onDrag]
    );

    // 3. 드래그 끝 (mouseup)
    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    // mousemove, mouseup 이벤트를 window 레벨에서 감지
    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        } else {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        }

        // cleanup
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    const style = {
        position: "absolute",
        top: top,
        left: left,
    };

    return (
        <div
            className={`node ${selected ? "selected" : ""}`}
            style={style}
            onMouseDown={handleMouseDown}
        >
            <div className="node-header">{title}</div>
            <div className="node-type">{nodeType}</div>
            <div className="node-config">
                {config.map((item, idx) => (
                        <div key={idx}>
                           <strong> {item.label}:</strong> {item.value}
                        </div>
                ))}
            </div>
        </div>
    );
}

export default Node;
