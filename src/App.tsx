import Home from "./pages/Home";
import Dashboard from "./shared-components/Dashboard";
import Inventory from "./shared-components/Inventory";
import Portfolio from "./shared-components/Portfolio";
import Settings from "./pages/Settings";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
};

export default App;
