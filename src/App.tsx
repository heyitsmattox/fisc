import type { InventorySaleRecord } from './types/InventorySaleRecord'; 


const MOCK_SALES_RECORDS: InventorySaleRecord[] = [
  {
    id: 'sale-001',
    dateOfLastSale: new Date('2025-12-05'),
    productName: '151 Booster Bundle Display',
    costPerItem: 600.00,
    productQty: 5,
    totalCost: 3000.00,
    soldListPrice: 1000.00,
    totalPriceSold: 5000.00,
    shippingfees: 10.00,
    profit: 4990, 
  },
  {
    id: 'sale-002',
    dateOfLastSale: new Date('2025-12-05'),
    productName: 'Evolving Skies ETB',
    costPerItem: 39.00,
    productQty: 1,
    totalCost: 39.00,
    soldListPrice: 350.00,
    totalPriceSold: 350.00,
    shippingfees: 10.00,
    profit: 300, 
  },
];




const App = () => {
  const record = MOCK_SALES_RECORDS[0]; 

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold underline mb-6">FISC Inventory Tracking</h1>

      {/* 2. Display the data using JSX */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-xl text-white">
        <h2 className="text-xl font-semibold mb-2">First Sale Record Details (Test)</h2>
        <p><strong>ID:</strong> {record.id}</p>
        <p><strong>Product:</strong> {record.productName}</p>
        <p><strong>Cost per item:</strong> {record.costPerItem}</p>
        <p><strong>Total Sale Price:</strong> ${record.totalPriceSold.toFixed(2)}</p>
        <p className="text-green-400">
          <strong>Calculated Profit:</strong> ${record.profit.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default App;
