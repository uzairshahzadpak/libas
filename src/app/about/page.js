
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function About() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-white">

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#F5E9E5] px-4 py-24">

        {/* Decorative Background */}
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/40 blur-3xl" />

        <div className="absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-[#8B1E3F]/10 blur-3xl" />

        <div
          className={`relative mx-auto max-w-4xl text-center transition-all duration-1000 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8B1E3F]">
            Welcome to Libas
          </p>

          <h1 className="mt-4 text-4xl font-bold text-gray-900 sm:text-5xl">
            About Us
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Libas is a modern clothing brand created to bring stylish,
            comfortable, and quality fashion to everyone.
          </p>

          {/* Animated Line */}
          <div
            className={`mx-auto mt-8 h-1 rounded-full bg-[#8B1E3F] transition-all duration-1000 ${
              visible ? "w-20" : "w-0"
            }`}
          />

        </div>
      </section>

      {/* Our Story */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-5xl">

          <div className="grid gap-12 md:grid-cols-2 md:items-center">

            {/* Story Text */}
            <div
              className={`transition-all duration-1000 ${
                visible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >

              <p className="text-sm font-semibold uppercase tracking-wider text-[#8B1E3F]">
                Our Story
              </p>

              <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                Fashion Made for You
              </h2>

              <p className="mt-5 leading-7 text-gray-600">
                At Libas, we believe that clothing is more than just what
                you wear. It is a way to express your personality and
                confidence.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                Our collection brings together modern styles, comfortable
                designs, and carefully selected products for women, men,
                and kids.
              </p>

            </div>

            {/* Why Libas */}
            <div
              className={`group relative overflow-hidden rounded-3xl bg-[#F5E9E5] p-8 transition-all duration-1000 hover:-translate-y-2 hover:shadow-xl ${
                visible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >

              {/* Decorative Circle */}
              <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/50 transition-transform duration-700 group-hover:scale-150" />

              <div className="relative">

                <h3 className="text-2xl font-bold text-gray-900">
                  Why Libas?
                </h3>

                <div className="mt-6 space-y-6">

                  {/* Quality */}
                  <div className="group/item rounded-2xl bg-white/50 p-4 transition-all duration-300 hover:-translate-x-1 hover:bg-white hover:shadow-sm">

                    <h4 className="font-semibold text-[#8B1E3F]">
                      Quality
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      We focus on products that offer comfort and quality.
                    </p>

                  </div>

                  {/* Style */}
                  <div className="group/item rounded-2xl bg-white/50 p-4 transition-all duration-300 hover:-translate-x-1 hover:bg-white hover:shadow-sm">

                    <h4 className="font-semibold text-[#8B1E3F]">
                      Style
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Discover styles suitable for everyday wear and special
                      occasions.
                    </p>

                  </div>

                  {/* Customer First */}
                  <div className="group/item rounded-2xl bg-white/50 p-4 transition-all duration-300 hover:-translate-x-1 hover:bg-white hover:shadow-sm">

                    <h4 className="font-semibold text-[#8B1E3F]">
                      Customer First
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      We want every Libas customer to have a simple and
                      enjoyable shopping experience.
                    </p>

                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="bg-gray-50 px-4 py-20">
        <div className="mx-auto max-w-5xl text-center">

          <div
            className={`transition-all duration-1000 ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          >

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8B1E3F]">
              Explore
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Our Collections
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Explore our collections and find something that matches your
              style.
            </p>

          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">

            {/* Female */}
            <Link
              href="/collections/female"
              className={`group rounded-3xl bg-white p-8 shadow-sm transition-all duration-700 hover:-translate-y-3 hover:shadow-xl ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F5E9E5] text-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                👗
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900 transition-colors group-hover:text-[#8B1E3F]">
                Female
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Elegant and stylish clothing for women.
              </p>

              <span className="mt-5 inline-block text-sm font-semibold text-[#8B1E3F] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                Explore Collection →
              </span>

            </Link>

            {/* Male */}
            <Link
              href="/collections/male"
              className={`group rounded-3xl bg-white p-8 shadow-sm transition-all duration-700 hover:-translate-y-3 hover:shadow-xl ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "550ms" }}
            >

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F5E9E5] text-2xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6">
                👔
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900 transition-colors group-hover:text-[#8B1E3F]">
                Male
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Modern and comfortable clothing for men.
              </p>

              <span className="mt-5 inline-block text-sm font-semibold text-[#8B1E3F] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                Explore Collection →
              </span>

            </Link>

            {/* Kids */}
            <Link
              href="/collections/kids"
              className={`group rounded-3xl bg-white p-8 shadow-sm transition-all duration-700 hover:-translate-y-3 hover:shadow-xl ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "700ms" }}
            >

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F5E9E5] text-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                🧸
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900 transition-colors group-hover:text-[#8B1E3F]">
                Kids
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Comfortable and stylish choices for kids.
              </p>

              <span className="mt-5 inline-block text-sm font-semibold text-[#8B1E3F] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                Explore Collection →
              </span>

            </Link>

          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden px-4 py-20 text-center">

        {/* Background Decoration */}
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F5E9E5] opacity-60 blur-3xl" />

        <div
          className={`relative mx-auto max-w-3xl transition-all duration-1000 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "800ms" }}
        >

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#8B1E3F] text-2xl text-white shadow-lg transition-transform duration-500 hover:scale-110">
            ✨
          </div>

          <h2 className="mt-6 text-3xl font-bold text-gray-900 sm:text-4xl">
            Discover Your Style
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            Explore the Libas collection and find your next favorite outfit.
          </p>

          <Link
            href="/"
            className="mt-8 inline-block rounded-full bg-[#8B1E3F] px-8 py-3.5 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#6f1832] hover:shadow-xl"
          >
            Shop Now
          </Link>

        </div>

      </section>

    </main>
  );
}

