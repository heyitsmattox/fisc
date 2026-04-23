// import Home from "./pages/Home";
import Dashboard from "./shared-components/dashboard/Dashboard";
import Inventory from "./shared-components/inventory/Inventory";
import Portfolio from "./shared-components/portfolio/Portfolio";
import Settings from "./pages/Settings";
import { AuthForm } from "./shared-components/auth/AuthForm";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "./hooks/useAuth";
import Reports from "./pages/Reports";

const ProtectedRoute = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const App = () => {
  const queryClient = new QueryClient();
  const { user } = useAuth();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/login" element={<AuthForm mode="login" />} />
          <Route path="/signup" element={<AuthForm mode="signup" />} />

          <Route element={<ProtectedRoute isAuthenticated={!!user} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/reports" element={<Reports />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </>
  );
};

export default App;
