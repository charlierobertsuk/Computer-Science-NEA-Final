function StatsDisplay({ comparisons, swaps, containerId }) {
  return (
    <div className="stats-container" id={`stats-container-${containerId}`}>
      <div className="stats-item">
        <h4>Comparisons</h4>
        <p id={`comparisons-${containerId}`}>{comparisons}</p>{" "}
      </div>
      <div className="stats-item">
        <h4>Swaps</h4>
        <p id={`swaps-${containerId}`}>{swaps}</p>{" "}
      </div>
    </div>
  );
}

export default StatsDisplay; // exports the StatsDisplay component so it can bee used in other parts of the app
