import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useSalesData } from "../../../hooks/useSalesData";


const ProfitAndLostChart = ({ isAnimationActive = true }) => {
  const { inventory } = useSalesData();



  const chartData = Object.values(
  inventory.reduce((acc, entry) => {
    //create our unique key based on the data string.
    const dateKey = entry.purchase_date
      ? new Date(entry.purchase_date).toLocaleDateString()
      : "No Date";
    //check if we have seen the date before. If not, initalize it.
    if (!acc[dateKey]) {
      acc[dateKey] = {
        name: dateKey,
        profit: 0,
        products: [], // Store all product names for this day
      };
    }
    // add entry profit to the total profit
    acc[dateKey].profit += entry.profit || 0;
    return acc;
  }, {} as Record<string, { name: string; profit: number; products: string[] }>)
)

  .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());

  const dummyData = [
    { name: "Jan 1", profit: 0 },
    { name: "May 2", profit: 0 },
    { name: "Dec 3", profit: 0 },
  ]

  // Determine which dataset to use before rendering
const finalData = chartData.length > 0 ? chartData : dummyData;

return (
  <AreaChart
    data={finalData}
    style={{ width: "100%", maxWidth: "700px", aspectRatio: 1.618 }}
    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
  >
    <defs>
      <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#7dd3fc" stopOpacity={0.3} />
        <stop offset="95%" stopColor="#7dd3fc" stopOpacity={0} />
      </linearGradient>
    </defs>

    <CartesianGrid
      strokeDasharray="3 3"
      vertical={false}
      stroke="#334155"
      opacity={0.2}
    />
    
    <XAxis
      dataKey="name"
      axisLine={false}
      tickLine={false}
      tick={{ fill: "#94a3b8", fontSize: 12 }}
      dy={10}
    />
    
    <YAxis 
      axisLine={false} 
      tickLine={false} 
      tick={{ fill: '#94a3b8', fontSize: 12 }} 
    />

    {/* Only show the tooltip if there is actual data */}
    {chartData.length > 0 && (
      <Tooltip
        contentStyle={{
          backgroundColor: "#1E2329",
          border: "1px solid #334155",
          borderRadius: "8px",
          fontSize: "12px",
        }}
        itemStyle={{ color: "#7dd3fc" }}
      />
    )}

    <Area
      type="monotone"
      dataKey="profit"
      stroke="#7dd3fc"
      strokeWidth={2}
      fillOpacity={1}
      fill="url(#colorProfit)"
      // Disable animation for dummy data to make it feel more like a "placeholder"
      isAnimationActive={chartData.length > 0} 
    />
  </AreaChart>
);
};

export default ProfitAndLostChart;
