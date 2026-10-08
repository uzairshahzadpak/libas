
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "./Logo";
import { useCart } from "../context/CartContext";
import { Show, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();
  const { cart } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();

    const value = search.trim();

    if (!value) return;

    router.push(`/search?q=${encodeURIComponent(value)}`);
    setSearch("");
  };

  return (
    <>
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">

          {/* Hamburger - Mobile */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-2xl text-gray-800 transition hover:bg-gray-100 lg:hidden"
            aria-label="Open menu"
          >
            ☰
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center"
          >
            <Logo />
          </Link>

          {/* Collections Menu - Desktop */}
          <div className="relative ml-6 hidden shrink-0 lg:block group">

            <button
              type="button"
              className="flex h-10 items-center rounded-lg px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-[#8B1E3F]"
            >
              Collections
              <span className="ml-1 text-xs">
                ▾
              </span>
            </button>

            {/* Dropdown */}
            <div className="absolute left-0 top-full hidden w-44 pt-2 group-hover:block">

              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white py-2 shadow-lg">

                <Link
                  href="/collections/female"
                  className="block px-4 py-3 text-sm text-gray-700 transition hover:bg-[#F5E9E5] hover:text-[#8B1E3F]"
                >
                  Female
                </Link>

                <Link
                  href="/collections/male"
                  className="block px-4 py-3 text-sm text-gray-700 transition hover:bg-[#F5E9E5] hover:text-[#8B1E3F]"
                >
                  Male
                </Link>

                <Link
                  href="/collections/kids"
                  className="block px-4 py-3 text-sm text-gray-700 transition hover:bg-[#F5E9E5] hover:text-[#8B1E3F]"
                >
                  Kids
                </Link>

              </div>

            </div>
          </div>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="mx-6 hidden min-w-0 flex-1 md:flex"
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search collection..."
              className="h-11 w-full rounded-full border border-gray-300 bg-white px-5 text-sm text-gray-800 outline-none transition focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/10"
            />
          </form>

          {/* Desktop Links */}
          <nav className="ml-auto hidden shrink-0 items-center gap-4 lg:flex">

            <Link
              href="/"
              className="flex h-10 items-center whitespace-nowrap rounded-lg px-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-[#8B1E3F]"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="flex h-10 items-center whitespace-nowrap rounded-lg px-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-[#8B1E3F]"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="flex h-10 items-center whitespace-nowrap rounded-lg px-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-[#8B1E3F]"
            >
              Contact
            </Link>

            <Link
              href="/track-order"
              className="flex h-10 items-center whitespace-nowrap rounded-lg px-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-[#8B1E3F]"
            >
              Track Order
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex h-10 items-center whitespace-nowrap rounded-lg px-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-[#8B1E3F]"
            >
              Cart

              {cart.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#8B1E3F] px-1 text-xs font-semibold text-white">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Sign In / Sign Up */}
            <Show when="signed-out">
              <div className="flex items-center gap-2">

                <Link
                  href="/sign-in"
                  className="flex h-10 items-center whitespace-nowrap rounded-lg px-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-[#8B1E3F]"
                >
                  Sign In
                </Link>

                <Link
                  href="/sign-up"
                  className="flex h-10 items-center whitespace-nowrap rounded-full bg-[#8B1E3F] px-4 text-sm font-medium text-white transition hover:bg-[#6f1832]"
                >
                  Sign Up
                </Link>

              </div>
            </Show>

            {/* User Account */}
            <Show when="signed-in">
              <div className="flex h-10 items-center">
                <UserButton />
              </div>
            </Show>

          </nav>

          {/* Mobile Cart */}
          <Link
            href="/cart"
            className="relative ml-auto flex h-10 w-10 items-center justify-center rounded-lg text-2xl transition hover:bg-gray-100 lg:hidden"
            aria-label="Cart"
          >
            🛒

            {cart.length > 0 && (
              <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#8B1E3F] px-1 text-xs font-semibold text-white">
                {cart.length}
              </span>
            )}
          </Link>

        </div>
      </header>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[1px]"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-[70] h-full w-72 transform bg-white shadow-2xl transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* Sidebar Header */}
        <div className="flex h-20 items-center justify-between border-b border-gray-200 px-5">

          <Link
            href="/"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center"
          >
            <Logo />
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-2xl text-gray-700 transition hover:bg-gray-100"
            aria-label="Close menu"
          >
            ✕
          </button>

        </div>

        <div className="p-5">

          {/* Mobile Search */}
          <form
            onSubmit={(e) => {
              handleSearch(e);
              setSidebarOpen(false);
            }}
            className="mb-7"
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="h-11 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none transition focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/10"
            />
          </form>

          {/* Collections */}
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Collections
          </p>

          <div className="flex flex-col">

            <Link
              href="/collections/female"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center border-b border-gray-100 py-4 font-medium text-gray-800 transition hover:pl-2 hover:text-[#8B1E3F]"
            >
              Female
            </Link>

            <Link
              href="/collections/male"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center border-b border-gray-100 py-4 font-medium text-gray-800 transition hover:pl-2 hover:text-[#8B1E3F]"
            >
              Male
            </Link>

            <Link
              href="/collections/kids"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center border-b border-gray-100 py-4 font-medium text-gray-800 transition hover:pl-2 hover:text-[#8B1E3F]"
            >
              Kids
            </Link>

            <Link
              href="/track-order"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center border-b border-gray-100 py-4 font-medium text-gray-800 transition hover:pl-2 hover:text-[#8B1E3F]"
            >
              Track Order
            </Link>

          </div>

          {/* Mobile Sign In / Sign Up */}
          <div className="mt-7">

            <Show when="signed-out">
              <div className="flex flex-col">

                <Link
                  href="/sign-in"
                  onClick={() => setSidebarOpen(false)}
                  className="border-b border-gray-100 py-4 font-medium text-gray-800 transition hover:pl-2 hover:text-[#8B1E3F]"
                >
                  Sign In
                </Link>

                <Link
                  href="/sign-up"
                  onClick={() => setSidebarOpen(false)}
                  className="border-b border-gray-100 py-4 font-medium text-gray-800 transition hover:pl-2 hover:text-[#8B1E3F]"
                >
                  Sign Up
                </Link>

              </div>
            </Show>

            {/* Mobile User */}
            <Show when="signed-in">
              <div className="mt-4 flex items-center gap-3">

                <UserButton />

                <span className="text-sm font-medium text-gray-700">
                  My Account
                </span>

              </div>
            </Show>

          </div>

        </div>
      </aside>
    </>
  );
}

