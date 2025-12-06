import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "../src/App";

import "../src/index.css";

// 2. Find the root element in index.html
const rootElement = document.getElementById('root');

if (rootElement) {
  // 3. Create a React root and render the App component
  ReactDOM.createRoot(rootElement).render(
    // StrictMode helps identify potential problems in an application.
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
    // Optional: Log an error if the root element isn't found
    console.error('Root element with ID "root" not found in the DOM.');
}
