import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <h1>Very Awesome Algorithm Visualiser</h1>
      <p>
        The best place to learn algorithms for computer science and maths
        students
      </p>
      <div className="sections">
        <div className="section-card">
          <h2>Visualise It</h2>
          <p>Learn sorting and searching algorithms through visual aid.</p>
          <Link to="/visualiser">Go to Visualiser</Link>
        </div>
        <div className="section-card">
          <h2>Learn It</h2>
          <p>Learn and revise the theory behind each algorithm.</p>
          <Link to="/learn">Go to Learn</Link>
        </div>
        <div className="section-card">
          <h2>About Me</h2>
          <p>Who built this app and why is it here?</p>
          <Link to="/about">Go to About</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
