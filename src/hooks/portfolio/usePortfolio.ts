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
    const { error } = await supabase.rpc("increment_portfolio_qty", {
      p_user_id: user.id,
      p_product_id: productId,
      p_product_name: productName,
      p_price: price,
      p_image: image,
    });

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
