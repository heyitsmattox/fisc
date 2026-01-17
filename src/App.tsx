import Home from "./pages/Home";
import Dashboard from "./shared-components/Dashboard";
import Inventory from "./shared-components/Inventory";
import Portfolio from "./shared-components/Portfolio";
import Settings from "./pages/Settings";
import { Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
};

export default App;
