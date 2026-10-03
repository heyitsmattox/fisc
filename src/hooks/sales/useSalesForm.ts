import { useState } from "react";
import type { FieldConfig } from "../shared-components/sales/SalesForm";
import type { SalesEntry, FormData } from "../types/salesTypes";

export function useSalesForm(config: FieldConfig[]) {
  const [addSale, setAddSale] = useState<SalesEntry[]>([]);
  const [saleData, setSaleData] = useState<SalesEntry[]>([]);
  const [loading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(() => {
    const initialState: FormData= {};
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
