import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import usePortfolio from "../../hooks/portfolio/usePortfolio";
import PortfolioItemCard from "./PortfolioItemCard";
import PortfolioStatCard from "./PortfolioStatCard";

const PortfolioHome = () => {
  const navigate = useNavigate();
  const { portfolioData, isLoading, error } = usePortfolio();

  const items = portfolioData ?? [];
  const isEmpty = items.length === 0;

  const totalPortfolioValue = items.reduce(
    (sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 0),
    0
  );
  const totalItems = items.reduce(
     (sum, item) => sum +  (item.quantity ?? 0),
    0
  );

  // check if isLoading then display a spinner
  // error we can display an error banner of some sort

  return (
    <>
      <Navbar showFiscImageLogo={true} showNavbarMenuIcon={true} />

      <div className="w-full max-w-screen-xl mx-auto px-4">
        <div className="py-10 flex items-center justify-between">
          <h1 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
            My Portfolio
          </h1>
          <button
              onClick={() => navigate("/portfolio/add")}
              className="bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 font-bold text-xs uppercase tracking-wide px-5 py-2.5 rounded-lg transition-colors"
            >
              + Add Item
            </button>
        </div>
        {!isEmpty && (
          <div className="flex flex-col items-center justify-center text-center py-6">
            <div className="text-white font-bold tracking-tight text-4xl md:text-5xl">
              ${totalPortfolioValue.toFixed(2)}
            </div>
            <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mt-2">
              Portfolio Value
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <PortfolioStatCard 
          value={String(totalItems)} 
          label="Total Items" 
          />
           <PortfolioStatCard
            value={`$1500.75`}
            label="Unrealized Gains"
            fontColor="text-emerald-400"
          />
          <PortfolioStatCard
            value={"6"}
            label="WishList Items"
            fontColor= "text-sky-400"
          />
          <PortfolioStatCard
            value={`$${totalPortfolioValue.toFixed(2)}`}
            label="Total Spent"
          />
        </div>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center gap-4 py-24 border border-dashed border-slate-700/50 rounded-xl">
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">
              No items yet
            </p>
            <button
              onClick={() => navigate("/portfolio/add")}
              className="bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 font-bold text-xs uppercase tracking-wide px-5 py-2.5 rounded-lg transition-colors"
            >
              Search for products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 pb-12">
            {items.map((item) => (
              <PortfolioItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PortfolioHome;
