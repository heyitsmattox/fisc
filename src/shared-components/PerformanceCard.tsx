import { supabase } from "../lib/supabaseClient"
import type { Database } from "../lib/database.types";
import { useQuery } from "@tanstack/react-query";

type InventoryEntry = Database["public"]["Tables"]["inventory"]["Row"];

interface PerformanceCardProps {
  totalProfit?: number;
  totalPaid?: number;
}

const PerformanceCard = () => {

  const { data: inventoryData, error: fetchError, isLoading } = useQuery<InventoryEntry[]>({
    queryKey: ["inventoryData"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("inventory")
        .select();
      if (error) throw error;
      return data || [];
    },
  });

  if(isLoading) return <div>Loading...</div>;
  if(fetchError) return <div>Error fetching data: {fetchError.message}</div>;


//math logic

const totalProfit: number = inventoryData?.reduce((acc, entry) => {
  return acc + (entry.profit ?? 0)
}, 0) ?? 0

const formatTotalProfit: string = totalProfit.toLocaleString("en-US", {
  style: "currency",
  currency: "USD",
});

const totalPaid: number = inventoryData?.reduce((acc, entry) => {
  return acc + (entry.total_cost ?? 0)
}, 0) ?? 0

const formatTotalPaid: string = totalPaid.toLocaleString("en-US", {
  style: "currency",
  currency: "USD",
});





  return (
   /* Card is 1/4 width (25%) of its parent container */
    <div className="w-1/4 bg-[#1E2329] border border-slate-700/50 rounded-xl p-6 shadow-2xl flex flex-col gap-6">
      
      {/* Title Header */}
      <h2 className="text-[13px] uppercase font-black text-white-400 tracking-[0.2em]">
        Performance
      </h2>

      <div className="flex flex-col">
        {/* Section 1: Profit (Total Value) */}
        <div className="border-b border-slate-700/50 pb-6 mb-6">
          <div className="text-4xl font-bold text-emerald-400 tracking-tight">
            {formatTotalProfit ? formatTotalProfit : "$0.00"}
          </div>
          <div className="text-sky-300 text-xs font-bold uppercase mt-2 tracking-wide">
             Profit
          </div>
        </div>

        {/* Section 2: Total Paid */}
        <div>
          <div className="text-4xl font-bold text-zinc-50 tracking-tight">
            {formatTotalPaid ? formatTotalPaid : "$0.00"}
          </div>
          <div className="text-sky-300 text-xs font-bold uppercase mt-2 tracking-wide">
            Total Paid
          </div>
        </div>
      </div>
   </div>
    
  );
};

export default PerformanceCard;