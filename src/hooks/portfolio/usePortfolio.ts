//owns the qty state, handles add/remove logic, 
// and makes the Supabase calls (upsert on add, 
// update/delete on remove)
import { useState } from "react";

const usePortfolio = () => {
  const [qty, setQty ] = useState<Record<number, number>>({})

    //product_name, price, image
  const handleAdd = (productId: number) => {

  setQty((prev) => ({  
  ...prev, 
  [productId]: (prev[productId] ?? 0) + 1,
 
}));  
};

const handleRemove = (productId: number) => {
setQty((prev) => ({
    ...prev,
    [productId]: (prev[productId] ?? 0) - 1,
  }))
}


return { qty, handleAdd, handleRemove }
};

export default usePortfolio;