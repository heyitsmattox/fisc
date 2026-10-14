import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../auth/useAuth";
import type { Tables } from "../../lib/database.types";

export type PortfolioData = Tables<"portfolio">;

const usePortfolio = () => {
  const [ qty, setQty ] = useState<Record<number, number>>({});
  const [ isLoading, setIsLoading ] = useState<boolean>(true)
  const  [error, setError ] = useState<string | null>(null)
  const [ portfolioData, setPortfolioData ] = useState<PortfolioData[] | null>(null);
  const { user } = useAuth();


    useEffect(() => {
      const fetchPortfolioData = async () => {
        setIsLoading(true);
      
        try {
          const { data, error } = await supabase
          .from('portfolio')
          .select()

           if (error) {
          console.error("Failed to fetch portfolio data", error);
    }

          setPortfolioData(data)
        } catch ( error ) {
          setError("Failed to fetch the user's portfolio")
          console.error("error trying to receive the portfolio", error)
        }
        setIsLoading(false)
      }


   

      fetchPortfolioData()
    }, [user?.id])
  

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

  return { portfolioData, error, isLoading, qty, handleAdd, handleRemove };
};

export default usePortfolio;
