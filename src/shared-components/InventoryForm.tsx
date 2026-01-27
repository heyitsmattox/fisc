import { useState, type JSX } from "react";

interface FieldConfig {
  formName: string; // The key in our data (e.g., "costPerItem")
  formLabel: string; // The text the user sees (e.g., "Cost Per Item")
  type: "text" | "number" | "date";
  defaultValue?: string | number;
}

interface DynamicInventoryFormProps {
  config: FieldConfig[];
  onSubmit: (data: Record<string, unknown>) => void;
}

const inventoryFields: FieldConfig[] = [
  { formName: "dateOfPurchase", formLabel: "Purchase Date",   type: "date",   defaultValue: "" },
  { formName: "productName",    formLabel: "Product Name",    type: "text",   defaultValue: "" },
  { formName: "costPerItem",    formLabel: "Cost Per Item",   type: "number", defaultValue: 0  },
  { formName: "productQty",     formLabel: "Product Qty",     type: "number", defaultValue: 0  },
  { formName: "totalCost",      formLabel: "Total Cost",      type: "number", defaultValue: 0  },
  { formName: "soldListPrice",  formLabel: "Sold List Price", type: "number", defaultValue: 0  },
  { formName: "totalPriceSold", formLabel: "Total Price Sold",type: "number", defaultValue: 0  },
  { formName: "shippingCost",   formLabel: "Shipping Cost",   type: "number", defaultValue: 0  },
  { formName: "profit",         formLabel: "Profit",          type: "number", defaultValue: 0  },
];

export function InventoryForm({
  config,
  onSubmit,
}: DynamicInventoryFormProps): JSX.Element {
  // Initialize state using the names from our config
  const [formData, setFormData] = useState(() => {
    const initialState: Record<string, unknown> = {};
    config.forEach((f) => (initialState[f.formName] = f.defaultValue));
    return initialState;
  });

  const handleChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <h1>InventoryForm</h1>
    </>
  );
}
export default InventoryForm;
