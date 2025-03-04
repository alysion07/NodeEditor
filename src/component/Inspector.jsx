import React from "react";
import "./Inspector.css";

/**
 * Inspector: 선택된 Node의 속성 편집 컴포넌트
 */
function Inspector({ selectedNode, onUpdateNode }) {
    if (!selectedNode) {
        return (
            <div className="inspector">
                <h2>Inspector</h2>
                <p>No node selected</p>
            </div>
        );
    }

    // 폼 입력 핸들러 (예시: 노드 타이틀 변경)
    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        // 부모(App)에 "속성 변경" 알림
        onUpdateNode(selectedNode.id, { title: newTitle });
    };

    // config 속성도 수정 예시
    const handleLimitChange = (e) => {
        const newLimit = parseInt(e.target.value, 10) || 0;
        onUpdateNode(selectedNode.id, {
            config: {
                ...selectedNode.config,
                limit: newLimit,
            },
        });
    };

    return (
        <div className="inspector">
            <h2>Inspector</h2>
            <label>
                Title:
                <input
                    type="text"
                    value={selectedNode.title}
                    onChange={handleTitleChange}
                />
            </label>

            {/* 노드 타입 등 다른 속성도 표시 가능 */}
            <p>
                <strong>Node Type:</strong> {selectedNode.nodeType}
            </p>

            {/* config.limit 속성 예시 */}
            {selectedNode.config && selectedNode.config.hasOwnProperty("limit") && (
                <label>
                    Limit:
                    <input
                        type="number"
                        value={selectedNode.config.limit}
                        onChange={handleLimitChange}
                    />
                </label>
            )}

            {/* 추가로 interval, endpoint 등도 동일한 방식으로 처리 */}
        </div>
    );
}

export default Inspector;
