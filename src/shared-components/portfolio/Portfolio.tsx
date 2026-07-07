import { useState } from "react";
import useSealedPokemonProducts from "../../hooks/pokemon/useSealedPokemonProducts";
import ProductCard from "./ProductCard";
import Navbar from "../layout/Navbar";
import usePortfolio from "../../hooks/portfolio/usePortfolio";

const Portfolio = () => {
  const [draftSearchTerm, setDraftSearchTerm] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { sealedProducts, isLoading, error } =
    useSealedPokemonProducts(searchTerm);
  const { qty, handleAdd, handleRemove } = usePortfolio()
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(draftSearchTerm);
    setDraftSearchTerm("");
  };

console.log("qty value", qty)



  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar showFiscImageLogo={true} showNavbarMenuIcon={true} />
      <div className="w-full max-w-screen-xl mx-auto px-4">
        <div className="py-10 flex flex-col items-center gap-4">
          <h1 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
            Search Sealed Products
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-3 w-full max-w-xl"
          >
            <input
              type="text"
              placeholder="e.g. Fusion Strike Booster Box"
              value={draftSearchTerm}
              onChange={(e) => setDraftSearchTerm(e.target.value)}
              className="flex-1 bg-[#161B22] border border-slate-700/50 rounded-lg px-4 py-2.5 text-zinc-50 placeholder:text-slate-500 text-sm outline-none focus:border-emerald-500/50"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-zinc-50 font-bold text-xs uppercase tracking-wide px-5 py-2.5 rounded-lg transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        <div className="grid grid-cols-3 lg:grid-cols-3 gap-3">
          {sealedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              qty={qty[product.id] ?? 0}
              onAdd={(productId) => handleAdd(productId, product.name, product.prices.cardmarket["7d_average"], product.image)}
              onRemove={handleRemove}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Portfolio;
