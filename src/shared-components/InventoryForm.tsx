import { useState, type ChangeEvent, type JSX } from "react";

interface InvFormProps {
  dateOfLastSale?: string;
  productName: string; //ProductName
  costPerItem: number;
  productQty: number;
  totalCost: number;
  soldListPrice: number;
  shippingFees: number;
  totalPriceSold: number;
  profit: number;
}

export function InventoryForm({
  dateOfLastSale = "Date of Last Sale",
  productName = "Product Name",
  costPerItem = 0,
  productQty = 0,
  totalCost = 0,
  soldListPrice = 0,
  shippingFees = 0,
  totalPriceSold = 0,
  profit = 0,
}: InvFormProps): JSX.Element {
  const [formData, setFormData] = useState<InvFormProps>({
    dateOfLastSale: "",
    productName: "",
    costPerItem: 0,
    productQty: 0,
    totalCost: 0,
    soldListPrice: 0,
    shippingFees: 0,
    totalPriceSold: 0,
    profit: 0,
  });

  return (
    <>
      {/* Parent tag of the form */}
      <form className="flex flex-row border-2 border-blue-400">
        {/* Add the onSubmit property on the form tag. */}
        {/* div containing all the fields */}
        <div className="flex flex-col">
          <label htmlFor="dateOfLastSale">{dateOfLastSale}</label>
          <input
            type="date"
            id="dateOfLastSale"
            //value={console.log("data")} // Binds the input to React state
            //onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="productName">{productName}</label>
          <input
            type="text"
            id="productName"
            className="text-slate-950"
            value={formData.productName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const { value } = e.target;
              setFormData((prev) => ({
                ...prev,
                productName: value, // Directly update the key
              }));
            }}
          />
        </div>

        {/* <div className="flex flex-col">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              //value={formData.message}
              //onChange={handleChange}
            />
          </div> */}

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default InventoryForm;

// const InventoryForm = () => {
//   const [formData, setFormData] = useState<InvFormProps>({
//     dateOfLastSale: "",
//     productName: "",
//     costPerItem: 0,
//     productQty: 0,
//     totalCost: 0,
//     soldListPrice: 0,
//     shippingFees: 0,
//     totalPriceSold: 0,
//     profit: 0,
//   });

// const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   e.preventDefault();
//   const name = e.target.name as keyof InvFormProps;
//   const { value, type } = e.target;

//   // Checking if input is a number string and then converting it to a decimal Number. i.e "25.50" into 25.50
//   // || fallback incase user deletes everything in the input box.
//   const parsedValue = type === "number" ? parseFloat(value) || 0 : value;

//   setFormData((prev) => ({
//     ...prev,
//     [name]: parsedValue,
//   }));
// };
