import { useState } from "react";

interface InvFormProps {
  dateOfLastSale: string;
  ProductName: string;
  CostPerItem: number;
  ProductQty: number;
  TotalCost: number;
  SoldListPrice: number;
  ShippingFees: number;
  TotalPriceSold: number;
  Profit: number;
}

const InventoryForm = () => {
  const [formData, setFormData] = useState<InvFormProps>({
    dateOfLastSale: "",
    ProductName: "",
    CostPerItem: 0,
    ProductQty: 0,
    TotalCost: 0,
    SoldListPrice: 0,
    ShippingFees: 0,
    TotalPriceSold: 0,
    Profit: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof InvFormProps;
    const { value, type } = e.target;

    // Checking if input is a number string and then converting it to a decimal Number. i.e "25.50" into 25.50
    // || fallback incase user deletes everything in the input box.
    const parsedValue = type === "number" ? parseFloat(value) || 0 : value;

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  return (
    <>
    {/* Parent tag of the form */}
      <form className="flex flex-row border-2 border-blue-400">
        {/* Add the onSubmit property on the form tag. */}
        {/* div containing all the fields */}
          <div className="flex flex-col">
            <label htmlFor="dateOfLastSale">Date of Last Sale:</label>
            <input
              type="date"
              id="dateOfLastSale"
              name="dateOfLastSale" // Matches the key in state
              value={formData.dateOfLastSale} // Binds the input to React state
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              //value={formData.email}
              //onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              //value={formData.message}
              //onChange={handleChange}
            />
          </div>

          <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default InventoryForm;
