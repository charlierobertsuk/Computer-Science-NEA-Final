import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Visualiser from "./components/Visualiser";
import Learn from "./components/Learn";
import About from "./components/About";
import "./styles.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navigation">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/visualiser">Visualiser</Link>
            </li>
            <li>
              <Link to="/learn">Learn</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          {" "}
          {/* Define the routes for the application which is essentialy fake pages */}
          <Route path="/" element={<Home />} />
          <Route path="/visualiser" element={<Visualiser />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" />} />{" "}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
