import { useState, useEffect } from "react"; // imports hooks for state and side effects
// useState manages state in functional components (variables that change over time)
// useEffect manages side effects in functional components (DOM manipulation)
import AlgorithmVisualiser from "./AlgorithmVisualiser";

function Visualiser() {
  const [algorithm1, setAlgorithm1] = useState("bubble");
  const [algorithm2, setAlgorithm2] = useState("merge");
  const [array, setArray] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [finishedCount, setFinishedCount] = useState(0);
  const [algorithmType, setAlgorithmType] = useState("sorting");
  const [searchTarget, setSearchTarget] = useState("");
  const [prevWidth, setPrevWidth] = useState(window.innerWidth);

  const generateArray = (size) => {
    const newArray = Array.from(
      { length: size },
      () => Math.floor(Math.random() * 99) + 1
    );
    setArray(newArray);
    setIsRunning(false);
    setFinishedCount(0);
  };

  useEffect(() => {
    generateArray(window.innerWidth <= 480 ? 8 : 16);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;

      if (!isRunning) {
        if (prevWidth > 800 && currentWidth <= 800) {
          generateArray(8);
        } else if (prevWidth <= 800 && currentWidth > 800) {
          generateArray(16);
        }
      }

      setPrevWidth(currentWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [prevWidth, isRunning]);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      setFinishedCount(0);
    }
  };

  const handleFinish = () => {
    setFinishedCount((prev) => prev + 1);
    if (
      (!isComparing && finishedCount + 1 === 1) ||
      (isComparing && finishedCount + 1 === 2)
    ) {
      setIsRunning(false);
    }
  };

  const sortingAlgorithms = [
    { value: "bubble", text: "Bubble Sort" },
    { value: "merge", text: "Merge Sort" },
    { value: "quick", text: "Quick Sort" },
  ];

  const searchingAlgorithms = [
    { value: "linear", text: "Linear Search" },
    { value: "binary", text: "Binary Search" },
    { value: "exponential", text: "Exponential Search" },
  ];

  const algorithms =
    algorithmType === "sorting" ? sortingAlgorithms : searchingAlgorithms;

  return (
    <div className="visualiser">
      <div className="controls">
        <select
          value={algorithmType}
          onChange={(e) => {
            setAlgorithmType(e.target.value);
            setAlgorithm1(e.target.value === "sorting" ? "bubble" : "linear");
            setAlgorithm2(e.target.value === "sorting" ? "merge" : "binary");
          }}
          disabled={isRunning}
        >
          <option value="sorting">Sorting</option>
          <option value="searching">Searching</option>
        </select>
        <select
          value={algorithm1}
          onChange={(e) => setAlgorithm1(e.target.value)}
          disabled={isRunning}
        >
          {algorithms.map((algo) => (
            <option key={algo.value} value={algo.value}>
              {algo.text}
            </option>
          ))}
        </select>
        {isComparing && (
          <select
            value={algorithm2}
            onChange={(e) => setAlgorithm2(e.target.value)}
            disabled={isRunning}
          >
            {algorithms
              .filter((algo) => algo.value !== algorithm1)
              .map((algo) => (
                <option key={algo.value} value={algo.value}>
                  {algo.text}
                </option>
              ))}
          </select>
        )}
        {algorithmType === "searching" && (
          <input
            type="number"
            value={searchTarget}
            onChange={(e) => setSearchTarget(e.target.value)}
            placeholder="Enter search target (1-99)"
            min="1"
            max="99"
            disabled={isRunning}
          />
        )}
        <button
          onClick={() => generateArray(16)}
          disabled={isRunning && finishedCount < (isComparing ? 2 : 1)}
        >
          Generate New Array
        </button>
        <button
          onClick={handleStart}
          disabled={
            isRunning || (algorithmType === "searching" && !searchTarget)
          }
        >
          {algorithmType === "sorting" ? "Start Sorting" : "Start Searching"}
        </button>
        <button
          onClick={() => setIsComparing(!isComparing)}
          disabled={isRunning}
        >
          {isComparing ? "Hide Comparison" : "Compare"}
        </button>
      </div>
      <div className={`visualiser-split ${isComparing ? "dual" : ""}`}>
        <AlgorithmVisualiser
          id={1}
          algorithm={algorithm1}
          array={array}
          setArray={setArray}
          isRunning={isRunning}
          onFinish={handleFinish}
          algorithmType={algorithmType}
          searchTarget={parseInt(searchTarget) || null}
        />
        {isComparing && (
          <AlgorithmVisualiser
            id={2}
            algorithm={algorithm2}
            array={array}
            setArray={setArray}
            isRunning={isRunning}
            onFinish={handleFinish}
            algorithmType={algorithmType}
            searchTarget={parseInt(searchTarget) || null}
          />
        )}
      </div>
    </div>
  );
}

export default Visualiser;
