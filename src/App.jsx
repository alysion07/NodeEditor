import React, {useState} from "react";
import NodeEditor from "./component/NodeEditor.jsx";
import Sidebar from "./component/Sidebar.jsx";
import Inspector from "./component/Inspector.jsx";
import "./App.css"; // 다크 테마 & 노드 스타일
import "./component/Sidebar.css";
import "./component/inspector.css";

function getRandomInteger(min, max) {
    // min 이상 max 이하의 랜덤 정수 반환
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {

// 샘플 노드 데이터
    const [nodes, setNodes] = useState( [
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
    ]);
    // 현재 선택된 노드의 id (null이면 선택된 노드 없음)
    const [selectedNodeId, setSelectedNodeId] = useState(2);
    const addNode = () => {
        console.log("clicked on addNode");
        // New node data
        const newNode = {
            id: Date.now(), // Unique ID
            title: "New Node",
            nodeType: "ACTION",
            config: [],
            top:getRandomInteger(0, 500),
            left:getRandomInteger(0, 900),
            selected: false,
        };
        setNodes((prev) => [...prev, newNode]);
    };

    // ─────────────────────────────────────────────────────────
    // 3) 노드 선택/업데이트 로직
    //    NodeEditor → onSelectNode → App 에서 상태 수정
    // ─────────────────────────────────────────────────────────
    const selectSingleNode = (id) => {
        setSelectedNodeId(id);
        setNodes((prev) =>
            prev.map((node) =>
                node.id === id
                    ? { ...node, selected: true }
                    : { ...node, selected: false }
            )
        );
    };
    // 노드 속성 업데이트
    const handleUpdateNode = (id, updatedProps) => {
        setNodes((prev) =>
            prev.map((node) =>
                node.id === id
                    ? { ...node, ...updatedProps }
                    : node
            )
        );
    };

    // (예시) 다중 선택을 원한다면 아래처럼 작성할 수도 있음
    // const toggleSelectNode = (id) => {
    //   setNodes((prev) =>
    //     prev.map((node) =>
    //       node.id === id
    //         ? { ...node, selected: !node.selected }
    //         : node
    //     )
    //   );
    // };

    // ─────────────────────────────────────────────────────────
    // 4) JSON 저장/불러오기
    // ─────────────────────────────────────────────────────────
    // (A) 저장(Export): nodes 배열 → JSON.stringify
    const saveNodesToJSON = () => {
        const jsonString = JSON.stringify(nodes, null, 2);
        // 간단히 콘솔 로그 + prompt로 확인 (실무에서는 FileSaver 등으로 파일 다운로드)
        console.log("Save JSON:", jsonString);
        alert("JSON이 콘솔에 출력되었습니다!");
    };

    // 노드 이동 (드래그 중)
    const handleMoveNode = (id, newTop, newLeft) => {
        setNodes((prev) =>
            prev.map((node) =>
                node.id === id
                    ? { ...node, top: newTop, left: newLeft }
                    : node
            )
        );
    };

    return (
        <div className="app-container">
            <Sidebar
                onAddNode={addNode}
                onSaveJSON={saveNodesToJSON}
            />
            <NodeEditor
                nodes={nodes}
                onSelectNode={selectSingleNode}
                onMoveNode={handleMoveNode}
            />
            <Inspector
                selectedNode={nodes.find((n) => n.id === selectedNodeId) || null}
                onUpdateNode={handleUpdateNode}
            />
        </div>
    );
}
export default App;
