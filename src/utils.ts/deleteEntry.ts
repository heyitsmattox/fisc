import React from "react";
import { supabase } from "../lib/supabaseClient";
import type { Database } from "../../src/lib/database.types";
type InventoryEntry = Database["public"]["Tables"]["inventory"]["Row"];



  const deleteEntry = async (entry: InventoryEntry, setter: React.Dispatch<React.SetStateAction<InventoryEntry[]>>) => {   
      const {error} = await supabase
      .from('inventory')
      .delete()
      .eq('id', entry.id)
      if(error) {
        console.error("Failed to delete from database:", error.message);
       return;
      } else {
        setter((prev) => prev.filter((item) => item.id !== entry.id))
      }
}
export default deleteEntry;