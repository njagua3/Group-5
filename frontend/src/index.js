import React from "react"; // Importing React library
import ReactDOM from "react-dom/client"; // Importing the ReactDOM library for rendering
import "./index.css"; // Importing the global CSS styles for the application
import App from "./App"; // Importing the main App component

// Creating a root reference for rendering the React application
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering the application inside the root element
root.render(
  <React.StrictMode>
    {/* Enables additional checks and warnings for development */}
    <App /> {/* Rendering the App component */}
  </React.StrictMode>
);
