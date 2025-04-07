function ControlPanel({
  generateArray,
  setAlgorithm1,
  setAlgorithm2,
  algorithm1,
  isComparing,
  startSorting,
  finished1,
  finished2,
}) {
  const algorithms = [
    { value: "bubble", text: "Bubble Sort" },
    { value: "merge", text: "Merge Sort" },
    { value: "quick", text: "Quick Sort" },
  ];

  return (
    <div className="tab tab-control-panel">
      <div className="control-panel">
        <div className="controls">
          <button
            className="btn btn-array-size"
            onClick={() => generateArray(8)}
          >
            Small - 8
          </button>
          <button
            className="btn btn-array-size"
            onClick={() => generateArray(16)}
          >
            Medium - 16
          </button>
          <button
            className="btn btn-array-size"
            onClick={() => generateArray(32)}
          >
            Large - 32
          </button>
          <div className="speed-buttons">
            <button className="btn" id="step-by-step">
              Step by Step - No Function
            </button>
            <button className="btn selected" id="skip">
              Skip - No Function
            </button>
          </div>
          <div className="algorithm-selectors">
            <div className="selector-container">
              <h4>Algorithm 1</h4>
              <select
                className="input-field algorithm-select"
                value={algorithm1}
                onChange={(e) => setAlgorithm1(e.target.value)}
              >
                {algorithms.map((algo) => (
                  <option key={algo.value} value={algo.value}>
                    {algo.text}
                  </option>
                ))}
              </select>
            </div>
            {isComparing && (
              <div
                className="selector-container"
                id="algorithm-select-2-container"
              >
                <h4>Algorithm 2</h4>
                <select
                  className="input-field algorithm-select"
                  onChange={(e) => setAlgorithm2(e.target.value)}
                  defaultValue={algorithm2}
                >
                  {algorithms
                    .filter((algo) => algo.value !== algorithm1)
                    .map((algo) => (
                      <option key={algo.value} value={algo.value}>
                        {algo.text}
                      </option>
                    ))}
                </select>
              </div>
            )}
          </div>
          <button
            className="btn"
            id="start-sort"
            onClick={startSorting}
            disabled={finished1 && (!isComparing || finished2)}
          >
            Start Sorting
          </button>
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
