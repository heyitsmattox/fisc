import { useState, type JSX } from "react";

interface FieldConfig {
  formName: string; // The key in our data (e.g., "costPerItem")
  formLabel: string; // The text the user sees (e.g., "Cost Per Item")
  type: "text" | "number" | "date";
  defaultValue?: string | number;
  placeholder?: string;
}

interface DynamicInventoryFormProps {
  config: FieldConfig[];
  onSubmit: (data: Record<string, unknown>) => void;
}

interface InventoryEntry {
  [key: string]: string | number | undefined;
  id?: number;
  user_id?: string;
  created_at?: string;

  purchase_date: string;
  product_name: string;
  cost_per_item: number;
  quantity: number;
  total_cost: number;
  sold_price: number;
  total_price_sold: number;
  shipping_cost: number;
  profit: number;
}

//blueprint where every every line in our array represents our a single input
export const inventoryFields: FieldConfig[] = [
  { formName: "purchase_date", formLabel: "Date", type: "date", placeholder: "" },
  { formName: "product_name", formLabel: "Product Name", type: "text", placeholder: "Item Name" },
  { formName: "cost_per_item", formLabel: "Cost Per Item", type: "number", placeholder: "0.00" },
  { formName: "quantity", formLabel: "Qty", type: "number", placeholder: "0" },
  { formName: "total_cost", formLabel: "Total Cost", type: "number", placeholder: "0.00" },
  { formName: "sold_price", formLabel: "Sold Price", type: "number", placeholder: "0.00" },
  { formName: "total_price_sold", formLabel: "Total Price Sold", type: "number", placeholder: "0.00" },
  { formName: "shipping_cost", formLabel: "Shipping", type: "number", placeholder: "0.00" },
  { formName: "profit", formLabel: "Profit", type: "number", placeholder: "0.00" },
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

    config.forEach((f) => (initialState[f.formName] = f.defaultValue ?? ""));
    return initialState;
    //looping through our inventoryFields and creates an object that should
    //populate data like so --> { dateOfPurchase: "", productName: "", costPerItem: 0, ... }
  });
  //Delete this in a future PR
  console.log("this is our form data --->", formData);

  // array for holding our data which are objects for when the user clicks on add entry
  const [addInventory, setAddInventory] = useState<InventoryEntry[]>([]);

  const handleAddEntryBtn = (
    e: React.FormEvent,
    initialState: Record<string, string | number> = {},
  ) => {
    e.preventDefault(); // Stops the page from refreshing

    // Create a "Snapshot" of the current form data with a unique ID
    const newEntry: InventoryEntry = {
      ...formData, // Copies all the fields from your form
      id: Date.now(), // Adds a unique fingerprint for React keys
    } as InventoryEntry; // Tells TS this matches our interface

    // Add it to the list
    setAddInventory((prev) => [...prev, newEntry]);

    // clear the form
    const handleClear = () => {
      setFormData(initialState);
    };
    handleClear();
  };
 


 //handle all the change logic for every input field
const handleChange = (name: string, value: string) => {
  setFormData((prev) => {
    // Start with the new value
    const updatedData = { ...prev, [name]: value };

    // Parse values defaulting to 0 for safety in case user leaves blank or adds a weird character
    const costPer = parseFloat(updatedData.cost_per_item as string) || 0;
    const qty = parseInt(updatedData.quantity as string) || 0;
    const listPrice = parseFloat(updatedData.sold_price as string) || 0;
    const shipping = parseFloat(updatedData.shipping_cost as string) || 0;

    // Perform the Chain Calculations
    const calculatedTotalCost = costPer * qty;
    const calculatedTotalPriceSold = listPrice * qty; // <--- Your new logic
    const calculatedProfit = calculatedTotalPriceSold - calculatedTotalCost - shipping;

    return {
      ...updatedData,
      //toFixed(2) ensures our calculations look like money. e.g $10.50
      total_cost: Number(calculatedTotalCost.toFixed(2)),
      total_price_sold: Number(calculatedTotalPriceSold.toFixed(2)),
      profit: Number(calculatedProfit.toFixed(2)),
    };
  });
};
// ---- UI  ----
  return (
    <div className="w-full min-h-screen bg-[#0F1216] p-8 text-zinc-50 flex flex-col gap-10">
      <form
        onSubmit={handleAddEntryBtn}
        className="grid grid-cols-10 gap-0 bg-[#1E2329] p-4 rounded-xl shadow-2xl border border-slate-700/50"
      >
   {inventoryFields.map((field) => (
  <div
    key={field.formName}
    className={`flex flex-col justify-between px-3 py-1 border-r border-slate-700 last:border-r-0 min-h-[60px]
      ${field.formName === "productName" ? "col-span-2" : "col-span-1"}`}
  >
    {/* Label: Now centered for EVERY column */}
    <label 
      className="text-[10px] uppercase font-bold text-slate-500 mb-1 whitespace-nowrap overflow-hidden text-ellipsis w-full text-center"
    >
      {field.formLabel}
    </label>

    {/* Input: Remains centered for Name, left-aligned for numbers/dates */}
<input
  type={field.type === "number" ? "text" : field.type}
  value={
    field.type === "number"
      ? field.formName === "quantity"
        ? (formData[field.formName] ?? 0)
        : `$${formData[field.formName] ?? 0}`
      : (formData[field.formName] ?? "")
  }
  onChange={(e) => {
    let val = e.target.value;
    if (field.type === "number") {
      val = val.replace(/[^0-9.]/g, "");
    }
    handleChange(field.formName, val);
  }}
  placeholder={field.placeholder}
  
  // Adjusted ReadOnly logic to include Total Price Sold
  readOnly={["totalCost", "totalPriceSold", "profit"].includes(field.formName)}
  // checking if the field name is the following and if so skip over it. -1 === do not let user skip while 0 === user can tab
  tabIndex={["totalCost", "totalPriceSold", "profit"].includes(field.formName) ? -1 : 0}

  className={`bg-transparent p-1 text-sm outline-none transition-all rounded w-full
    /* checking if field name is profit and adjusted text color */
    ${field.formName === 'profit' ? 'text-emerald-400 font-bold' : 'text-zinc-50'}

    /* Added some alignment on the product name field to give it more focus to the user */
    ${field.formName === "productName" ? "text-center" : "text-left"}
    
    /* ReadOnly Styling: Now also dims Total Price Sold */
    ${["totalCost", "totalPriceSold", "profit"].includes(field.formName)
      ? "opacity-50 cursor-not-allowed select-none" 
      : "focus:bg-white/5"}

    /* White Calendar Icon */
    [&::-webkit-calendar-picker-indicator]:invert`}
/>
  </div>
))}

        <button
          type="submit"
          className="col-span-10 justify-self-center w-full max-w-xs mt-8 bg-sky-600 hover:bg-sky-500 text-white font-medium py-2 rounded-lg transition-colors shadow-lg"
        >
          Add Entry
        </button>
      </form>

      {/* Table for our newly added entries */}
      <div className="w-full overflow-hidden rounded-xl border border-slate-700/50 bg-[#1E2329] shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left border-collapse table-auto">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-800/50">
                {/* field === our current object */}
                {inventoryFields.map((field) => (
                  <th
                    key={field.formName}
                    className="px-6 py-4 text-[10px] uppercase tracking-wider text-slate-500 font-bold"
                  >
                    {field.formLabel}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {addInventory.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-white/5 transition-colors"
                >
                  {/* 1. We iterate through the fields to create cells */}
                  {inventoryFields.map((field) => {
                    const rawValue = item[field.formName];

                    // 2. Determine how to display the value
                    let displayValue = rawValue ?? "-";

                    // 3. Apply your currency logic for numbers
                    if (
                      field.type === "number" &&
                      field.formName !== "productQty"
                    ) {
                      displayValue = `$${rawValue ?? 0}`;
                    }
                    return (
                      <td
                        key={field.formName}
                        className={`px-6 py-4 text-sm whitespace-nowrap 
              ${
                field.formName === "profit"
                  ? Number(rawValue) >= 0
                    ? "text-emerald-400 font-bold"
                    : "text-rose-400 font-bold"
                  : "text-zinc-300"
              }`}
                      >
                        {displayValue}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {addInventory.length === 0 && (
          <div className="p-12 text-center text-slate-500 italic bg-slate-900/10">
            No entries found. Fill out the form above to get started.
          </div>
        )}
      </div>
    </div>
  );
}
export default InventoryForm;
