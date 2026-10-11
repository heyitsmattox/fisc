import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";

const PortfolioHome = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar showFiscImageLogo={true} showNavbarMenuIcon={true} />
      <div className="w-full max-w-screen-xl mx-auto px-4">
        <div className="py-10 flex items-center justify-between">
          <h1 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
            My Portfolio
          </h1>
        </div>

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
      </div>
    </>
  );
};

export default PortfolioHome;
