import Home from "./pages/Home";
import Dashboard from "./shared-components/dashboard/Dashboard";
import Inventory from "./shared-components/inventory/Inventory";
import Portfolio from "./shared-components/portfolio/Portfolio";
import Settings from "./pages/Settings";
import AuthForm from "./shared-components/auth/AuthForm";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Added the prop of mode. See AuthForm for details. */}
          <Route path="/login" element={<AuthForm mode="login"/>} />
          <Route path="/signup" element={<AuthForm mode="signup"/>} />
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
