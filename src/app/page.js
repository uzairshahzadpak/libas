"use client";

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Home() {
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
        console.error("GET PRODUCTS ERROR:", error);

        setError("Products load nahi ho rahe.");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const femaleProducts = products.filter(
    (product) => product.collection === "female"
  );

  const maleProducts = products.filter(
    (product) => product.collection === "male"
  );

  const kidsProducts = products.filter(
    (product) => product.collection === "kids"
  );

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#8B1E3F]"></div>

          <p className="mt-4 text-gray-600">
            Loading Libas products...
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
    <main>
      

      <section className="relative overflow-hidden bg-[#F5E9E5]">
        <div className="mx-auto grid min-h-[600px] max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2">


          <div className="text-center md:text-left">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#8B1E3F]">
              Discover Your Style
            </p>

            <h1 className="text-5xl font-bold leading-tight text-gray-900 md:text-7xl">
              Fashion That
              <span className="block text-[#8B1E3F]">
                Defines You
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-lg text-gray-600 md:mx-0">
              Explore elegant and modern fashion collections
              for women, men and kids.
            </p>

            <a
              href="#collections"
              className="mt-8 inline-block rounded-full bg-[#8B1E3F] px-8 py-3 font-medium text-white transition hover:bg-[#6f1832]"
            >
              Explore Collection
            </a>
          </div>


          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80"
              alt="Libas Fashion"
              className="h-[520px] w-full rounded-3xl object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      

      <section
        id="collections"
        className="mx-auto max-w-7xl px-6 py-20"
      >

        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8B1E3F]">
            Our Collections
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Explore Libas
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            Find the perfect style for every occasion.
          </p>
        </div>

        
        <div
          id="female"
          className="mb-20 scroll-mt-28"
        >
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-[#8B1E3F]">
                Collection 01
              </p>

              <h2 className="mt-1 text-3xl font-bold">
                Female Collection
              </h2>
            </div>

            <a
              href="/collections/female"
              className="hidden text-sm font-medium text-[#8B1E3F] sm:block"
            >
              View All →
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {femaleProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        </div>

        

        <div
          id="male"
          className="mb-20 scroll-mt-28"
        >
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-[#8B1E3F]">
                Collection 02
              </p>

              <h2 className="mt-1 text-3xl font-bold">
                Male Collection
              </h2>
            </div>

            <a
              href="/collections/male"
              className="hidden text-sm font-medium text-[#8B1E3F] sm:block"
            >
              View All →
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {maleProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        </div>

        

        <div
          id="kids"
          className="scroll-mt-28"
        >
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-[#8B1E3F]">
                Collection 03
              </p>

              <h2 className="mt-1 text-3xl font-bold">
                Kids Collection
              </h2>
            </div>

            <a
              href="/collections/kids"
              className="hidden text-sm font-medium text-[#8B1E3F] sm:block"
            >
              View All →
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {kidsProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}