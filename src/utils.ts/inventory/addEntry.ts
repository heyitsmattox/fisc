import React from "react";
import { supabase } from "../../lib/supabaseClient";


const addEntry = async (e: React.FormEvent, initialState: Record<string, string | number> = {}) => {

  const {data, error } = await supabase
  .from("inventory")
  .insert([])
  .select()
};

export default addEntry;