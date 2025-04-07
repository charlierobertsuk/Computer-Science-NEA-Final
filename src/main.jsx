import React from "react"; // imports the React library
import ReactDOM from "react-dom/client"; // imports the ReactDOM library for rendering
import App from "./App"; // imports the App component

ReactDOM.createRoot(document.getElementById("root")).render(
  // creates a root and renders the application
  <React.StrictMode>
    {/* enables strict mode for highlighting any potential issues */}
    <App />
  </React.StrictMode>
);
