import { supabase } from "../lib/supabaseClient"
import type { Database } from "../lib/database.types";
import { useQuery } from "@tanstack/react-query";

type InventoryEntry = Database["public"]["Tables"]["inventory"]["Row"];

const Card = () => {

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

// let totalProfit = inventoryData.reduce((acc, entry) => {
//   return acc + (entry.profit ?? 0)
// }, 0)

  return (
    <>
      <div>
        {inventoryData?.map((entry) => (
          <div key={entry.id}>
            <h3>{entry.product_name}</h3>
            <p>Profit: {entry.profit}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;