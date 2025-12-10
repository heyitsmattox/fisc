export interface InventorySaleRecord {
  id: string;
  dateOfLastSale: Date,
  productName: string,
  costPerItem: number,
  productQty: number,
  totalCost: number,
  soldListPrice: number,
  totalPriceSold: number,
  shippingfees: number,
  profit: number
}

