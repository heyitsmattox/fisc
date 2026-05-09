import React from "react";
import { supabase } from "../../lib/supabaseClient";
import type { Database } from "../../lib/database.types";
type InventoryEntry = Database["public"]["Tables"]["inventory"]["Row"];

const addEntry = async (
  e: React.FormEvent,
  formData: Record<string, string | number>,
  setAddInventory: React.Dispatch<React.SetStateAction<InventoryEntry[]>>,
) => {
  e.preventDefault();
  const { data, error } = await supabase
    .from("inventory")
    .insert([formData])
    .select();

  if (error) {
    console.error("Failed to save to database:", error.message);
    return;
  }
  if (data && data.length > 0) {
    const officialEntry = data[0];
    setAddInventory((prev) => [...prev, officialEntry]);
  }
};

export default addEntry;
