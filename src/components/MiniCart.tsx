"use client";

import { CartItem } from "@/types";
import Image from "next/image";
import { X } from "lucide-react";
import { toast } from "sonner";

interface MiniCartProps {
  cart: CartItem[];
  updateQuantity: (id: number, size: string, quantity: number) => void;
  onClose?: () => void;
}

export function MiniCart({ cart, updateQuantity, onClose }: MiniCartProps) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleQuantityUpdate = (
    id: number,
    size: string,
    newQuantity: number,
    title: string
  ) => {
    updateQuantity(id, size, newQuantity);
    if (newQuantity === 0) {
      toast("Item removed from cart", {
        description: `${title} - Size ${size}`,
      });
    }
  };

  return (
    <div className="w-full md:w-[350px] bg-white h-full flex flex-col">
      {/* Header with close button */}
      <div className="p-4 border-b border-[#CCCCCC] flex justify-between items-center">
        <h2 className="text-[14px] text-[#222222]">My Cart ({totalItems})</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#F6F6F7] rounded-full"
            aria-label="Close cart"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Cart items or empty state */}
      {cart.length === 0 ? (
        <div className="flex-1 flex items-center justify-center p-6">
          <p className="text-[14px] text-[#888888]">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-auto p-6">
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex gap-4 py-4 border-b border-[#CCCCCC]"
              >
                <div className="relative w-[80px] h-[100px]">
                  <Image
                    src={item.imageURL}
                    alt={item.title}
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-[14px] text-[#222222]">{item.title}</p>
                      <p className="text-[12px] text-[#888888] mt-1">
                        {item.quantity}x{" "}
                        <span className="ml-1">${item.price.toFixed(2)}</span>
                      </p>
                      <p className="text-[12px] text-[#888888]">
                        Size: {item.size}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      className="w-5 h-5 border border-[#CCCCCC] flex items-center justify-center text-xs"
                      onClick={() =>
                        handleQuantityUpdate(
                          item.id,
                          item.size,
                          item.quantity - 1,
                          item.title
                        )
                      }
                    >
                      -
                    </button>
                    <span className="text-xs">{item.quantity}</span>
                    <button
                      className="w-5 h-5 border border-[#CCCCCC] flex items-center justify-center text-xs"
                      onClick={() =>
                        handleQuantityUpdate(
                          item.id,
                          item.size,
                          item.quantity + 1,
                          item.title
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer with total */}
          <div className="p-4 border-t border-[#CCCCCC]">
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-[#222222]">Total</span>
              <span className="text-[14px] text-[#222222]">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
