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

export interface PokemonCard {
  id: number;
  name: string;
  card_number: number;
  rarity: string | null;
  prices: {
    cardmarket: {
      "7d_average": number;
    };
  };
  image: string;
  episode: {
    name: string;
    cards_printed_total: number;
    code: string;
  };
}