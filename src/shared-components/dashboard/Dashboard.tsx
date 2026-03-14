import Navbar from "../layout/Navbar";
import { PerformanceCard } from "./cards/PerformanceCard";
import { useInventoryData } from "../../hooks/useInventoryData";
import { MetricCard } from "./cards/MetricCard";
import { RoiCard } from "./cards/RoiCard";

export const Dashboard = () => {
  const {
    totalProfit,
    totalPaid,
    numberOfSales,
    profit,
    roi,
    isLoading,
    isError,
  } = useInventoryData();

  if (isLoading) return <div className="p-8 text-white">Loading Stats...</div>;
  if (isError)
    return <div className="p-8 text-rose-500">Error loading dashboard.</div>;

return (
    <>
      <Navbar showNavbarMenuIcon={true} showFiscImageLogo={false} />
      <div className="p-8 min-h-screen mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className=" mx-auto flex flex-col gap-10"></div>
        
        {/* Main horizontal container */}
        <div className="flex w-full gap-6">
          <PerformanceCard totalProfit={totalProfit} totalPaid={totalPaid} />
          
          {/* Middle Column: Only Sales and Profit */}
          <div className="flex flex-col gap-4">
            <MetricCard
              metricString={"Number of Sales"}
              metric={numberOfSales}
              backgroundVariant="default"
            />
            <MetricCard
              metricString={"Profit"}
              metric={profit}
              backgroundVariant="default"
              textColorVariant="emerald"
            />
          </div> {/* <--- We moved this closing tag up! */}

          {/* Right Column: ROI Card is now its own column */}
          <RoiCard roi={roi} />
        </div>

      </div>
    </>
  );
};

export default Dashboard;
