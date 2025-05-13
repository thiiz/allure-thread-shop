
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Heart, 
  ShoppingBag, 
  Check, 
  ChevronDown,
  ChevronUp, 
  ChevronRight,
  Truck
} from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useCartStore, useWishlistStore } from "@/store";
import Layout from "@/components/layout/Layout";
import ProductGrid from "@/components/products/ProductGrid";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

  const [mainImage, setMainImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-8">We couldn't find the product you're looking for.</p>
          <Button asChild>
            <Link to="/">Return to Homepage</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const toggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const addToCart = () => {
    if (!selectedSize || !selectedColor) {
      return; // Require size and color selection
    }
    addItem({
      product,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const toggleSection = (section: string) => {
    setExpandedSections((current) =>
      current.includes(section)
        ? current.filter((s) => s !== section)
        : [...current, section]
    );
  };

  const isSectionExpanded = (section: string) => {
    return expandedSections.includes(section);
  };

  // Recommended products (just grab some others from our data)
  const recommendedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:underline">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link to={`/category/${product.category}`} className="hover:underline capitalize">
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900 truncate">{product.name}</span>
        </nav>

        {/* Back Button (mobile only) */}
        <div className="lg:hidden mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden">
              <img
                src={product.images[mainImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={cn(
                    "aspect-square cursor-pointer border-2",
                    mainImage === index
                      ? "border-black"
                      : "border-transparent hover:border-gray-200"
                  )}
                  onClick={() => setMainImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} - View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <span
                      key={i}
                      className={`text-${
                        i < Math.round(product.rating || 0)
                          ? "yellow-500"
                          : "gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <p className="text-2xl font-bold mb-6">{formatPrice(product.price)}</p>

            <p className="text-gray-600 mb-8">{product.description}</p>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">
                Color: <span className="text-gray-600">{selectedColor || "Select a color"}</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <div
                    key={color.name}
                    className={cn(
                      "h-10 w-10 rounded-full cursor-pointer border",
                      selectedColor === color.name
                        ? "ring-2 ring-offset-2 ring-black"
                        : ""
                    )}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    onClick={() => setSelectedColor(color.name)}
                  ></div>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">
                  Size: <span className="text-gray-600">{selectedSize || "Select a size"}</span>
                </h3>
                <Button variant="link" className="text-sm p-0 h-auto">
                  Size Guide
                </Button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant="outline"
                    className={selectedSize === size ? "bg-black text-white" : ""}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center mb-8">
              <span className="font-medium mr-4">Quantity:</span>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-none"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-none"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <Button 
                className="flex-1" 
                size="lg"
                onClick={addToCart}
                disabled={!selectedSize || !selectedColor}
              >
                <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "h-12 w-12",
                  inWishlist ? "text-red-500" : ""
                )}
                onClick={toggleWishlist}
              >
                <Heart className={cn("h-5 w-5", inWishlist && "fill-current")} />
                <span className="sr-only">
                  {inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                </span>
              </Button>
            </div>

            {/* Delivery Info */}
            <div className="flex items-start gap-3 text-sm text-gray-600 mb-6 p-4 bg-gray-50 rounded-lg">
              <Truck className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium text-black">Free Shipping & Returns</p>
                <p>Free standard shipping on orders over $100</p>
              </div>
            </div>

            {/* Accordion Sections */}
            <div>
              {/* Details */}
              <div className="border-t py-4">
                <button
                  className="flex justify-between items-center w-full text-left font-medium"
                  onClick={() => toggleSection("details")}
                >
                  Product Details
                  {isSectionExpanded("details") ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                {isSectionExpanded("details") && (
                  <div className="mt-4 text-gray-600">
                    <p className="mb-3">{product.description}</p>
                    {product.material && (
                      <p className="mb-2">
                        <strong>Material:</strong> {product.material}
                      </p>
                    )}
                    {product.features && (
                      <div className="mb-2">
                        <strong>Features:</strong>
                        <ul className="list-disc list-inside mt-1">
                          {product.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Sizing */}
              <div className="border-t py-4">
                <button
                  className="flex justify-between items-center w-full text-left font-medium"
                  onClick={() => toggleSection("sizing")}
                >
                  Size & Fit
                  {isSectionExpanded("sizing") ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                {isSectionExpanded("sizing") && (
                  <div className="mt-4 text-gray-600">
                    <p>
                      The model is 6'1" / 185cm and is wearing a size M.
                    </p>
                    <p className="mt-2">
                      Fits true to size. We recommend ordering your usual size.
                    </p>
                  </div>
                )}
              </div>

              {/* Shipping */}
              <div className="border-t py-4">
                <button
                  className="flex justify-between items-center w-full text-left font-medium"
                  onClick={() => toggleSection("shipping")}
                >
                  Shipping & Returns
                  {isSectionExpanded("shipping") ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                {isSectionExpanded("shipping") && (
                  <div className="mt-4 text-gray-600">
                    <p className="mb-3">
                      Free standard shipping on orders over $100. Delivery in 3-5 business days.
                    </p>
                    <p>
                      Free returns within 30 days of purchase. See our{" "}
                      <Link to="/returns" className="text-black underline">
                        return policy
                      </Link>{" "}
                      for more details.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews & Details Tabs (Desktop) */}
        <div className="hidden lg:block mt-16">
          <Tabs defaultValue="reviews">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto">
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-black"
              >
                Reviews ({product.reviews})
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-black"
              >
                Complete Details
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-black"
              >
                Shipping & Returns
              </TabsTrigger>
            </TabsList>
            <TabsContent value="reviews" className="py-6">
              <h3 className="text-lg font-bold mb-4">Customer Reviews</h3>
              <p className="text-gray-600">
                Be the first to review this product!
              </p>
            </TabsContent>
            <TabsContent value="details" className="py-6">
              <h3 className="text-lg font-bold mb-4">Product Details</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              {product.material && (
                <p className="mb-3">
                  <strong>Material:</strong> {product.material}
                </p>
              )}
              {product.features && (
                <div className="mb-3">
                  <strong>Features:</strong>
                  <ul className="list-disc list-inside mt-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-gray-600">{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <strong>Tags:</strong>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="py-6">
              <h3 className="text-lg font-bold mb-4">Shipping & Returns</h3>
              <div className="text-gray-600">
                <p className="mb-4">
                  Free standard shipping on orders over $100. Delivery in 3-5 business days.
                </p>
                <h4 className="font-bold mt-6 mb-2">Return Policy</h4>
                <p className="mb-4">
                  We offer free returns within 30 days of purchase. Items must be unworn,
                  unwashed, and with the original tags attached.
                </p>
                <p>
                  For more information, please visit our{" "}
                  <Link to="/returns" className="text-black underline">
                    complete return policy
                  </Link>.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Recommended Products */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You might also like</h2>
          <ProductGrid products={recommendedProducts} />
        </section>
      </div>
    </Layout>
  );
};

export default ProductDetail;
