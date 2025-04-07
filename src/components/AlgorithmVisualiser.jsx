import { useState, useEffect } from "react";
import BarContainer from "./BarContainer";
import StatsDisplay from "./StatsDisplay";

function AlgorithmVisualiser({
  id,
  algorithm,
  array,
  setArray,
  isRunning,
  onFinish,
  algorithmType,
  searchTarget,
  isLearningMode = false,
}) {
  const [bars, setBars] = useState([...array]);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const animationSpeed = isLearningMode ? 500 : 100;
  const [barStates, setBarStates] = useState(
    array.map(() => ({
      isComparing: false,
      isSorted: false,
      isFound: false,
      isNotFound: false,
    }))
  );

  const wait = () =>
    new Promise((resolve) => setTimeout(resolve, animationSpeed));

  const swap = async (arr, i, j) => {
    setSwaps((prev) => prev + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setBars([...arr]);
    await wait();
  };

  const bubbleSort = async () => {
    let arr = [...bars];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setBarStates((prev) => {
          const newStates = [...prev];
          newStates[j] = { ...newStates[j], isComparing: true };
          newStates[j + 1] = { ...newStates[j + 1], isComparing: true };
          return newStates;
        });
        await wait();
        setComparisons((prev) => prev + 1);
        if (arr[j] > arr[j + 1]) {
          await swap(arr, j, j + 1);
        }
        setBarStates((prev) => {
          const newStates = [...prev];
          newStates[j] = { ...newStates[j], isComparing: false };
          newStates[j + 1] = { ...newStates[j + 1], isComparing: false };
          return newStates;
        });
      }
      setBarStates((prev) => {
        const newStates = [...prev];
        newStates[arr.length - i - 1] = { isComparing: false, isSorted: true };
        return newStates;
      });
      await wait();
    }
    setBars(arr);
    if (!isLearningMode) setArray(arr);
    onFinish();
  };

  const mergeSort = async () => {
    let arr = [...bars];
    await mergeSortHelper(arr, 0, arr.length - 1);
    setBars(arr);
    if (!isLearningMode) setArray(arr);
    onFinish();
  };

  const mergeSortHelper = async (arr, left, right) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await mergeSortHelper(arr, left, mid);
      await mergeSortHelper(arr, mid + 1, right);
      await merge(arr, left, mid, right);
    }
  };

  const merge = async (arr, left, mid, right) => {
    let leftArr = arr.slice(left, mid + 1);
    let rightArr = arr.slice(mid + 1, right + 1);
    let i = 0,
      j = 0,
      k = left;

    while (i < leftArr.length && j < rightArr.length) {
      setBarStates((prev) => {
        const newStates = [...prev];
        newStates[k] = { ...newStates[k], isComparing: true };
        return newStates;
      });
      await wait();
      setComparisons((prev) => prev + 1);

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      setBars([...arr]);
      setBarStates((prev) => {
        const newStates = [...prev];
        newStates[k] = { isComparing: false, isSorted: true };
        return newStates;
      });
      await wait();
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      setBars([...arr]);
      setBarStates((prev) => {
        const newStates = [...prev];
        newStates[k] = { isComparing: false, isSorted: true };
        return newStates;
      });
      await wait();
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      setBars([...arr]);
      setBarStates((prev) => {
        const newStates = [...prev];
        newStates[k] = { isComparing: false, isSorted: true };
        return newStates;
      });
      await wait();
      j++;
      k++;
    }
  };

  const quickSort = async () => {
    let arr = [...bars];
    await quickSortHelper(arr, 0, arr.length - 1);
    setBars(arr);
    if (!isLearningMode) setArray(arr);
    onFinish();
  };

  const quickSortHelper = async (arr, low, high) => {
    if (low < high) {
      const pivotIndex = await partition(arr, low, high);
      await quickSortHelper(arr, low, pivotIndex - 1);
      await quickSortHelper(arr, pivotIndex + 1, high);
    }
  };

  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      setBarStates((prev) => {
        const newStates = [...prev];
        newStates[j] = { ...newStates[j], isComparing: true };
        newStates[high] = { ...newStates[high], isComparing: true };
        return newStates;
      });
      await wait();
      setComparisons((prev) => prev + 1);

      if (arr[j] <= pivot) {
        i++;
        await swap(arr, i, j);
      }
      setBarStates((prev) => {
        const newStates = [...prev];
        newStates[j] = { ...newStates[j], isComparing: false };
        newStates[high] = { ...newStates[high], isComparing: false };
        return newStates;
      });
    }

    await swap(arr, i + 1, high);
    setBarStates((prev) => {
      const newStates = [...prev];
      newStates[i + 1] = { isComparing: false, isSorted: true };
      return newStates;
    });
    await wait();

    return i + 1;
  };

  const linearSearch = async () => {
    let arr = [...bars];
    for (let i = 0; i < arr.length; i++) {
      setBarStates((prev) => {
        const newStates = [...prev];
        newStates[i] = { ...newStates[i], isComparing: true };
        return newStates;
      });
      await wait();
      setComparisons((prev) => prev + 1);
      if (arr[i] === searchTarget) {
        setBarStates((prev) => {
          const newStates = [...prev];
          newStates[i] = { isComparing: false, isFound: true };
          return newStates;
        });
        onFinish();
        return;
      }
      setBarStates((prev) => {
        const newStates = [...prev];
        newStates[i] = { isComparing: false, isNotFound: true };
        return newStates;
      });
    }
    onFinish();
  };

  const binarySearch = async () => {
    let arr = [...bars].sort((a, b) => a - b);
    setBars(arr);
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      setBarStates((prev) => {
        const newStates = [...prev];
        newStates[mid] = { ...newStates[mid], isComparing: true };
        return newStates;
      });
      await wait();
      setComparisons((prev) => prev + 1);

      if (arr[mid] === searchTarget) {
        setBarStates((prev) => {
          const newStates = [...prev];
          newStates[mid] = { isComparing: false, isFound: true };
          return newStates;
        });
        if (!isLearningMode) setArray(arr);
        onFinish();
        return;
      } else if (arr[mid] < searchTarget) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
      setBarStates((prev) => {
        const newStates = [...prev];
        newStates[mid] = { isComparing: false, isNotFound: true };
        return newStates;
      });
      await wait();
    }
    if (!isLearningMode) setArray(arr);
    onFinish();
  };

  const exponentialSearch = async () => {
    let arr = [...bars].sort((a, b) => a - b);
    setBars(arr);

    if (arr[0] === searchTarget) {
      setBarStates((prev) => {
        const newStates = [...prev];
        newStates[0] = { isComparing: false, isFound: true };
        return newStates;
      });
      if (!isLearningMode) setArray(arr);
      onFinish();
      return;
    }

    let i = 1;
    while (i < arr.length && arr[i] <= searchTarget) {
      setBarStates((prev) => {
        const newStates = [...prev];
        newStates[i] = { ...newStates[i], isComparing: true };
        return newStates;
      });
      await wait();
      setComparisons((prev) => prev + 1);
      setBarStates((prev) => {
        const newStates = [...prev];
        newStates[i] = { isComparing: false, isNotFound: true };
        return newStates;
      });
      i *= 2;
    }

    let left = i / 2;
    let right = Math.min(i, arr.length - 1);
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      setBarStates((prev) => {
        const newStates = [...prev];
        newStates[mid] = { ...newStates[mid], isComparing: true };
        return newStates;
      });
      await wait();
      setComparisons((prev) => prev + 1);

      if (arr[mid] === searchTarget) {
        setBarStates((prev) => {
          const newStates = [...prev];
          newStates[mid] = { isComparing: false, isFound: true };
          return newStates;
        });
        if (!isLearningMode) setArray(arr);
        onFinish();
        return;
      } else if (arr[mid] < searchTarget) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
      setBarStates((prev) => {
        const newStates = [...prev];
        newStates[mid] = { isComparing: false, isNotFound: true };
        return newStates;
      });
      await wait();
    }
    if (!isLearningMode) setArray(arr);
    onFinish();
  };

  useEffect(() => {
    if (isRunning) {
      setComparisons(0);
      setSwaps(0);
      if (algorithmType === "sorting") {
        switch (algorithm) {
          case "bubble":
            bubbleSort();
            break;
          case "merge":
            mergeSort();
            break;
          case "quick":
            quickSort();
            break;
          default:
            break;
        }
      } else {
        switch (algorithm) {
          case "linear":
            linearSearch();
            break;
          case "binary":
            binarySearch();
            break;
          case "exponential":
            exponentialSearch();
            break;
          default:
            break;
        }
      }
    }
  }, [isRunning]);

  useEffect(() => {
    setBars([...array]);
    setBarStates(
      array.map(() => ({
        isComparing: false,
        isSorted: false,
        isFound: false,
        isNotFound: false,
      }))
    );
  }, [array]);

  return (
    <div className="visualiser-container">
      <h3>
        {algorithm === "bubble"
          ? "Bubble Sort"
          : algorithm === "merge"
          ? "Merge Sort"
          : algorithm === "quick"
          ? "Quick Sort"
          : algorithm === "linear"
          ? "Linear Search"
          : algorithm === "binary"
          ? "Binary Search"
          : "Exponential Search"}
      </h3>
      <div className="sorting-container">
        <div className="bars-container">
          {bars.map((value, index) => (
            <BarContainer
              key={index}
              value={value}
              isComparing={barStates[index]?.isComparing}
              isSorted={barStates[index]?.isSorted}
              isFound={barStates[index]?.isFound}
              isNotFound={barStates[index]?.isNotFound}
            />
          ))}
        </div>
      </div>
      <StatsDisplay comparisons={comparisons} swaps={swaps} containerId={id} />
    </div>
  );
}

export default AlgorithmVisualiser;
