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
//blueprint where every every line in our array represents our a single input
export const inventoryFields: FieldConfig[] = [
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
  config = inventoryFields,
  onSubmit,
}: DynamicInventoryFormProps): JSX.Element {
  // Initialize state using the names from our config
  const [formData, setFormData] = useState(() => {
    //using a callback function inside useState to pre-fill our data.
    const initialState: Record<string, string | number> = {};
    //looping through our inventoryFields and creates an object that should 
    //populate data like so --> { dateOfPurchase: "", productName: "", costPerItem: 0, ... } 
    config.forEach((f) => initialState[f.formName] = f.defaultValue ?? "");
    return initialState;
  });
//handle all the change logic for every input field
  const handleChange = (name: string, value: string | number) => {
    //Taking all the current form data and keeping it exactly as it is.
    setFormData((prev) => ({ ...prev, [name]: value }));
    //Find the specific key that matches the name of the input I just typed in, and update only that one value.
  };
return (
  <form className="grid grid-cols-2 gap-4">
    {config.map((field) => (
      <div key={field.formName} className="flex flex-col">
        <label>{field.formLabel}</label>
        <input
          type={field.type}
          value={formData[field.formName] ?? ""}
          onChange={(e) => handleChange(field.formName, e.target.value)}
          className="border p-2 text-slate-950"
        />
      </div>
    ))}
    <button type="submit">Submit</button>
  </form>
);
}
export default InventoryForm;
