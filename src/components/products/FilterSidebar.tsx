
import { useState } from "react";
import { X } from "lucide-react";
import { useFilterStore } from "@/store";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterOptions } from "@/types";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  brands: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
}

const FilterSidebar = ({
  isOpen,
  onClose,
  categories,
  brands,
  sizes,
  colors,
}: FilterSidebarProps) => {
  const { filters, setFilters, resetFilters } = useFilterStore();
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);
  const [priceRange, setPriceRange] = useState<[number, number]>(filters.priceRange);

  // Update local state when a filter changes
  const handleFilterChange = (filterType: keyof FilterOptions, value: any) => {
    setLocalFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // Handle checkbox filters (categories, brands, sizes, colors)
  const handleCheckboxChange = (
    filterType: "categories" | "brands" | "sizes" | "colors",
    value: string
  ) => {
    const currentValues = localFilters[filterType];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    handleFilterChange(filterType, newValues);
  };

  // Apply filters and close sidebar
  const applyFilters = () => {
    setFilters({
      ...localFilters,
      priceRange,
    });
    onClose();
  };

  // Reset all filters
  const handleResetFilters = () => {
    resetFilters();
    setLocalFilters({
      categories: [],
      priceRange: [0, 1000],
      brands: [],
      sizes: [],
      colors: [],
    });
    setPriceRange([0, 1000]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20" 
        onClick={onClose}
      ></div>
      
      {/* Sidebar */}
      <div className="relative w-full max-w-xs bg-white h-full overflow-y-auto shadow-xl ml-auto animate-in slide-in-from-right">
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-medium">Filters</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        
        <div className="px-4 py-6 space-y-8">
          {/* Price Range */}
          <div>
            <h3 className="font-medium mb-4">Price Range</h3>
            <Slider
              defaultValue={priceRange}
              min={0}
              max={1000}
              step={10}
              onValueChange={(values) => setPriceRange(values as [number, number])}
              className="mb-6"
            />
            <div className="flex items-center justify-between text-sm">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="font-medium mb-4">Categories</h3>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={localFilters.categories.includes(category)}
                    onCheckedChange={() =>
                      handleCheckboxChange("categories", category)
                    }
                  />
                  <label
                    htmlFor={`category-${category}`}
                    className="text-sm capitalize cursor-pointer"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Brands */}
          <div>
            <h3 className="font-medium mb-4">Brands</h3>
            <div className="space-y-3">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={localFilters.brands.includes(brand)}
                    onCheckedChange={() =>
                      handleCheckboxChange("brands", brand)
                    }
                  />
                  <label
                    htmlFor={`brand-${brand}`}
                    className="text-sm capitalize cursor-pointer"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Sizes */}
          <div>
            <h3 className="font-medium mb-4">Sizes</h3>
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant="outline"
                  size="sm"
                  className={`text-sm ${
                    localFilters.sizes.includes(size) ? "bg-primary text-primary-foreground" : ""
                  }`}
                  onClick={() => handleCheckboxChange("sizes", size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Colors */}
          <div>
            <h3 className="font-medium mb-4">Colors</h3>
            <div className="flex flex-wrap gap-3">
              {colors.map((color) => (
                <div
                  key={color.name}
                  className={`h-8 w-8 rounded-full cursor-pointer border ${
                    localFilters.colors.includes(color.name) ? "ring-2 ring-offset-2 ring-black" : ""
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  onClick={() => handleCheckboxChange("colors", color.name)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="sticky bottom-0 bg-white border-t p-4 flex space-x-4">
          <Button variant="outline" className="flex-1" onClick={handleResetFilters}>
            Reset
          </Button>
          <Button className="flex-1" onClick={applyFilters}>
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
