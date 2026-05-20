import axios from "axios";
import { useState, useEffect } from "react";

const rapidHost = import.meta.env.VITE_X_RAPID_HOST;
const rapidKey = import.meta.env.VITE_X_RAPID_API_KEY;

// type alias
type SealedPokemonProduct = {
  id: number;
  name: string;
  prices: {
    cardmarket: {
      "7d_average": number;
    };
  };
  episode: {
    code: string;
  };
  image: string;
}

const useSealedPokemonProducts = () => {
  const [sealedProducts, setSealedProducts ] = useState<SealedPokemonProduct[]>([]);
  const [isLoading, setIsLoading ] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await axios.get(
          `https://${rapidHost}/pokemon/products/search`,
          {
            params: { page: 1},
            headers: {
              "x-rapidapi-host": rapidHost,
              "x-rapidapi-key": rapidKey,
            },
          }
        )
        //console.log(response.data) 
        setSealedProducts(response.data);
      
      } catch (error) {
        setError("Failed to fetch sealed products")
        console.error("error trying to retrieve products", error);
      }
      setIsLoading(false);
    }
    fetchData()
   
  }, [])

return { sealedProducts, isLoading, error }
};

export default useSealedPokemonProducts;