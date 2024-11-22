"use client";

import { useState, useEffect } from "react";
import { ProductDetails } from "../components/ProductDetails";
import { MiniCart } from "../components/MiniCart";
import { Product, CartItem } from "@/types";
import { fetchProduct } from "@/utils/api";

export default function Home() {
  const [product, setProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProduct();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load product");
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, []);

  const addToCart = (size: string) => {
    if (product) {
      const newItem: CartItem = { ...product, size, quantity: 1 };
      setCart((prevCart) => {
        const existingItem = prevCart.find(
          (item) => item.id === product.id && item.size === size
        );
        if (existingItem) {
          return prevCart.map((item) =>
            item.id === product.id && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevCart, newItem];
      });
    }
  };

  const updateQuantity = (id: number, size: string, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: Math.max(0, newQuantity) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-8">
      <header className="flex justify-end mb-8">
        <button
          onClick={toggleCart}
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          My Cart ( {cart.reduce((sum, item) => sum + item.quantity, 0)} )
        </button>
      </header>
      <main className="flex flex-col md:flex-row gap-12">
        {product && <ProductDetails product={product} addToCart={addToCart} />}

        {/* Cart Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 transition-opacity z-40 ${
            isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={toggleCart}
        />
        <div
          className={`fixed top-0 right-0 h-full w-full md:w-[350px] bg-white transform transition-transform duration-300 z-50 ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <MiniCart
            cart={cart}
            updateQuantity={updateQuantity}
            onClose={toggleCart}
          />
        </div>
      </main>
    </div>
  );
}
