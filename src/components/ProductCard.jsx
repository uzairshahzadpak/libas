"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.[0] || ""
  );

  const { addToCart } = useCart();

  const productId = String(product._id || product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      return;
    }

    addToCart(product, selectedSize);
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/products/${productId}`}>
        <div className="relative h-80 overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-[#8B1E3F]">
          {product.category}
        </p>

        <Link href={`/products/${productId}`}>
          <h3 className="mt-2 text-lg font-semibold text-gray-900 hover:text-[#8B1E3F]">
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 text-lg font-bold text-[#8B1E3F]">
          Rs. {product.price.toLocaleString()}
        </p>

        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Select Size
          </label>

          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#8B1E3F]"
          >
            {product.sizes?.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-4 w-full rounded-full bg-[#8B1E3F] py-3 font-medium text-white transition hover:bg-[#6f1832]"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}