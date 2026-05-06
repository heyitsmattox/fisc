import type { Database } from "../../lib/database.types";
import type { FieldConfig } from "./InventoryForm";
type InventoryEntry = Database["public"]["Tables"]["inventory"]["Row"];
import { supabase } from "../../lib/supabaseClient";

const saveEdit = async (
  entry: InventoryEntry,
  field: FieldConfig,
  editingValue: string,
  editingCell: {id: string; field: string } | null,
  setInventoryData: React.Dispatch<React.SetStateAction<InventoryEntry[]>>,
  setEditingCell: React.Dispatch<React.SetStateAction<{id: string; field: string } | null>>
) => {
if (!editingCell) return;

    // Convert the typed string into the right type for this field
    const parsedValue =
      field.type === "number" // checking if field is a number
        ? field.formName === "quantity" // check if it's specifically the quantity field
          ? parseInt(editingValue) || 0 // if so, parse as a whole number e.g 5
          : parseFloat(editingValue) || 0 // otherwise, parse like a decimal number. e.g $12.99
        : editingValue; // else just use the data type of string

    // Build a copy of the row with the new value applied. e.g parsedValue
    const updatedEntry: InventoryEntry = {
      ...entry,
      [field.formName]: parsedValue,
    };

    // If the user edited a field that feeds into our calculations,
    // recompute the derived fields the same way handleChange does.
    if (
      ["cost_per_item", "quantity", "sold_price", "shipping_cost"].includes(
        field.formName,
      )
    ) {
      const costPer =
        field.formName === "cost_per_item"
          ? parseFloat(editingValue) || 0
          : parseFloat(String(entry.cost_per_item)) || 0;
      const qty =
        field.formName === "quantity"
          ? parseInt(editingValue) || 0
          : parseInt(String(entry.quantity)) || 0;
      const listPrice =
        field.formName === "sold_price"
          ? parseFloat(editingValue) || 0
          : parseFloat(String(entry.sold_price)) || 0;
      const shipping =
        field.formName === "shipping_cost"
          ? parseFloat(editingValue) || 0
          : parseFloat(String(entry.shipping_cost)) || 0;

      updatedEntry.total_cost = Number((costPer * qty).toFixed(2));
      updatedEntry.total_price_sold = Number((listPrice * qty).toFixed(2));
      updatedEntry.profit = Number(
        (
          updatedEntry.total_price_sold -
          updatedEntry.total_cost -
          shipping
        ).toFixed(2),
      );
    }

    // Persist to the database
    const { error } = await supabase
      .from("inventory")
      .update(updatedEntry)
      .eq("id", entry.id);

    if (error) {
      console.error("Failed to update entry:", error.message);
      setEditingCell(null);
      return;
    }

    // update our local list so the user sees the change right away
    setInventoryData((prev) =>
      prev.map((item) => (item.id === entry.id ? updatedEntry : item)),
    );

    setEditingCell(null);
  };

export default saveEdit;
