
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/store";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  const { addItem, removeItem, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  const handleMouseEnter = () => {
    if (product.images.length > 1) {
      setImageIndex(1);
    }
  };

  const handleMouseLeave = () => {
    setImageIndex(0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="group relative">
      <Link
        to={`/product/${product.id}`}
        className="block aspect-product-card relative overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={product.images[imageIndex]}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-2 right-2 rounded-full bg-white shadow-sm hover:bg-white",
            inWishlist ? "text-red-500" : "text-gray-600"
          )}
          onClick={toggleWishlist}
        >
          <Heart className={cn("h-5 w-5", inWishlist && "fill-current")} />
          <span className="sr-only">Add to wishlist</span>
        </Button>
      </Link>
      <div className="mt-4">
        <h3 className="text-sm font-medium">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="mt-1 flex justify-between items-center">
          <p className="text-sm font-medium">{formatPrice(product.price)}</p>
          {product.rating && (
            <div className="flex items-center">
              <span className="text-yellow-500">★</span>
              <span className="text-xs text-gray-600 ml-1">
                {product.rating} ({product.reviews})
              </span>
            </div>
          )}
        </div>
        <div className="mt-2 flex gap-1">
          {product.colors.slice(0, 3).map((color) => (
            <div
              key={color.name}
              className="h-3 w-3 rounded-full border"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            ></div>
          ))}
          {product.colors.length > 3 && (
            <div className="text-xs text-gray-500">+{product.colors.length - 3}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
