
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Shop */}
          <div>
            <h3 className="font-medium text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/men" className="text-gray-600 hover:text-gray-900">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/category/women" className="text-gray-600 hover:text-gray-900">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/category/accessories" className="text-gray-600 hover:text-gray-900">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/category/shoes" className="text-gray-600 hover:text-gray-900">
                  Shoes
                </Link>
              </li>
              <li>
                <Link to="/sale" className="text-gray-600 hover:text-gray-900">
                  Sale
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="text-gray-600 hover:text-gray-900">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Information */}
          <div>
            <h3 className="font-medium text-lg mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-gray-900">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-gray-900">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-gray-900">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="font-medium text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping" className="text-gray-600 hover:text-gray-900">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/secure-payment" className="text-gray-600 hover:text-gray-900">
                  Secure Payment
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-gray-600 hover:text-gray-900">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-medium text-lg mb-4">Stay Updated</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter for exclusive deals and updates.
            </p>
            <div className="flex gap-2">
              <Input 
                placeholder="Your email" 
                type="email"
                className="bg-white"
              />
              <Button>Subscribe</Button>
            </div>
            <div className="flex gap-4 mt-6">
              <a href="#" className="hover:text-primary">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="hover:text-primary">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="hover:text-primary">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © {currentYear} SHOPWISE. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/brands/cc-visa.svg" alt="Visa" className="h-6" />
              <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/brands/cc-mastercard.svg" alt="Mastercard" className="h-6" />
              <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/brands/cc-paypal.svg" alt="PayPal" className="h-6" />
              <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/brands/cc-apple-pay.svg" alt="Apple Pay" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
