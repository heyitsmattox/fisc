import { useState } from "react";
import type { FieldConfig } from "../shared-components/inventory/InventoryForm";


export function useInventoryForm(config: FieldConfig[] ) {
  const [formData, setFormData] = useState(() => {
    const initialState: Record<string, string | number> = {};
    config.forEach((f) => (initialState[formData.formName] = f.defaultValue ?? ""));
    return initialState;
  });
  return { formData, setFormData};
}