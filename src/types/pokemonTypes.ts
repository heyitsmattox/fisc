export interface SealedPokemonProduct {
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