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
  //config is our "smart" default in case we reuse this component. By leaving the config prop undefined or not passed, it'll plug in our data from FieldConfig above. If we need different fields we can pass config={otherFieldName}
  config = inventoryFields,
  onSubmit,
  //Telling typescript to only accept an object that has exactly what is defined in the DynamicInventoryFormProps interface.
}: DynamicInventoryFormProps): JSX.Element {
  const [formData, setFormData] = useState(() => {
    //using a callback function inside useState to pre-fill our data.

  // Initialize state using the names from our config
    const initialState: Record<string, string | number> = {};

//Record is used here b/c we don't know the key value pairs. 
//Using record allows us to define the "shape" w/o knowing the names.
//  A "Record" is a single entry that groups related data points.
// In TypeScript, Record<K, V> says: "I want a record where every Key (K) is a certain type and every Value (V) is a certain type."
 
    config.forEach((f) => initialState[f.formName] = f.defaultValue ?? "");
    return initialState;
       //looping through our inventoryFields and creates an object that should 
    //populate data like so --> { dateOfPurchase: "", productName: "", costPerItem: 0, ... } 
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
