function BarContainer({
  value,
  isComparing = false,
  isSorted = false,
  isFound = false,
  isNotFound = false,
}) {
  const classNames = [
    "sorting-bar",
    isComparing ? "is-comparing" : "",
    isSorted ? "is-sorted" : "",
    isFound ? "is-found" : "",
    isNotFound ? "is-not-found" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="bar-container">
      <div className={classNames} style={{ height: `${value * 1.5}px` }} />
      <div className="number-label">{value}</div>
    </div>
  );
}

export default BarContainer;
