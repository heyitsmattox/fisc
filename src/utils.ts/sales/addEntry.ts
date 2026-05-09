import React from "react";
import { supabase } from "../../lib/supabaseClient";
import type { SalesEntry, FormData } from "../../types/salesTypes";


const addEntry = async (
  e: React.FormEvent,
  formData: FormData,
  setAddInventory: React.Dispatch<React.SetStateAction<SalesEntry[]>>,
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
