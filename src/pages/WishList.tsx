
import { Link } from "react-router-dom";
import { ChevronRight, Heart, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlistStore, useCartStore } from "@/store";
import Layout from "@/components/layout/Layout";

const WishList = () => {
  const { items, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handleAddToCart = (productId: string) => {
    const product = items.find((item) => item.id === productId);
    if (product) {
      // Use first available size and color for simplicity
      // In a real implementation, user should select these
      addItem({
        product,
        quantity: 1,
        size: product.sizes[0],
        color: product.colors[0].name,
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>
            <nav className="flex text-sm text-gray-500">
              <Link to="/" className="hover:underline">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-gray-900">Wishlist</span>
            </nav>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-6 flex justify-center">
                <Heart className="h-16 w-16 text-gray-300" />
              </div>
              <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-8">
                Save your favorite items to make them easier to find later.
              </p>
              <Button asChild>
                <Link to="/">Discover Products</Link>
              </Button>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border p-4 rounded-lg relative group"
                  >
                    {/* Product Image */}
                    <Link to={`/product/${item.id}`} className="w-24 h-24 flex-shrink-0">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>

                      <Link
                        to={`/product/${item.id}`}
                        className="font-medium hover:underline"
                      >
                        {item.name}
                      </Link>
                      <div className="text-sm text-gray-600 mt-1">
                        {item.brand}
                      </div>
                      <div className="font-medium mt-1">{formatPrice(item.price)}</div>

                      <div className="flex items-center mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-8"
                          onClick={() => handleAddToCart(item.id)}
                        >
                          <ShoppingBag className="h-3 w-3 mr-1" /> Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-between">
                <Button variant="outline" asChild>
                  <Link to="/">Continue Shopping</Link>
                </Button>
                <Button variant="destructive" onClick={() => items.forEach(item => removeItem(item.id))}>
                  Clear Wishlist
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default WishList;
