
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "../../components/ProductCard";

export const dynamic = 'force-dynamic';

function SearchContent() {
  const searchParams = useSearchParams();

  const query = searchParams.get("q") || "";
  const searchText = query.toLowerCase().trim();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/products");
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch products.");
        }
        setProducts(data.products);
      } catch (error) {
        console.error("SEARCH PRODUCTS ERROR:", error);
        setError("Products load nahi ho rahe.");
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const searchResults = products.filter((product) => {
    const name = (product.name || "").toLowerCase();
    const category = (product.category || "").toLowerCase();
    const description = (product.description || "").toLowerCase();
    return (
      name.includes(searchText) ||
      category.includes(searchText) ||
      description.includes(searchText)
    );
  });

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#8B1E3F]" />
          <p className="mt-4 text-gray-600">Searching Libas Products...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-red-600">Something went wrong</h1>
          <p className="mt-3 text-gray-600">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-10">
        <p className="text-sm font-medium uppercase tracking-widest text-[#8B1E3F]">Libas Search</p>
        <h1 className="mt-2 text-3xl font-bold">{query? `Results for "${query}"` : "Search Products"}</h1>
        {query && (
          <p className="mt-2 text-gray-600">
            {searchResults.length} product{searchResults.length!== 1? "s" : ""} found
          </p>
        )}
      </div>

      {!query? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <div className="text-5xl">🔍</div>
          <h2 className="mt-5 text-xl font-semibold">Search for a product</h2>
          <p className="mt-2 text-gray-500">Try searching for Black, Kurta, Dress, Kids, Female or Male.</p>
        </div>
      ) : searchResults.length === 0? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <div className="text-5xl">😔</div>
          <h2 className="mt-5 text-xl font-semibold">No Products Found</h2>
          <p className="mt-2 text-gray-500">No product found for {query}.</p>
          <p className="mt-4 text-sm text-gray-400">Try another product name or category.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {searchResults.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#8B1E3F]" />
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </main>
      }
    >
      <SearchContent />
    </Suspense>
  );
}