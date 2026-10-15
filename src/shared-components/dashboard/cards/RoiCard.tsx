import type { JSX } from "react";
import { useState } from "react";

interface RoiCardProps {
  roi: number;
}

export const RoiCard = ({roi}: RoiCardProps): JSX.Element => {
  const [positive, setPositive] = useState(roi >= 0);

  if (roi >= 0 && !positive) {
    setPositive(true);
  } else if (roi < 0 && positive) {
    setPositive(false);
  }

return (
    <div className=" bg-surface border border-slate-700/50 rounded-xl p-3 pl-8 shadow-2xl flex flex-col h-fit">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="text-xl md:text-2xl font-bold tracking-tight text-zinc-50">

            {roi.toFixed(2)}%
             {
              positive ? (
                <i className=" ml-2 fa-solid fa-caret-up text-emerald-400"></i>
              ) : (
                <i className="ml-2 fa-solid fa-caret-down text-rose-400"></i>
              )
            }
          </div>
          <div className="text-xs font-bold uppercase tracking-wide text-slate-400">
            ROI
          </div>
        </div>
      </div>
    </div>
  );
};

