
import { useState } from "react";
import { Link } from "react-router-dom";
import { Filter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products, categories } from "@/data/products";
import Layout from "@/components/layout/Layout";
import ProductGrid from "@/components/products/ProductGrid";
import ProductSort from "@/components/products/ProductSort";
import FilterSidebar from "@/components/products/FilterSidebar";

const Index = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  // Extract unique values for filters
  const uniqueBrands = [...new Set(products.map((p) => p.brand))];
  const uniqueSizes = [...new Set(products.flatMap((p) => p.sizes))];
  const uniqueColors = products.flatMap((p) => p.colors).filter(
    (color, index, self) =>
      index === self.findIndex((c) => c.name === color.name)
  );
  const uniqueCategories = [...new Set(products.map((p) => p.category))];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&auto=format&fit=crop&q=60"
            alt="Hero"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center container mx-auto px-4">
          <div className="max-w-xl animate-slideUp">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Autumn/Winter Collection 2025
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Discover the latest trends and timeless classics for the upcoming season.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/category/men">Shop Men</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white hover:text-black">
                <Link to="/category/women">Shop Women</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding">
        <div className="product-container">
          <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="aspect-[3/4]">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {category.name}
                      </h3>
                      <div className="flex items-center text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Shop now</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="section-padding bg-gray-50">
        <div className="product-container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">New Arrivals</h2>
            <Link
              to="/new-arrivals"
              className="text-sm font-medium flex items-center hover:underline"
            >
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="flex justify-between items-center mb-6">
            <Button
              variant="outline"
              onClick={() => setFilterOpen(true)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <ProductSort />
          </div>

          <ProductGrid products={products.slice(0, 8)} />

          <FilterSidebar
            isOpen={filterOpen}
            onClose={() => setFilterOpen(false)}
            categories={uniqueCategories}
            brands={uniqueBrands}
            sizes={uniqueSizes}
            colors={uniqueColors}
          />
        </div>
      </section>

      {/* Featured Section */}
      <section className="section-padding">
        <div className="product-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1588099768531-a72d4a198538?w=800&auto=format&fit=crop&q=60"
                alt="Featured Collection"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center p-6 bg-black/30">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Sustainable Collection
                  </h3>
                  <p className="text-white mb-4">
                    Eco-friendly fashion that doesn't compromise on style.
                  </p>
                  <Button asChild variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black">
                    <Link to="/sustainable-collection">Discover</Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop&q=60"
                alt="Limited Edition"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center p-6 bg-black/30">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Limited Edition
                  </h3>
                  <p className="text-white mb-4">
                    Exclusive pieces you won't find anywhere else.
                  </p>
                  <Button asChild variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black">
                    <Link to="/limited-edition">Shop Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-100 py-16">
        <div className="product-container">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
            <p className="text-gray-600 mb-6">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 border rounded-lg px-4 py-2"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
