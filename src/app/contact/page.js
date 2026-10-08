


"use client";

import { useEffect, useState } from "react";

export default function Contact() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-white">

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#F5E9E5] px-4 py-24">

        {/* Decorative Circles */}
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-[#8B1E3F]/10 blur-3xl" />

        <div
          className={`relative mx-auto max-w-4xl text-center transition-all duration-1000 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8B1E3F]">
            Libas Support
          </p>

          <h1 className="mt-4 text-4xl font-bold text-gray-900 sm:text-5xl">
            Contact Us
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Have a question about your order, products, or anything else?
            We are here to help.
          </p>

          {/* Small animated line */}
          <div
            className={`mx-auto mt-8 h-1 rounded-full bg-[#8B1E3F] transition-all duration-1000 ${
              visible ? "w-20" : "w-0"
            }`}
          />

        </div>
      </section>

      {/* Contact Information */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-5xl">

          <div className="grid gap-6 md:grid-cols-3">

            {/* Email */}
            <div
              className={`group rounded-3xl bg-gray-50 p-8 text-center shadow-sm transition-all duration-700 hover:-translate-y-2 hover:bg-white hover:shadow-xl ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "150ms" }}
            >

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F5E9E5] text-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                ✉️
              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-900">
                Email
              </h2>

              <p className="mt-3 text-gray-600 transition-colors group-hover:text-[#8B1E3F]">
                support@libas.com
              </p>

              <div className="mx-auto mt-5 h-px w-0 bg-[#8B1E3F] transition-all duration-500 group-hover:w-16" />

            </div>

            {/* Phone */}
            <div
              className={`group rounded-3xl bg-gray-50 p-8 text-center shadow-sm transition-all duration-700 hover:-translate-y-2 hover:bg-white hover:shadow-xl ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "300ms" }}
            >

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F5E9E5] text-2xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6">
                📞
              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-900">
                Phone
              </h2>

              <p className="mt-3 text-gray-600 transition-colors group-hover:text-[#8B1E3F]">
                +92 300 0000000
              </p>

              <div className="mx-auto mt-5 h-px w-0 bg-[#8B1E3F] transition-all duration-500 group-hover:w-16" />

            </div>

            {/* Location */}
            <div
              className={`group rounded-3xl bg-gray-50 p-8 text-center shadow-sm transition-all duration-700 hover:-translate-y-2 hover:bg-white hover:shadow-xl ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "450ms" }}
            >

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F5E9E5] text-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                📍
              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-900">
                Location
              </h2>

              <p className="mt-3 text-gray-600 transition-colors group-hover:text-[#8B1E3F]">
                Islamabad, Pakistan
              </p>

              <div className="mx-auto mt-5 h-px w-0 bg-[#8B1E3F] transition-all duration-500 group-hover:w-16" />

            </div>

          </div>

          {/* Customer Support */}
          <div
            className={`relative mt-12 overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm transition-all duration-1000 hover:shadow-xl sm:p-12 ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "600ms" }}
          >

            {/* Decorative background */}
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#F5E9E5] opacity-60 transition-transform duration-700 hover:scale-125" />

            <div className="relative">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#8B1E3F] text-2xl text-white shadow-lg transition-transform duration-500 hover:scale-110">
                💬
              </div>

              <h2 className="mt-6 text-2xl font-bold text-gray-900">
                Customer Support
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
                For questions about products, orders, delivery, or order
                tracking, please contact our support team. We will try our
                best to help you as quickly as possible.
              </p>

              <p className="mt-6 text-sm font-medium text-[#8B1E3F]">
                We are here to help you.
              </p>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}

