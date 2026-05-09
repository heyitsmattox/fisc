import { useState } from "react";
import type { FieldConfig } from "../shared-components/sales/SalesForm";
import type { Database } from "../lib/database.types";
type InventoryEntry = Database["public"]["Tables"]["inventory"]["Row"];

export function useSalesForm(config: FieldConfig[]) {
  const [addSale, setAddSale] = useState<InventoryEntry[]>([]);
  const [saleData, setSaleData] = useState<InventoryEntry[]>([]);
  const [loading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(() => {
    const initialState: Record<string, string | number> = {};
    config.forEach((f) => (initialState[f.formName] = f.defaultValue ?? ""));
    return initialState;
  });
  return {
    formData,
    setFormData,
    addSale,
    setAddSale,
    loading,
    setIsLoading,
    saleData,
    setSaleData,
  };
}
