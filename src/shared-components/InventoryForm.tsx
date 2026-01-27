import { useState, type JSX } from "react";


interface FieldConfig {
  formName: string;   // The key in our data (e.g., "costPerItem")
  formLabel: string;  // The text the user sees (e.g., "Cost Per Item")
  type: "text" | "number"; 
  defaultValue?: string | number;
}

interface DynamicInventoryFormProps {
  config: FieldConfig[];
  onSubmit: (data: Record<string, unknown>) => void;
}



const InventoryForm = (): unknown => {



  return (
    <>
      {/* Parent tag of the form */}
      <form className="flex flex-row border-2 border-blue-400">
        {/* Add the onSubmit property on the form tag. */}
        {/* div containing all the fields */}
        <div className="flex flex-col">
          <label htmlFor="dateOfLastSale">{}</label>
          <input
            type="date"
            id="dateOfLastSale"
            className="text-slate-950"
            //value={console.log("data")} // Binds the input to React state
            //onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default InventoryForm;

