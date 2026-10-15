import type { PortfolioData } from "../../hooks/portfolio/usePortfolio";

interface PortfolioItemCardProps {
  item: PortfolioData;
}

const PortfolioItemCard = ({ item }: PortfolioItemCardProps) => {
  const quantity = item.quantity ?? 0;
  const price = item.price ?? 0;
  const totalValue = price * quantity;

  return (
    <div className="bg-surface border border-slate-700/50 rounded-xl shadow-2xl flex flex-col overflow-hidden">
      <div className="flex items-center justify-center p-4 bg-well h-48">
        <img
          src={item.image ?? undefined}
          alt={item.product_name ?? "Portfolio item"}
          className="h-full object-contain"
        />
      </div>

      <div className="flex flex-col gap-3 p-4">
        <h3 className="text-zinc-50 font-bold text-sm leading-snug">
          {item.product_name ?? "Unnamed item"}
        </h3>

        <div className="border-t border-slate-700/50" />

        <div className="flex items-center justify-between">
          <div>
            <div className="text-zinc-50 font-bold text-sm">{quantity}</div>
            <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mt-1">
              Qty
            </div>
          </div>
          <div className="text-right">
            <div className="text-emerald-400 font-bold text-xl tracking-tight">
              ${totalValue.toFixed(2)}
            </div>
            <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mt-1">
              Total Value
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioItemCard;
