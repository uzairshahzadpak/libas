"use client";

import { useEffect, useState } from "react";
import ProductCard from "../../../components/ProductCard";

export default function MaleCollection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch("/api/products");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch products.");
        }

        setProducts(data.products);
      } catch (error) {
        console.error("MALE PRODUCTS ERROR:", error);
        setError("Male products load nahi ho rahe.");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const maleProducts = products.filter(
    (product) => product.collection === "male"
  );

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#8B1E3F]" />

          <p className="mt-4 text-gray-600">
            Loading Male Collection...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-red-600">
            Something went wrong
          </h1>

          <p className="mt-3 text-gray-600">
            {error}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-10 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-[#8B1E3F]">
          Libas Collection
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Male Collection
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-gray-600">
          Discover stylish and modern outfits from our male
          collection.
        </p>
      </div>

      {maleProducts.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-semibold">
            No Male Products Found
          </h2>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {maleProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}
    </main>
  );
}