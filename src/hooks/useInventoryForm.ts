import { useState } from "react";
import type { FieldConfig } from "../shared-components/inventory/InventoryForm";
import type { Database } from "../lib/database.types";
type InventoryEntry = Database["public"]["Tables"]["inventory"]["Row"];

export function useInventoryForm(config: FieldConfig[]) {
  const [addInventory, setAddInventory] = useState<InventoryEntry[]>([]);
  const [inventoryData, setInventoryData] = useState<InventoryEntry[]>([]);
  const [loading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(() => {
    const initialState: Record<string, string | number> = {};
    config.forEach((f) => (initialState[f.formName] = f.defaultValue ?? ""));
    return initialState;
  });
  return {
    formData,
    setFormData,
    addInventory,
    setAddInventory,
    loading,
    setIsLoading,
    inventoryData,
    setInventoryData,
  };
}
