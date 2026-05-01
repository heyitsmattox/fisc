import { supabase } from "../lib/supabaseClient";

const deleteEntry = async (id: string) => {
  const response = await supabase
  .from('inventory')
  .delete()
  .eq('id', id)
}