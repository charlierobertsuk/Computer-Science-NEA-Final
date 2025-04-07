import { useState, useEffect } from "react"; // imports hooks for state and side effects
// useState manages state in functional components (variables that change over time)
// useEffect manages side effects in functional components (DOM manipulation)
import AlgorithmVisualiser from "./AlgorithmVisualiser"; // imports the AlgorithmVisualiser component
import ControlPanel from "./ControlPanel"; // imports the ControlPanel component

function DualAlgorithmVisualiser() {
  const [array, setArray] = useState([]);
  const [originalArray, setOriginalArray] = useState([]);
  const [algorithm1, setAlgorithm1] = useState("bubble");
  const [algorithm2, setAlgorithm2] = useState("merge");
  const [isComparing, setIsComparing] = useState(false);
  const [finished1, setFinished1] = useState(false);
  const [finished2, setFinished2] = useState(false);

  const generateArray = (size) => {
    const uniqueValues = new Set();
    while (uniqueValues.size < size) {
      uniqueValues.add(Math.floor(Math.random() * 99) + 1);
    }
    const newArray = Array.from(uniqueValues);
    setArray(newArray);
    setOriginalArray(newArray);
    setFinished1(false);
    setFinished2(false);
  };

  const handleFinish1 = () => setFinished1(true);
  const handleFinish2 = () => setFinished2(true);

  useEffect(() => {
    generateArray(16);
  }, []);

  return (
    <>
      <div className="tab tab-visualiser">
        <div className="visualiser-split">
          <AlgorithmVisualiser
            id={1}
            algorithm={algorithm1}
            array={array}
            setArray={setArray}
            onFinish={handleFinish1}
          />
          {isComparing && (
            <div
              className={`visualiser-container nested-visualiser ${
                isComparing ? "visible" : ""
              }`}
            >
              <AlgorithmVisualiser
                id={2}
                algorithm={algorithm2}
                array={array}
                setArray={setArray}
                onFinish={handleFinish2}
              />
            </div>
          )}
          <button
            className="btn compare-btn"
            onClick={() => setIsComparing(!isComparing)}
          >
            {isComparing ? "Hide Comparison" : "Compare"}
          </button>
        </div>
      </div>
      <ControlPanel
        generateArray={generateArray}
        setAlgorithm1={setAlgorithm1}
        setAlgorithm2={setAlgorithm2}
        algorithm1={algorithm1}
        isComparing={isComparing}
        startSorting={() => {
          document
            .getElementById("visualiser-1")
            .querySelector(".AlgorithmVisualiser")
            .startSorting();
          if (isComparing)
            document
              .getElementById("visualiser-2")
              .querySelector(".AlgorithmVisualiser")
              .startSorting();
        }}
        finished1={finished1}
        finished2={finished2}
      />
    </>
  );
}

export default DualAlgorithmVisualiser;
