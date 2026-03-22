import Navbar from "../layout/Navbar";
import { PerformanceCard } from "./cards/PerformanceCard";
import { useInventoryData } from "../../hooks/useInventoryData";
import { MetricCard } from "./cards/MetricCard";
import { RoiCard } from "./cards/RoiCard";
import ProfitAndLostChart from "./charts/ProfitAndLostChart";

export const Dashboard = () => {
  const {
    totalProfit,
    totalPaid,
    numberOfSales,
    profit,
    roi,
    isLoading,
    isError,
    projectedAnnualROI,
  } = useInventoryData();

  if (isLoading) return <div className="p-8 text-white">Loading Stats...</div>;
  if (isError)
    return <div className="p-8 text-rose-500">Error loading dashboard.</div>;

return (
<>
      <Navbar showNavbarMenuIcon={true} showFiscImageLogo={false} />
      <div className="p-8 min-h-screen mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className=" mx-auto flex flex-col gap-10"></div>
        
        {/* Main horizontal container - Switched to md:items-stretch */}
        <div className="flex flex-col md:flex-row w-full gap-6 justify-center items-center md:items-stretch">
          
          {/* Column 1: Performance */}
          <div className="flex w-full md:w-auto">
            <PerformanceCard totalProfit={totalProfit} totalPaid={totalPaid} />
          </div>
          
          {/* Column 2: Middle Stats */}
          <div className="flex flex-col gap-4 w-full md:w-auto">
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
          </div> 

          {/* Column 3: Right Side Metrics */}
          <div className="flex flex-col gap-4 w-full md:w-auto">
            <RoiCard roi={roi} />
             <MetricCard
              isCompact={true}
              metricString={"Avg Profit per Sale"}
              metric={numberOfSales > 1 ? profit / (numberOfSales - 1) : profit} 
              backgroundVariant="default"
              textColorVariant="default"
            />
              <MetricCard
              isCompact={true}
              metricString={"Projected Annual ROI"}
              metric={`${projectedAnnualROI}%`}
              backgroundVariant="default"
              textColorVariant="default"
            />
          </div>
        </div>
      </div>
      <ProfitAndLostChart 
        isAnimationActive={true}
      />
    </>
  );
};

export default Dashboard;
