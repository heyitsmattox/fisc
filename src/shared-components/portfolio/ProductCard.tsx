import type { SealedPokemonProduct } from "../../hooks/pokemon/useSealedPokemonProducts";

interface ProductCardProps  {
  product: SealedPokemonProduct;
  qty: number | undefined;
  onAdd: (productId: number) => void;
  onRemove: (productId: number ) => void;
}

const ProductCard = ({ product, qty, onAdd, onRemove }: ProductCardProps) => {
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

        <div className="border-t border-slate-700/50" />

        {qty === 0 ? (
          <button
            onClick={() => onAdd(product.id)}
            className="bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 font-bold text-xs uppercase tracking-wide px-3 py-1.5 rounded-md transition-colors self-start"
          >
            + Add
          </button>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Qty
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onRemove(product.id)}
                className="w-7 h-7 flex items-center justify-center rounded-md bg-slate-700/50 hover:bg-slate-600/50 text-zinc-50 font-bold text-sm transition-colors"
              >
                −
              </button>
              <span className="text-zinc-50 font-bold text-sm w-4 text-center">
                {qty}
              </span>
              <button
                onClick={() => onAdd(product.id)}
                className="w-7 h-7 flex items-center justify-center rounded-md bg-emerald-600 hover:bg-emerald-500 text-zinc-50 font-bold text-sm transition-colors"
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

//"Manage your collection. Track your performance. Con brio."
