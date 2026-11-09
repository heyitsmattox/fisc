import axios from "axios";
import { useState, useEffect } from "react";
import type { SealedPokemonProduct, PokemonCard } from "../../types/pokemonTypes";

const rapidHost = import.meta.env.VITE_X_RAPID_HOST;
const rapidKey = import.meta.env.VITE_X_RAPID_API_KEY;


const usePokemonSearch = (searchTerm: string) => {
  const [sealedProducts, setSealedProducts ] = useState<SealedPokemonProduct[]>([]);
  const [ singleCards, setSingleCards ] = useState<PokemonCard[]>([]);
  const [isLoading, setIsLoading ] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

///pokemon/cards/search
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      //`https://${rapidHost}/pokemon/cards/search`]

      try {
        const sealedRequest = axios.get(
          `https://${rapidHost}/pokemon/products/search`,
          {
            params: { page: 1, search: searchTerm},
            headers: {
              "x-rapidapi-host": rapidHost,
              "x-rapidapi-key": rapidKey,
            },
          }
        )
         const cardRequest = axios.get(
          `https://${rapidHost}/pokemon/cards/search`,
        {
            params: { page: 1, search: searchTerm},
            headers: {
              "x-rapidapi-host": rapidHost,
              "x-rapidapi-key": rapidKey,
            },
          } 
        )
        const response = await Promise.all([sealedRequest, cardRequest]);
        console.log("our response", response)

        //console.log("reponse object from api --->",response.data.data) 
        setSealedProducts( response[0].data.data);
        setSingleCards(response[1].data.data)
      
      } catch (error) {
        setError("Failed to fetch sealed products and single cards")
        console.error("error trying to retrieve single cards and sealed products", error);
      }
      setIsLoading(false);     
    }
    fetchData()
   
  }, [searchTerm])

return { sealedProducts, singleCards, isLoading, error }
};

export default usePokemonSearch;