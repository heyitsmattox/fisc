import type { JSX } from "react";
import { formatCurrency } from "../../../utils.ts/formatters";

interface PerformanceCardProps {
  totalProfit: number;
  totalPaid: number;
}

export const PerformanceCard = ({
  totalProfit,
  totalPaid,
}: PerformanceCardProps): JSX.Element => {

  return (
    <div className="w-full sm:max-w-sm md:max-w-xs bg-surface border border-slate-700/50 rounded-xl p-6 shadow-2xl flex flex-col gap-6 mx-auto md:mx-0">
      <h2 className="text-xs uppercase font-black text-slate-400 tracking-[0.2em]">
        Performance
      </h2>
      <div className="flex flex-col">
        <div className="border-b border-slate-700/50 pb-6 mb-6">
          <div className="text-3xl md:text-4xl font-bold tracking-tight text-emerald-400">
            {formatCurrency(totalProfit)}
          </div>
          <div className="text-slate-400 text-xs font-bold uppercase mt-2 tracking-wide">
            Total Profit
          </div>
        </div>
        <div>
          <div className="text-3xl md:text-4xl font-bold text-zinc-50 tracking-tight">
            {formatCurrency(totalPaid)}
          </div>
          <div className="text-slate-400 text-xs font-bold uppercase mt-2 tracking-wide">
            Total Paid
          </div>
        </div>
      </div>
    </div>
  );
};
