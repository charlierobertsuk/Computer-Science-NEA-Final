import { useState, useEffect } from "react"; // imports the useState and useEffect hooks
// useState manages state in functional components (variables that change over time)
// useEffect manages side effects in functional components (DOM manipulation)
import AlgorithmVisualiser from "./AlgorithmVisualiser"; // imports the AlgorithmVisualiser component
import "../styles.css"; // imports the stylesheet for styling the component

function Learn() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble"); // state for the currently selected algorithm
  const [array, setArray] = useState([
    75, 26, 66, 45, 56, 61, 35, 9, 65, 38, 98, 69, 34, 87, 48, 81,
  ]); // state for the default array
  const [isRunning, setIsRunning] = useState(false);
  const [searchTarget] = useState(65);

  const handleStartSorting = () => {
    setIsRunning(true);
  };

  const handleFinish = () => {
    setIsRunning(false);
  };

  useEffect(() => {
    setArray([75, 26, 66, 45, 56, 61, 35, 9, 65, 38, 98, 69, 34, 87, 48, 81]); // resets the array to the default state
    setIsRunning(false);
  }, [selectedAlgorithm]);

  const algorithms = {
    bubble: {
      name: "Bubble Sort",
      explanation: (
        <>
          <p>
            Bubble Sort compares adjacent elements and swaps them if they are in
            the wrong order, "bubbling" larger values to the end (AQA/OCR).
          </p>
          <p>Simple but inefficient for large lists (Edexcel FM D1).</p>
        </>
      ),
      /*
      n-i-2 below is the maximum value of j in the inner loop.
      -i is there because after each pass of the outer loop, the last i elements are already in their correct sorted positions, so you don't need to check them again.
      -2 is there because when j is at its maximum value, j+1 will be the last element in the unsorted part, so you don't want to go beyond that.
      */
      pseudocode: `
SUB BubbleSort(A)
  n ← LENGTH(A)
  FOR i ← 0 TO n-1
    FOR j ← 0 TO n-i-2
      IF A[j] > A[j+1] THEN
        SWAP A[j], A[j+1]
      ENDIF
    ENDFOR
  ENDFOR
ENDSUB
      `,
      complexity:
        "Time Complexity: O(n²) worst/average, O(n) best. Space Complexity: O(1).",
      type: "sorting",
    },
    merge: {
      name: "Merge Sort",
      explanation: (
        <>
          <p>
            Merge Sort divides the array into halves, recursively sorts them,
            and merges them back (AQA/OCR).
          </p>
          <p>Stable and efficient large data (Edexcel FM D2).</p>
        </>
      ),
      pseudocode: `
SUB MergeSort(A, left, right)
  IF left < right THEN
    mid ← (left + right) DIV 2
    MergeSort(A, left, mid)
    MergeSort(A, mid+1, right)
    Merge(A, left, mid, right)
  ENDIF
ENDSUB

SUB Merge(A, left, mid, right)
  leftArr ← A[left..mid]
  rightArr ← A[mid+1..right]
  i ← 0, j ← 0, k ← left
  WHILE i < LENGTH(leftArr) AND j < LENGTH(rightArr)
    IF leftArr[i] ≤ rightArr[j] THEN
      A[k] ← leftArr[i]
      i ← i + 1
    ELSE
      A[k] ← rightArr[j]
      j ← j + 1
    ENDIF
    k ← k + 1
  ENDWHILE
  WHILE i < LENGTH(leftArr)
    A[k] ← leftArr[i]
    i ← i + 1, k ← k + 1
  ENDWHILE
  WHILE j < LENGTH(rightArr)
    A[k] ← rightArr[j]
    j ← j + 1, k ← k + 1
  ENDWHILE
ENDSUB
      `,
      complexity:
        "Time Complexity: O(n log n) all cases. Space Complexity: O(n).",
      type: "sorting",
    },
    quick: {
      name: "Quick Sort",
      explanation: (
        <>
          <p>
            Quick Sort picks a pivot, partitions the array, and recursively
            sorts sub-arrays (AQA/OCR).
          </p>
          <p>Efficient average case with last-element pivot (Edexcel FM D1).</p>
        </>
      ),
      pseudocode: `
SUB QuickSort(A, low, high)
  IF low < high THEN
    pivotIndex ← Partition(A, low, high)
    QuickSort(A, low, pivotIndex - 1)
    QuickSort(A, pivotIndex + 1, high)
  ENDIF
ENDSUB

SUB Partition(A, low, high)
  pivot ← A[high]
  i ← low - 1
  FOR j ← low TO high - 1
    IF A[j] ≤ pivot THEN
      i ← i + 1
      SWAP A[i], A[j]
    ENDIF
  ENDFOR
  SWAP A[i + 1], A[high]
  RETURN i + 1
ENDSUB
      `,
      complexity:
        "Time Complexity: O(n²) worst, O(n log n) average/best. Space Complexity: O(log n).",
      type: "sorting",
    },
    linear: {
      name: "Linear Search",
      explanation: (
        <>
          <p>
            Linear Search checks each element sequentially until the target is
            found or the list ends (AQA/OCR).
          </p>
          <p>Basic and works on unsorted data (Edexcel FM D1).</p>
        </>
      ),
      pseudocode: `
SUB LinearSearch(A, target)
  FOR i ← 0 TO LENGTH(A) - 1
    IF A[i] = target THEN
      RETURN i
    ENDIF
  ENDFOR
  RETURN -1
ENDSUB
      `,
      complexity:
        "Time Complexity: O(n) worst/average, O(1) best. Space Complexity: O(1).",
      type: "searching",
    },
    binary: {
      name: "Binary Search",
      explanation: (
        <>
          <p>
            Binary Search halves the search range repeatedly on a sorted array
            until the target is found (AQA/OCR).
          </p>
          <p>Efficient for large sorted datasets (Edexcel FM D1).</p>
        </>
      ),
      pseudocode: `
SUB BinarySearch(A, target, left, right)
  WHILE left ≤ right
    mid ← (left + right) DIV 2
    IF A[mid] = target THEN
      RETURN mid
    ELSE IF A[mid] < target THEN
      left ← mid + 1
    ELSE
      right ← mid - 1
    ENDIF
  ENDWHILE
  RETURN -1
ENDSUB
      `,
      complexity:
        "Time Complexity: O(log n) worst/average/best. Space Complexity: O(1). Requires sorted array.",
      type: "searching",
    },
    exponential: {
      name: "Exponential Search",
      explanation: (
        <>
          <p>
            Exponential Search finds a range by doubling bounds, then applies
            Binary Search (OCR extension).
          </p>
          <p>Optimises for large sorted arrays (Edexcel FM D2 optimisation).</p>
        </>
      ),
      pseudocode: `
SUB ExponentialSearch(A, target)
  IF A[0] = target THEN
    RETURN 0
  ENDIF
  i ← 1
  WHILE i < LENGTH(A) AND A[i] ≤ target
    i ← i * 2
  ENDWHILE
  RETURN BinarySearch(A, target, i/2, MIN(i, LENGTH(A)-1))
ENDSUB
      `,
      complexity:
        "Time Complexity: O(log n) worst/average/best. Space Complexity: O(1). Requires sorted array.",
      type: "searching",
    },
  };

  return (
    <div className="learn">
      <div className="sidebar">
        <h3>Algorithms</h3>
        <ul>
          {Object.keys(algorithms).map((algo) => (
            <li
              key={algo}
              onClick={() => setSelectedAlgorithm(algo)}
              className={selectedAlgorithm === algo ? "selected" : ""}
            >
              {algorithms[algo].name}
            </li>
          ))}
        </ul>
      </div>
      <div className="content">
        <h2>{algorithms[selectedAlgorithm].name}</h2>
        <div>{algorithms[selectedAlgorithm].explanation}</div>
        <h3>Pseudocode</h3>
        <pre>{algorithms[selectedAlgorithm].pseudocode}</pre>
        <h3>Complexity</h3>
        <p>{algorithms[selectedAlgorithm].complexity}</p>
        <h3>Visualisation</h3>
        <button onClick={handleStartSorting} disabled={isRunning}>
          Start{" "}
          {algorithms[selectedAlgorithm].type === "sorting"
            ? "Sorting"
            : "Searching"}
        </button>
        {algorithms[selectedAlgorithm].type === "searching" && (
          <p>Searching for: {searchTarget}</p>
        )}
        <AlgorithmVisualiser
          id={1}
          algorithm={selectedAlgorithm}
          array={array}
          setArray={setArray}
          isRunning={isRunning}
          onFinish={handleFinish}
          isLearningMode={true}
          algorithmType={algorithms[selectedAlgorithm].type}
          searchTarget={searchTarget}
        />
      </div>
    </div>
  );
}

export default Learn;
