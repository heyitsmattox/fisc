import type { JSX } from "react";
import { useState } from "react";

interface RoiCardProps {
  roi: number;
}

export const RoiCard = ({roi}: RoiCardProps): JSX.Element => {
  const [positive, setPositive] = useState(roi >= 0);

  console.log("ROI value in RoiCard:", roi); // Debug log to check the ROI value

  if (roi >= 0 && !positive) {
    setPositive(true);
  } else if (roi < 0 && positive) {
    setPositive(false);
  }

return (
    <div className=" bg-[#1E2329] border border-slate-600/50 rounded-xl p-3 pl-8 shadow-2xl flex flex-col h-fit">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="text-xl md:text-2xl font-bold tracking-tight text-white">
           
            {roi.toFixed(2)}%
             {
              positive ? (
                <i className=" ml-2 fa-solid fa-caret-up text-emerald-400"></i>
              ) : (
                <i className="ml-2 fa-solid fa-caret-down"></i>
              )
            }
          </div>
          <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
            ROI
          </div>
        </div>
      </div>
    </div>
  );
};
