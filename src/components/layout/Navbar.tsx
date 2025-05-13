
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  User, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore } from "@/store";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const cartItemsCount = useCartStore((state) => state.getTotalItems());

  const navLinks = [
    { label: "Men", href: "/category/men" },
    { label: "Women", href: "/category/women" },
    { label: "Accessories", href: "/category/accessories" },
    { label: "Shoes", href: "/category/shoes" },
    { label: "Sale", href: "/sale" },
  ];

  return (
    <header className="border-b sticky top-0 bg-white z-40">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block px-2 py-1 text-lg hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <div className="flex-1 flex items-center lg:flex-initial">
          <Link to="/" className="text-xl font-bold">
            SHOPWISE
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 mx-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm hover:text-primary relative group py-6"
            >
              <span className="flex items-center gap-1">
                {link.label}
                {link.label !== "Sale" && <ChevronDown className="h-4 w-4" />}
              </span>
              {link.label !== "Sale" && (
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform" />
              )}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(!searchOpen)}
            className="relative"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          
          <Link to="/account">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>
          
          <Link to="/wishlist">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Button>
          </Link>
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b p-4 shadow-md z-50 animate-fadeIn">
          <div className="container mx-auto flex items-center">
            <Input
              placeholder="Search for products..."
              className="flex-1"
              autoFocus
            />
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close search</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
