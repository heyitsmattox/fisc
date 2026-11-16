import type { ProductFilter } from "../../types/portfolioTypes";

interface FilterChipOption {
  label: string;
  value: ProductFilter;
}

interface FilterChipsProps {
  productFilter: ProductFilter;
  setProductFilter: (filter: ProductFilter) => void;
}

// Order and labels match the spec. Add { label: "Graded Slabs", value: "graded" } once
// "graded" is added to ProductFilter.
const FILTER_OPTIONS: FilterChipOption[] = [
  { label: "All", value: "all" },
  { label: "Sealed Product", value: "sealed" },
  { label: "Singles", value: "single" },
];

const FilterChips = ({ productFilter, setProductFilter }: FilterChipsProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2.5 mb-5">
      {FILTER_OPTIONS.map((chip) => {
        const isActive = chip.value === productFilter;

        return (
          <button
            key={chip.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => setProductFilter(chip.value)}
            className={`text-xs font-bold px-4 py-2 rounded-full border whitespace-nowrap transition-colors ${
              isActive
                ? "bg-emerald-400/15 text-emerald-400 border-emerald-400/40"
                : "bg-transparent text-slate-400 border-slate-700/50 hover:text-white"
            }`}
          >
            {chip.label}
          </button>
        );
      })}
    </div>
  );
};

export default FilterChips;
