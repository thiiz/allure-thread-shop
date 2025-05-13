
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store";
import Layout from "@/components/layout/Layout";

const Cart = () => {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (
    productId: string,
    quantity: number,
    size?: string,
    color?: string
  ) => {
    if (quantity < 1) return;
    updateQuantity(productId, quantity, size, color);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // In a real implementation, this would redirect to a checkout page or show a checkout modal
    setTimeout(() => {
      setIsCheckingOut(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
            <nav className="flex text-sm text-gray-500">
              <Link to="/" className="hover:underline">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-gray-900">Cart</span>
            </nav>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-6 flex justify-center">
                <ShoppingBag className="h-16 w-16 text-gray-300" />
              </div>
              <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button asChild>
                <Link to="/">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      className="flex gap-4 py-4 border-b"
                    >
                      {/* Product Image */}
                      <div className="w-24 h-24 flex-shrink-0">
                        <Link to={`/product/${item.product.id}`}>
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </Link>
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <div>
                            <Link
                              to={`/product/${item.product.id}`}
                              className="font-medium hover:underline"
                            >
                              {item.product.name}
                            </Link>
                            <div className="text-sm text-gray-600 mt-1">
                              {item.color && (
                                <span className="mr-3">Color: {item.color}</span>
                              )}
                              {item.size && <span>Size: {item.size}</span>}
                            </div>
                            <div className="text-sm font-medium mt-1">
                              {formatPrice(item.product.price)}
                            </div>
                          </div>

                          <div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                removeItem(
                                  item.product.id,
                                  item.size,
                                  item.color
                                )
                              }
                              className="h-8 w-8 text-gray-500"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center mt-4">
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.quantity - 1,
                                  item.size,
                                  item.color
                                )
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-10 text-center">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.quantity + 1,
                                  item.size,
                                  item.color
                                )
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="ml-auto font-medium">
                            {formatPrice(item.product.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 p-6 rounded-lg h-fit">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>
                      {getTotalPrice() >= 100 ? "Free" : formatPrice(10)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>
                      {formatPrice(getTotalPrice() >= 100 ? getTotalPrice() : getTotalPrice() + 10)}
                    </span>
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    size="lg"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? "Processing..." : "Checkout"}
                  </Button>
                  <div className="text-center mt-4">
                    <p className="text-xs text-gray-500 mb-2">
                      Free shipping on orders over $100
                    </p>
                    <Link
                      to="/"
                      className="text-sm text-gray-600 hover:underline inline-flex items-center"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
