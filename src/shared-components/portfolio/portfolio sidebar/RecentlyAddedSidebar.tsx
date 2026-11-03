//return the "created_at" and "product_name"
//return the "created_at" and "product_name"
import type { PortfolioData } from "../../../hooks/portfolio/usePortfolio";
import { formatDate } from "../../../utils.ts/formatters";
interface RecentlyAddedProps {
  recentItemsArray : PortfolioData[];
}

const RecentlyAddedSidebar = ({recentItemsArray }: RecentlyAddedProps) => {

  return (
   <>
   <div className="bg-surface border border-slate-700/50 rounded-xl shadow-2xl p-5">
    <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3.5">
      Recently Added
    </h2>
    <div className="flex flex-col gap-3">
    {recentItemsArray.map((item) => (
      <div
      key={item.id}
      className="flex items-center justify-between gap-2.5"
      >
      <span className="text-xs font-semibold text-zinc-50 truncate">{item.product_name}</span>
      <span className="text-[11px] text-slate-500 whitespace-nowrap">{formatDate(item.created_at)}</span>
      </div>
      
    
    ))}
    </div>
 
   </div>
   
   </>
  )

};

export default RecentlyAddedSidebar;