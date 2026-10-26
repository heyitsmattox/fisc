interface AllocationSlice {
  label: string;
  pct: number;
  color: string;
}

interface AllocationSidebarProps {
allocationArray: AllocationSlice[];
}

const AllocationSidebar = ({allocationArray}: AllocationSidebarProps) => {

return (
  <div className="bg-surface border border-slate-700/50 rounded-xl shadow-2xl p-5">
    <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3.5">
      Allocation
    </h2>
    <div className="flex w-full h-2.5 rounded-full overflow-hidden">
      {allocationArray.map((slice) => (
        <div
          key={slice.label}
          className="h-full"
          style={{ width: `${slice.pct}%`, background: slice.color }}
        />
      ))}
    </div>
    <div className="flex flex-col gap-2.5 mt-3.5">
      {allocationArray.map((slice) => (
        <div key={slice.label} className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-2 text-slate-300">
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ background: slice.color }}
            />
            {slice.label}
          </span>
          <span className="text-slate-400">{slice.pct}%</span>
        </div>
      ))}
    </div>
  </div>
);



};

export default AllocationSidebar;