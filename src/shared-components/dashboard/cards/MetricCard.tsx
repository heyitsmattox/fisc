import type { JSX } from "react";
import { formatCurrency } from "../../../utils.ts/formatters";

interface MetricCardProps {
  metric: number;
  backgroundVariant?: "emerald" | "rose" | "default";
  metricString: "Number of Sales" | "Profit" | "ROI";
  textColorVariant?: "emerald" | "default";
}

export const MetricCard = ({metric, metricString, backgroundVariant = "default", textColorVariant = "default"}: MetricCardProps): JSX.Element => {

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

  const displayProfitValue  = metricString === "Profit" 
    ? formatCurrency(metric) 
    : metric.toLocaleString();
  
  return (
     <div className={`w-full sm:max-w-sm md:max-w-xs bg-[#1E2329] border ${borderColor} rounded-xl p-6 shadow-2xl flex flex-col gap-6 mx-auto md:mx-0 ${textColor}`}>
      <div className="flex flex-col">
        <div className="border-b border-slate-700/50 pb-6 mb-6">
          <div className="text-3xl md:text-4xl font-bold  tracking-tight">
            {displayProfitValue}
          </div>
          <div className=" text-xs font-bold uppercase mt-2 tracking-wide text-white">
            {metricString}
          </div>
        </div>
      </div>
    </div>
  )
  };