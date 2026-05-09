import { useEffect, useState, type JSX } from "react";
import { supabase } from "../../lib/supabaseClient";
import deleteEntry from "../../utils.ts/sales/deleteEntry";
import { useSalesForm } from "../../hooks/useSalesForm";
import addEntry from "../../utils.ts/sales/addEntry";
import updateFormFields from "./updateFormFields";
import saveEdit from "./saveEdit";
import type { SalesEntry, FormData } from "../../types/salesTypes";




export interface FieldConfig {
  formName: keyof SalesEntry;
  formLabel: string; // The text the user sees (e.g., "Cost Per Item")
  type: "text" | "number" | "date";
  defaultValue?: string | number;
  placeholder?: string;
}

interface DynamicSalesFormProps {
  config: FieldConfig[];
}

//blueprint where every every line in our array represents our a single input
export const saleFields: FieldConfig[] = [
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

const READ_ONLY_FIELDS = ["total_cost", "total_price_sold", "profit"];
export function SalesForm({
  //config is our "smart" default in case we reuse this component. By leaving the config prop undefined or not passed, it'll plug in our data from FieldConfig above. If we need different fields we can pass config={otherFieldName}
  config = saleFields,
  //Telling typescript to only accept an object that has exactly what is defined in the DynamicInventoryFormProps interface.
}: DynamicSalesFormProps): JSX.Element {
  const {
    formData,
    setFormData,
    addSale,
    setAddSale,
    loading,
    setIsLoading,
    saleData,
    setSaleData,
  } = useSalesForm(config);

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
    if (addSale) {
      const fetchInventory = async () => {
        setIsLoading(true);
        const { data, error } = await supabase.from("inventory").select();
        if (error) {
          console.error("Error fetching inventory:", error.message);
        } else {
          setSaleData(data || []);
        }
        setIsLoading(false);
      };
      fetchInventory();
    }
  }, [addSale, setSaleData, setIsLoading]);

  const handleAddEntryBtn = async (
    e: React.FormEvent,
    initialState: FormData = {},
  ) => {
    await addEntry(e, formData, setAddSale);
    setFormData(initialState);
  };

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
        {saleFields.map((field) => (
          <div
            key={field.formName}
            className={`flex flex-col justify-between px-3 py-1 border-r border-slate-700 last:border-r-0 min-h-[60px]
      ${field.formName === "product_name" ? "col-span-2" : "col-span-1"}`}
          >
            <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 whitespace-nowrap overflow-hidden text-ellipsis w-full text-center">
              {field.formLabel}
            </label>
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
                updateFormFields(field.formName, val, setFormData);
              }}
              placeholder={field.placeholder}
              readOnly={["total_cost", "total_price_sold", "profit"].includes(
                field.formName,
              )}
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
        ) : saleData.length === 0 ? (
          <div className="p-12 text-center text-slate-500 italic bg-slate-900/10">
            No entries found. Fill out the form above to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left border-collapse table-auto">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/50">
                  {/* mapping through our inventory fields to create table headers. e.g Product Name, Cost Per, etc. */}
                  {saleFields.map((field) => (
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
                {saleData.map((singleFormEntry) => (
                  <tr
                    key={singleFormEntry.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    {saleFields.map((field) => {
                      const rawValue = singleFormEntry[field.formName];
                      let displayValue: string | number = rawValue ?? "-";

                      if (
                        field.type === "number" &&
                        field.formName !== "quantity"
                      ) {
                        displayValue = `$${rawValue ?? 0}`;
                      }
                      const isEditing =
                        editingCell?.id === String(singleFormEntry.id) && // should result in true since the cell would belong to the row we are in.
                        editingCell?.field === field.formName;

                      const isReadOnly = READ_ONLY_FIELDS.includes(
                        field.formName,
                      );

                      return (
                        <td
                          key={field.formName}
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
                          {isEditing ? (
                            <input
                              // autoFocus puts the cursor inside the input the moment
                              // it appears — no extra click needed.
                              autoFocus
                              type={
                                field.type === "number" ? "text" : field.type
                              }
                              value={editingValue}
                              onChange={(e) => setEditingValue(e.target.value)}
                              // onBlur fires when the user clicks somewhere else.
                              // We treat that as "done" and save the edit.
                              onBlur={
                                () =>
                                  saveEdit(
                                    singleFormEntry,
                                    field,
                                    editingValue,
                                    editingCell,
                                    setSaleData,
                                    setEditingCell,
                                  )
                                // handleSaveEdit(singleFormEntry, field)
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter")
                                  saveEdit(
                                    singleFormEntry,
                                    field,
                                    editingValue,
                                    editingCell,
                                    setSaleData,
                                    setEditingCell,
                                  );
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
                        onClick={() =>
                          deleteEntry(singleFormEntry, setSaleData)
                        }
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

export default SalesForm;
