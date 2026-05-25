import type { SealedPokemonProduct } from "../../hooks/pokemon/useSealedPokemonProducts";

type ProductCardProps = {
  product: SealedPokemonProduct;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-[#1E2329] border border-slate-700/50 rounded-xl shadow-2xl flex flex-col overflow-hidden">

      <div className="flex items-center justify-center p-4 bg-[#161B22] h-48">
        <img
          src={product.image}
          alt={product.name}
          className="h-full object-contain"
        />
      </div>

      <div className="flex flex-col gap-3 p-4">
        <span className="text-xs font-bold uppercase tracking-wide text-sky-300">
          {product.episode.code}
        </span>

        <h3 className="text-zinc-50 font-bold text-sm leading-snug">
          {product.name}
        </h3>

        <div className="border-t border-slate-700/50" />

        <div>
          <div className="text-emerald-400 font-bold text-xl tracking-tight">
            ${product.prices.cardmarket["7d_average"]}
          </div>
          <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mt-1">
            7 Day Avg
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
