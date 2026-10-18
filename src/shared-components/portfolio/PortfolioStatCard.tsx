interface PortfolioStatCardProps {
  value: string;
  label: string;
}

const PortfolioStatCard = ({ value, label }: PortfolioStatCardProps) => {
  return (
    <div className="bg-surface border border-slate-700/50 rounded-xl shadow-2xl p-5">
      <div className="text-zinc-50 font-bold text-2xl tracking-tight">
        {value}
      </div>
      <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mt-1">
        {label}
      </div>
    </div>
  );
};

export default PortfolioStatCard;