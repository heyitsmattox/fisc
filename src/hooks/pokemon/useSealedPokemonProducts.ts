import axios from "axios";
import { useState, useEffect } from "react";

const rapidURL = import.meta.env.VITE_X_RAPID_HOST;
const rapidKey = import.meta.env.VITE_X_RAPID_API_KEY;

type SealedPokemonProduct = {
  id: number;
  name: string;
  prices: {
    cardmarket: {
      "7d_average": string;
    };
  };
  episode: {
    code: string;
  };
  image: string;
}

const useSealedPokemonProducts = () => {
  const [products, setProducts ] = useState([]);
  const [isLoading, setIsLoading ] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      // const response = await axios.get(rapidURL);
      // setProducts(response.data);
      
    }
    fetchData()
  }, [])

return { products }
};

export default useSealedPokemonProducts;