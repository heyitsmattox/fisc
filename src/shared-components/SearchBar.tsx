import { type ChangeEvent, type FormEvent, type JSX, useState } from "react";

interface SearchBarProps {
  searchBarPlaceholderTxt: string;
  buttonText: string;
  onSearchChange: (value: string) => void;
  /** Callback function triggered when the action button is clicked */
  onButtonClick: () => void;
  widthOfSearchBar: string;
}

const SearchBar = ({ 
  searchBarPlaceholderTxt = "Search", 
  buttonText = "New Entry", 
  onButtonClick,
  widthOfSearchBar = "w-72" 
}: SearchBarProps): JSX.Element => {
  const [text, setText] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      className="flex items-center gap-2"
      id="addItemForm"
      onSubmit={handleSubmit}
    >
      {/* Search Input Group */}
      <div className="relative group">
        <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors"></i>
        <input
          type="text"
          value={text}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
          className={`${widthOfSearchBar} pl-10 pr-3 py-1.5 rounded-md bg-[#1E2329] border border-zinc-700 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-slate-100 transition-all`}
          placeholder={searchBarPlaceholderTxt}
        />
      </div>

      <button
        type="button"
        onClick={onButtonClick}
        className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1.5 rounded-md font-bold transition-colors flex items-center shrink-0"
      >
        <i className="fa-solid fa-plus pr-2 text-sm"></i>
        {buttonText}
      </button>
    </form>
  );
};

export default SearchBar;
