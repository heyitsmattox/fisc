import type { FormData } from "../../types/salesTypes";

const updateFormFields = (name: string, value: string, setFormData: React.Dispatch<React.SetStateAction<FormData>>) => {

  setFormData((prev) => {
      // Start with the new value
      const updatedData = { ...prev, [name]: value };
      const costPer = parseFloat(updatedData.cost_per_item as string) || 0;
      const qty = parseInt(updatedData.quantity as string) || 0;
      const listPrice = parseFloat(updatedData.sold_price as string) || 0;
      const shipping = parseFloat(updatedData.shipping_cost as string) || 0;
      const calculatedTotalCost = costPer * qty;
      const calculatedTotalPriceSold = listPrice * qty;
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

export default updateFormFields;