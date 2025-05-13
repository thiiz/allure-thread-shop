
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Filter, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import Layout from "@/components/layout/Layout";
import ProductGrid from "@/components/products/ProductGrid";
import ProductSort from "@/components/products/ProductSort";
import FilterSidebar from "@/components/products/FilterSidebar";
import { useFilterStore } from "@/store";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { filters, sortOption } = useFilterStore();

  // Filter products by category
  const filteredProducts = products.filter((product) => 
    product.category === category
  );

  // Apply additional filters
  const applyFilters = () => {
    return filteredProducts.filter((product) => {
      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }
      
      // Size filter
      if (filters.sizes.length > 0 && !product.sizes.some(size => filters.sizes.includes(size))) {
        return false;
      }
      
      // Color filter
      if (filters.colors.length > 0 && !product.colors.some(color => filters.colors.includes(color.name))) {
        return false;
      }
      
      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }
      
      return true;
    });
  };

  // Apply sorting
  const applySorting = (products) => {
    return [...products].sort((a, b) => {
      switch (sortOption) {
        case 'price-low-to-high':
          return a.price - b.price;
        case 'price-high-to-low':
          return b.price - a.price;
        case 'popularity':
          return (b.reviews || 0) - (a.reviews || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  };

  // Get unique values for filters
  const uniqueBrands = [...new Set(filteredProducts.map((p) => p.brand))];
  const uniqueSizes = [...new Set(filteredProducts.flatMap((p) => p.sizes))];
  const uniqueColors = filteredProducts.flatMap((p) => p.colors).filter(
    (color, index, self) =>
      index === self.findIndex((c) => c.name === color.name)
  );
  const uniqueCategories = [...new Set(products.map((p) => p.category))];

  const finalProducts = applySorting(applyFilters());

  // Simulate loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [category, filters, sortOption]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900 capitalize">{category}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold capitalize mb-2">{category}</h1>
          <p className="text-gray-600">
            Discover our latest {category} collection
          </p>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <ProductSort />
        </div>

        {/* Products */}
        <ProductGrid products={finalProducts} loading={loading} />

        {/* Filter Sidebar */}
        <FilterSidebar
          isOpen={filterOpen}
          onClose={() => setFilterOpen(false)}
          categories={uniqueCategories}
          brands={uniqueBrands}
          sizes={uniqueSizes}
          colors={uniqueColors}
        />
      </div>
    </Layout>
  );
};

export default CategoryPage;
