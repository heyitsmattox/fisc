import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";
import type { Database } from "../lib/database.types";

type InventoryEntry = Database["public"]["Tables"]["inventory"]["Row"];

export const useSalesData = () => {
  const query = useQuery<InventoryEntry[]>({
    queryKey: ["inventoryData"],
    queryFn: async () => {
      const { data, error } = await supabase.from("inventory")
      .select()
      .order('purchase_date', { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });

//loop through each entry and store each profit value for each entry
// loop 

  const inventory = query.data || [];


const individualProfits = inventory.map(entry => entry.profit ?? 0);  
const individualCosts = inventory.map(entry => entry.total_cost ?? 0);  

const productName = inventory.map(entry => entry.product_name ?? "Unknown Product");

  const totalProfit = inventory.reduce((acc, entry) => acc + (entry.profit ?? 0), 0);

  
  const totalPaid = inventory.reduce((acc, entry) => acc + (entry.total_cost ?? 0), 0);

  const numberOfSales = inventory.length;
  const profit = totalProfit;
  const roi = totalPaid > 0 ? (profit / totalPaid) * 100 : 0;


  //firstEntryDate === our first ever entry date. i.e if our first item added was march 1st, 2026. That would be our value)
  const firstEntryDate = inventory.length > 0 && inventory[0].purchase_date ? new Date(inventory[0].purchase_date) : null;


const today = new Date();
const diffInTime = firstEntryDate ? today.getTime() - firstEntryDate.getTime() : 0;
const daysActive = Math.max(1, Math.ceil(diffInTime / (1000 * 60 * 60 * 24)));

const dailyAverageProfit = (totalProfit / daysActive); // string

const estimatedAnnualProfit = Number(dailyAverageProfit) * 365;
const projectedAnnualROI = totalPaid > 0 
  ? ((estimatedAnnualProfit / totalPaid) * 100).toFixed(2) 
  : "0.00";

  // Return everything for U/
  return {
    ...query,
    inventory,
    totalProfit,
    totalPaid,
    numberOfSales,
    profit,
    roi,
    projectedAnnualROI,
    individualProfits,
    individualCosts,
    productName,
    dailyAverageProfit,
  };
};
// !!! notes !!!

// Our Reports page, we can use the same useInventoryData() hook 
// and get the exact same numbers instantly.
