"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ProductDetailsProps {
  product: Product;
  addToCart: (size: string) => void;
}

export function ProductDetails({ product, addToCart }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError("Please select a size");
      return;
    }
    setError("");
    addToCart(selectedSize);
    toast.success("Added to cart", {
      description: `${product.title} - Size ${selectedSize}`,
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-12 flex-1">
      <div className="md:w-[580px]">
        <div className="relative w-full pb-[125%]">
          <Image
            src={product.imageURL}
            alt={product.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 580px"
            priority
          />
        </div>
      </div>

      <div className="md:w-[400px] space-y-6">
        <h1 className="text-[24px] font-normal text-[#222222]">
          {product.title}
        </h1>
        <div className="text-[24px] font-normal text-[#222222]">
          ${product.price.toFixed(2)}
        </div>

        <div className="space-y-6">
          <p className="text-[#888888] leading-relaxed text-[14px]">
            {product.description}
          </p>

          <div className="space-y-4">
            <div className="text-[#222222] text-[14px]">
              SIZE<span className="text-red-500 ml-1">*</span>
              {selectedSize && (
                <span className="ml-2 text-[#888888]">{selectedSize}</span>
              )}
            </div>
            <div className="flex gap-2">
              {product.sizeOptions.map((size) => (
                <button
                  key={size.id}
                  onClick={() => {
                    setSelectedSize(size.label);
                    setError("");
                  }}
                  className={cn(
                    "w-10 h-10 border text-[14px] transition-colors flex items-center justify-center",
                    selectedSize === size.label
                      ? "border-[#222222]"
                      : "border-[#CCCCCC] hover:border-[#222222]"
                  )}
                >
                  {size.label}
                </button>
              ))}
            </div>
            {error && <p className="text-[14px] text-red-500">{error}</p>}
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full h-[40px] border border-[#222222] text-[14px] font-normal hover:bg-[#F6F6F7] transition-colors uppercase"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}
