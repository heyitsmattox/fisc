import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import App from "../src/App";
import "../src/index.css";

const root = document.getElementById('root');
if(!root) {
  throw new Error('Failed to find the root element');
}

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>,
);
