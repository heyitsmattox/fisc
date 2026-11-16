interface FilterChips {
    label: string;
}

interface FilterChipsProps {
    filterChipsArray : FilterChips[]
}

const FilterChips = ({filterChipsArray}: FilterChipsProps) => {


//filter chips are:
// all, single, sealed, graded slabs
return (
    <div>
        {filterChipsArray.map((chip) => (
            <div
            key={chip.label}
            className="h-full"
        />
        ))}
    </div>
)

};

export default FilterChips;