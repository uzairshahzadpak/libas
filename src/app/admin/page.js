"use client";

import Link from "next/link";

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Libas Admin Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Manage your products and customer orders.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          
          {/* Products */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-900">
              Products
            </h2>

            <p className="mt-2 text-gray-600">
              Add, edit and delete Libas products.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/admin/products"
                className="rounded-lg bg-[#8B1E3F] px-5 py-3 text-sm font-medium text-white hover:opacity-90"
              >
                Manage Products
              </Link>

              <Link
                href="/admin/products/new"
                className="rounded-lg border border-[#8B1E3F] px-5 py-3 text-sm font-medium text-[#8B1E3F] hover:bg-[#8B1E3F] hover:text-white"
              >
                Add Product
              </Link>
            </div>
          </div>

          {/* Orders */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-900">
              Orders
            </h2>

            <p className="mt-2 text-gray-600">
              View customer orders and update order status.
            </p>

            <div className="mt-6">
              <Link
                href="/admin/orders"
                className="inline-block rounded-lg bg-[#8B1E3F] px-5 py-3 text-sm font-medium text-white hover:opacity-90"
              >
                Manage Orders
              </Link>
            </div>
          </div>
        </div>

        {/* Back to Store */}
        <div className="mt-10">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-[#8B1E3F]"
          >
            ← Back to Store
          </Link>
        </div>

      </div>
    </main>
  );
}