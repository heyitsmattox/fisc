import { useEffect, useState, type JSX } from "react";
import { supabase } from "../../lib/supabaseClient";
import type { Database } from "../../lib/database.types";
import deleteEntry from "../../utils.ts/inventory/deleteEntry";

// This pulls the exact row definition from your 'inventory' table
type InventoryEntry = Database["public"]["Tables"]["inventory"]["Row"];

interface FieldConfig {
  formName: keyof InventoryEntry;
  formLabel: string; // The text the user sees (e.g., "Cost Per Item")
  type: "text" | "number" | "date";
  defaultValue?: string | number;
  placeholder?: string;
}

interface DynamicInventoryFormProps {
  config: FieldConfig[];
}

//blueprint where every every line in our array represents our a single input
export const inventoryFields: FieldConfig[] = [
  {
    formName: "purchase_date",
    formLabel: "Date",
    type: "date",
    placeholder: "",
  },
  {
    formName: "product_name",
    formLabel: "Product Name",
    type: "text",
    placeholder: "Item Name",
  },
  {
    formName: "cost_per_item",
    formLabel: "Cost Per Item",
    type: "number",
    placeholder: "0.00",
  },
  { formName: "quantity", formLabel: "Qty", type: "number", placeholder: "0" },
  {
    formName: "total_cost",
    formLabel: "Total Cost",
    type: "number",
    placeholder: "0.00",
  },
  {
    formName: "sold_price",
    formLabel: "Sold Price",
    type: "number",
    placeholder: "0.00",
  },
  {
    formName: "total_price_sold",
    formLabel: "Total Price Sold",
    type: "number",
    placeholder: "0.00",
  },
  {
    formName: "shipping_cost",
    formLabel: "Shipping",
    type: "number",
    placeholder: "0.00",
  },
  {
    formName: "profit",
    formLabel: "Profit",
    type: "number",
    placeholder: "0.00",
  },
];

// These fields are calculated automatically — the user should never edit them directly
const READ_ONLY_FIELDS = ["total_cost", "total_price_sold", "profit"];

export function InventoryForm({
  //config is our "smart" default in case we reuse this component. By leaving the config prop undefined or not passed, it'll plug in our data from FieldConfig above. If we need different fields we can pass config={otherFieldName}
  config = inventoryFields,
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
    //populate data like so --> { dateOfPurchase: "", product_name: "", cost_per_item: 0, ... }
  });
  // array for holding our data which are objects for when the user clicks on add entry
  const [addInventory, setAddInventory] = useState<InventoryEntry[]>([]);
  const [inventoryData, setInventoryData] = useState<InventoryEntry[]>([]);
  const [loading, setIsLoading] = useState(false);

  // --- Inline editing state ---
  // editingCell tracks WHICH cell is active: we store the row's id and the field name.
  // When this is null, no cell is being edited.
  const [editingCell, setEditingCell] = useState<{
    id: string;
    field: string;
  } | null>(null);

  // editingValue holds what the user is currently typing — it's a draft that
  // hasn't been saved yet. We only write to the database when they confirm.
  const [editingValue, setEditingValue] = useState<string>("");

  useEffect(() => {
    if (addInventory) {
      const fetchInventory = async () => {
        setIsLoading(true);
        const { data, error } = await supabase.from("inventory").select();
        if (error) {
          console.error("Error fetching inventory:", error.message);
        } else {
          setInventoryData(data || []);
        }
        setIsLoading(false);
      };
      fetchInventory();
    }
  }, [addInventory]);

  const handleAddEntryBtn = async (
    e: React.FormEvent,
    initialState: Record<string, string | number> = {},
  ) => {
    e.preventDefault(); // Stops the page from refreshing

    const { data, error } = await supabase
      .from("inventory")
      .insert([formData])
      .select();

    if (error) {
      console.error("Failed to save to database:", error.message);
      return;
    }
    if (data && data.length > 0) {
      const officialEntry = data[0];
      setAddInventory((prev) => [...prev, officialEntry]);
    }

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
      const calculatedProfit =
        calculatedTotalPriceSold - calculatedTotalCost - shipping;

      return {
        ...updatedData,
        //toFixed(2) ensures our calculations look like money. e.g $10.50
        total_cost: Number(calculatedTotalCost.toFixed(2)),
        total_price_sold: Number(calculatedTotalPriceSold.toFixed(2)),
        profit: Number(calculatedProfit.toFixed(2)),
      };
    });
  };

  // --- Inline editing handlers ---

  // Called when the user double-clicks a cell. We record which cell they clicked
  // and seed editingValue with whatever is currently in that cell.
  const handleStartEdit = (
    entryId: string,
    fieldName: string,
    currentValue: string | number | null,
  ) => {
    setEditingCell({ id: entryId, field: fieldName });
    setEditingValue(String(currentValue ?? ""));
  };

  // Called when the user confirms their edit (Enter key or clicking away).
  // We build the updated row, recalculate derived fields, save to Supabase,
  // then update our local state so the UI reflects the change immediately.

  const handleSaveEdit = async (entry: InventoryEntry, field: FieldConfig) => {
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
    // *** FUTURE EDITS *** - we could DRY this up by extracting the calculation logic into a separate function since it's used in multiple places now. For now, we'll just keep it here.
    if (
      ["cost_per_item", "quantity", "sold_price", "shipping_cost"].includes(
        field.formName,
      )
    ) {
      const costPer =
        field.formName === "cost_per_item"
          ? (parseFloat(editingValue) || 0)
          : (parseFloat(String(entry.cost_per_item)) || 0);
      const qty =
        field.formName === "quantity"
          ? (parseInt(editingValue) || 0)
          : (parseInt(String(entry.quantity)) || 0);
      const listPrice =
        field.formName === "sold_price"
          ? (parseFloat(editingValue) || 0)
          : (parseFloat(String(entry.sold_price)) || 0);
      const shipping =
        field.formName === "shipping_cost"
          ? (parseFloat(editingValue) || 0)
          : (parseFloat(String(entry.shipping_cost)) || 0);

      updatedEntry.total_cost = Number((costPer * qty).toFixed(2));
      updatedEntry.total_price_sold = Number((listPrice * qty).toFixed(2));
      updatedEntry.profit = Number(
        (updatedEntry.total_price_sold - updatedEntry.total_cost - shipping).toFixed(2),
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

  // Called when the user presses Escape — discards the draft and closes the input.
  const handleCancelEdit = () => {
    setEditingCell(null);
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
      ${field.formName === "product_name" ? "col-span-2" : "col-span-1"}`}
          >
            {/* Label: Now centered for EVERY column */}
            <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 whitespace-nowrap overflow-hidden text-ellipsis w-full text-center">
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
              readOnly={["total_cost", "total_price_sold", "profit"].includes(
                field.formName,
              )}
              // checking if the field name is the following and if so skip over it. -1 === do not let user skip while 0 === user can tab
              tabIndex={
                ["total_cost", "total_price_sold", "profit"].includes(
                  field.formName,
                )
                  ? -1
                  : 0
              }
              className={`bg-transparent p-1 text-sm outline-none transition-all rounded w-full
    /* checking if field name is profit and adjusted text color */
    ${field.formName === "profit" ? "text-emerald-400 font-bold" : "text-zinc-50"}

    /* Added some alignment on the product name field to give it more focus to the user */
    ${field.formName === "product_name" ? "text-center" : "text-left"}

    /* ReadOnly Styling: Now also dims Total Price Sold */
    ${
      ["totalCost", "totalPriceSold", "profit"].includes(field.formName)
        ? "opacity-50 cursor-not-allowed select-none"
        : "focus:bg-white/5"
    }

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

      {/* Conditional rendering for inventory data */}
      <div className="w-full overflow-hidden rounded-xl border border-slate-700/50 bg-[#1E2329] shadow-2xl">
        {loading ? (
          <div className="p-12 text-center text-slate-500 italic bg-slate-900/10">
            Loading inventory...
          </div>
        ) : inventoryData.length === 0 ? (
          <div className="p-12 text-center text-slate-500 italic bg-slate-900/10">
            No entries found. Fill out the form above to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left border-collapse table-auto">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/50">
                {/* mapping through our inventory fields to create table headers. e.g Product Name, Cost Per, etc. */}
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
              <tbody className="divide-y divide-slate-700/50 ">
                {inventoryData.map((singleFormEntry) => (
                  <tr
                    key={singleFormEntry.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    
                    {inventoryFields.map((field) => {
                      const rawValue = singleFormEntry[field.formName];
                      let displayValue: string | number = rawValue ?? "-";

                      if (field.type === "number" && field.formName !== "quantity") {
                        displayValue = `$${rawValue ?? 0}`;
                      }

                      // Is THIS specific cell the one currently being edited?
                      // We check both the row id AND the field name so only one cell
                      // is active at a time.
                      const isEditing =
                        editingCell?.id === String(singleFormEntry.id) && // should result in true since the cell would belong to the row we are in.
                        editingCell?.field === field.formName;

                      const isReadOnly = READ_ONLY_FIELDS.includes(field.formName);

                      return (
                        <td
                          key={field.formName}
                          // onDoubleClick triggers inline editing.
                          // We guard against read-only fields so calculated columns
                          // can never be edited directly.
                          onDoubleClick={() => {
                            if (!isReadOnly) {
                              handleStartEdit(
                                String(singleFormEntry.id),
                                field.formName,
                                rawValue,
                              );
                            }
                          }}
                          className={`px-6 py-4 text-sm whitespace-nowrap transition-colors
                            ${isReadOnly ? "cursor-default" : "cursor-pointer hover:bg-sky-900/20"}
                            ${
                              field.formName === "profit"
                             
                                ? Number(rawValue) >= 0
                                  ? "text-emerald-400 font-bold "
                                 
                                  : "text-rose-400 font-bold"
                                : "text-zinc-300"
                            }`}
                        >
              
                          {/*
                            CONDITIONAL RENDERING — the heart of inline editing.
                            If isEditing is true, show an <input>.
                            If isEditing is false, show the plain display text.
                            React swaps these in and out every time state changes.
                          */}
                          
                          {isEditing ? (
                            <input
                              // autoFocus puts the cursor inside the input the moment
                              // it appears — no extra click needed.
                              autoFocus
                              type={field.type === "number" ? "text" : field.type}
                              value={editingValue}
                              onChange={(e) => setEditingValue(e.target.value)}
                              // onBlur fires when the user clicks somewhere else.
                              // We treat that as "done" and save the edit.
                              onBlur={() => handleSaveEdit(singleFormEntry, field)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleSaveEdit(singleFormEntry, field);
                                if (e.key === "Escape") handleCancelEdit();
                              }}
                              className="bg-transparent border-b border-sky-500 outline-none text-sm w-full min-w-[60px]"
                            />
                          ) : (
                            displayValue
                          )}
                        </td>
                      );
                    })}
                    <td className="p-2 text-rose-300 opacity-0 hover:opacity-100">
                      <button
                      onClick={() => deleteEntry(singleFormEntry, setInventoryData)}
                      >
                        <i className="fa-solid fa-delete-left"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default InventoryForm;

