import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";
import type { Database } from "../lib/database.types";

type InventoryEntry = Database["public"]["Tables"]["inventory"]["Row"];

export const useInventoryData = () => {
  const query = useQuery<InventoryEntry[]>({
    queryKey: ["inventoryData"],
    queryFn: async () => {
      const { data, error } = await supabase.from("inventory").select();
      if (error) throw error;
      return data || [];
    },
  });


  const inventory = query.data || [];

  const totalProfit = inventory.reduce((acc, entry) => acc + (entry.profit ?? 0), 0);
  const totalPaid = inventory.reduce((acc, entry) => acc + (entry.total_cost ?? 0), 0);

  const numberOfSales = inventory.length + 1;
  const profit = totalProfit - totalPaid;
  const roi = totalPaid > 0 ? (profit / totalPaid) * 100 : 0;

  // Return everything for UI
  return {
    ...query,
    inventory,
    totalProfit,
    totalPaid,
    numberOfSales,
    profit,
    roi,
  };
};
// !!! notes !!!

// Our Reports page, we can use the same useInventoryData() hook 
// and get the exact same numbers instantly.