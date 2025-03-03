import React, {useState} from "react";
import NodeEditor from "./component/NodeEditor.jsx";
import Sidebar from "./component/Sidebar.jsx";
import "./App.css"; // 다크 테마 & 노드 스타일
import "./component/Sidebar.css";

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
        setNodes((prev) =>
            prev.map((node) =>
                node.id === id
                    ? { ...node, selected: true }
                    : { ...node, selected: false }
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

    return (
        <div className="app-container">
            <Sidebar
                onAddNode={addNode}
                onSaveJSON={saveNodesToJSON}
            />
            <NodeEditor
                nodes={nodes}
                onSelectNode={selectSingleNode}
            />
        </div>
    );
}
export default App;
