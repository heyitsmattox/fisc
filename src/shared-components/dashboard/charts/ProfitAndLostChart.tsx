
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { useInventoryData } from "../../../hooks/useInventoryData";



 const ProfitAndLostChart = ({ isAnimationActive = true }) => {

   const {
  inventory,
  productName,
  } = useInventoryData();

  console.log('inventory', inventory);
  
const chartData = inventory.map((entry) => ({
  // The 'name' becomes the X-Axis label (the date)
  name: entry.purchase_date 
    ? new Date(entry.purchase_date).toLocaleDateString() 
    : 'No Date',

  // 'pv' maps to your Profit
  profit: entry.profit || 0,
    
  // 'uv' maps to your Cost
  cost: entry.total_cost || 0,
  
  productName: entry.product_name || "Unknown Product",

  // 'amt' is usually just a backup or tooltip value
  amt: entry.productName
  
}));

  return (
    <>
      <h2>Profit and Loss Over Time</h2>
<AreaChart
  data={chartData}
  style={{ width: '100%', maxWidth: '700px', aspectRatio: 1.618}} // Golden ratio aspect, no outline
  margin={{ top: 10, right: 10, left: -20, bottom: 0 }} // Negative left margin hides extra gap
>
  <defs>
    {/* This creates the glow effect: solid sky-300 at top, transparent at bottom */}
    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#7dd3fc" stopOpacity={0.3}/>
      <stop offset="95%" stopColor="#7dd3fc" stopOpacity={0}/>
    </linearGradient>
  </defs>

  {/* 1. Modern Grid: Horizontal only, very subtle, or removed entirely */}
  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />

  {/* 2. Clean Axes: Removed harsh lines, used slate-400 for text */}
  <XAxis 
    dataKey="name"
    axisLine={false} 
    tickLine={false} 
    tick={{ fill: '#94a3b8', fontSize: 12 }} 
    dy={10}
  />
  {/* <YAxis 
    axisLine={false} 
    tickLine={false} 
    tick={{ fill: '#94a3b8', fontSize: 12 }} 
  /> */}

  {/* 3. Custom Tooltip: Matches your card background [#1E2329] */}
  <Tooltip 
    contentStyle={{ 
      backgroundColor: '#1E2329', 
      border: '1px solid #334155', 
      borderRadius: '8px',
      fontSize: '12px', 
    }} 
    itemStyle={{ color: '#7dd3fc' }}
   
  />

  {/* 4. The Area: Sky-300 stroke with the gradient fill we defined above */}
  <Area
    type="monotone"
    dataKey="profit"
    stroke="#7dd3fc" 
    strokeWidth={2}
    fillOpacity={1}
    fill="url(#colorProfit)" 
  />
</AreaChart>

    </>
  )
}

export default ProfitAndLostChart;