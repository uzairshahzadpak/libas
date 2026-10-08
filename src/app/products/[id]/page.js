"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCart } from "../../../context/CartContext";

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `/api/products/${params.id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch product."
          );
        }

        setProduct(data.product);

        if (data.product.sizes?.length > 0) {
          setSelectedSize(data.product.sizes[0]);
        }
      } catch (error) {
        console.error("PRODUCT DETAIL ERROR:", error);

        setError(
          error.message || "Product load nahi ho raha."
        );
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      getProduct();
    }
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product || !selectedSize) {
      return;
    }

    addToCart(product, selectedSize);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#8B1E3F]" />

          <p className="mt-4 text-gray-600">
            Loading Product...
          </p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-red-600">
            Product Not Found
          </h1>

          <p className="mt-3 text-gray-600">
            {error || "This product does not exist."}
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-full bg-[#8B1E3F] px-8 py-3 font-medium text-white hover:bg-[#6f1832]"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:text-[#8B1E3F]">
          Home
        </Link>

        <span className="mx-2">/</span>

        <span>{product.name}</span>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Product Image */}
        <div className="overflow-hidden rounded-3xl bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-[500px] w-full object-cover md:h-[650px]"
          />
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#8B1E3F]">
            {product.category} Collection
          </p>

          <h1 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
            {product.name}
          </h1>

          <p className="mt-5 text-2xl font-bold text-[#8B1E3F]">
            Rs. {product.price.toLocaleString()}
          </p>

          <div className="my-8 h-px bg-gray-200" />

          <div>
            <h2 className="text-lg font-semibold">
              Product Description
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              {product.description ||
                "A stylish and comfortable Libas outfit designed with quality, elegance and modern fashion in mind."}
            </p>
          </div>

          <div className="mt-8">
            <label className="mb-3 block text-sm font-semibold">
              Select Size
            </label>

            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#8B1E3F]"
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
            className="mt-6 w-full rounded-full bg-[#8B1E3F] py-4 font-semibold text-white transition hover:bg-[#6f1832]"
          >
            {added ? "✓ Added to Cart" : "Add to Cart"}
          </button>

          {added && (
            <Link
              href="/cart"
              className="mt-4 text-center text-sm font-medium text-[#8B1E3F] hover:underline"
            >
              View Cart →
            </Link>
          )}

          <div className="mt-8 rounded-2xl bg-gray-50 p-5">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-sm font-semibold">
                  Category
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {product.category}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Collection
                </p>
                <p className="mt-1 text-sm text-gray-500 capitalize">
                  {product.collection}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Sizes
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {product.sizes?.join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}