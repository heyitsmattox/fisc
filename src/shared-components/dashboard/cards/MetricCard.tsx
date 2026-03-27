import type { JSX } from "react";
import { formatCurrency } from "../../../utils.ts/formatters";

interface MetricCardProps {
  metric: number;
  backgroundVariant?: "emerald" | "rose" | "default";
  metricString: string;
  textColorVariant?: "emerald" | "default";
  isCompact?: boolean;
  avgProfitPerSale?: number; 

}

export const MetricCard = ({metric, metricString, backgroundVariant = "default", textColorVariant = "default", isCompact = false, avgProfitPerSale}: MetricCardProps): JSX.Element => {
  const borderVariants = {
    emerald: "border-emerald-400/50",
    rose: "border-rose-400/50",
    slate: "border-slate-600/50",
  };
  
  const textColorVariants = {
    emerald: "text-emerald-400",
    default: "text-white",
  };

  const borderColor = borderVariants[backgroundVariant as keyof typeof borderVariants] || borderVariants.slate;
  const textColor = textColorVariants[textColorVariant as keyof typeof textColorVariants] || textColorVariants.default;

  const displayProfitValue  = metricString === "Profit" || metricString === "Avg Profit per Sale" 
    ? formatCurrency(metric) 
    : metric.toLocaleString(); // Format as currency for profit, otherwise use locale string for numbers
  
  return (
    <div className={`w-full sm:max-w-sm md:max-w-xs bg-[#1E2329] border ${borderColor} rounded-xl shadow-2xl flex flex-col mx-auto md:mx-0 h-fit
      ${isCompact ? "p-8 gap-1" : "p-6 gap-6"} 
    `}>
      <div className="flex flex-col">
        {/* Only show the divider/spacing if NOT compact */}
        <div className={`${!isCompact ? "border-b border-slate-700/50 pb-6 mb-6" : ""}`}>
          <div className={`font-bold tracking-tight ${textColor} 
            ${isCompact ? "text-2xl" : "text-3xl md:text-4xl"}
          `}>
            {displayProfitValue}
          </div>
          <div className="text-xs font-bold uppercase mt-1 tracking-wide text-slate-400">
            {metricString}
          </div>
        </div>
      </div>
    </div>
  );
};
