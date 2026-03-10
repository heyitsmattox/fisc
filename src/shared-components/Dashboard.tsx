import Navbar from "./Navbar";
import { PerformanceCard } from "./PerformanceCard";
import { useInventoryData } from "../hooks/useInventoryData";


export const Dashboard = () => {
  const { totalProfit, totalPaid, isLoading, isError } = useInventoryData();

  if (isLoading) return <div className="p-8 text-white">Loading Stats...</div>;
  if (isError) return <div className="p-8 text-rose-500">Error loading dashboard.</div>;

  return (
    <>
    <Navbar showNavbarMenuIcon={true} showFiscImageLogo={false} />
    <div className="p-8 min-h-screen]">
   <div className="max-w-7xl mx-auto flex flex-col gap-10"></div>
    <div className="flex w-full gap-6">
     <PerformanceCard totalProfit={totalProfit} totalPaid={totalPaid} />
    </div>
    </div>
    
    </>
  );
};

export default Dashboard;
