import React from "react";
import { useStateContext } from "@/Contexts/ContextProvider";

const FilterCard = () => {
  const { setPriceFilter, setSearchInput, priceFilter } = useStateContext();

  // Update price filter state
  const handlePriceFilter = (e) => {
    const priceRange = e.target.name;
    setPriceFilter(prevFilter => {
      const updatedPriceFilter = { ...prevFilter };
      if (updatedPriceFilter[priceRange]) {
        delete updatedPriceFilter[priceRange];
      } else {
        updatedPriceFilter[priceRange] = true;
      }
      console.log('Updated Price Filter:', updatedPriceFilter);
      return updatedPriceFilter;
    });
  };

  // Update location filter state
  const handleLocationFilter = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="p-5 shadow-lg m-3">
      <h3 className="capitalize font-semibold text-lg">Filter By</h3>
      <div>
        <p className="font-medium text-lg italic capitalize">Price</p>
        <div>
          {[
            "100000 - 149000",
            "150000 - 199000",
            "200000 - 249000",
            "250000 - 300000",
          ].map((range) => (
            <div key={range} className="flex items-center gap-2">
              <input
                className="m-1"
                type="checkbox"
                name={range}
                id={range}
                checked={priceFilter[range] || false}
                onChange={handlePriceFilter}
              />
              <label htmlFor={range}>
                ₦ {range.replace("-", " - ₦ ")}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="my-2">
        <p className="font-medium text-lg italic capitalize">Location</p>
        <select className="p-2 my-2" onChange={handleLocationFilter}>
          <option value="">Select a location</option>
          <option value="Harmony">Harmony</option>
          <option value="Accord">Accord</option>
          <option value="Labuta">Labuta</option>
          <option value="Zoo">Zoo</option>
        </select>
      </div>
    </div>
  );
};

export default FilterCard;
