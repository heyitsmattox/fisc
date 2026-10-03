import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../auth/useAuth";

const usePortfolio = () => {
  const [qty, setQty] = useState<Record<number, number>>({});
  const { user } = useAuth();

  const handleAdd = async (
    productId: number,
    productName: string,
    price: number,
    image: string,
  ) => {
    setQty((prev) => ({
      ...prev,
      [productId]: (prev[productId] ?? 0) + 1,
    }));
    if (!user) return;
    const { error } = await supabase

      .from("portfolio")
      .insert({
        user_id: user?.id,
        product_id: productId,
        product_name: productName,
        quantity: (qty[productId] ?? 0) + 1,
        price: price,
        image: image,
      })
      .select();

    if (error) {
      console.error("Failed to add to database.", error.message);
    }
  };

  const handleRemove = (productId: number) => {
    setQty((prev) => ({
      ...prev,
      [productId]: (prev[productId] ?? 0) - 1,
    }));
  };

  return { qty, handleAdd, handleRemove };
};

export default usePortfolio;
