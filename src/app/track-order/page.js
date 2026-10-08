
"use client";

import { useState } from "react";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrackOrder = async (e) => {
    e.preventDefault();

    if (!orderId.trim()) {
      setError("Please enter your Order ID.");
      return;
    }

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const response = await fetch(
        `/api/orders/${orderId.trim()}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Order not found.");
      }

      setOrder(data.order);
    } catch (error) {
      console.error("TRACK ORDER ERROR:", error);

      setError(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case "pending":
        return {
          label: "Pending",
          message: "Your order has been received and is waiting for confirmation.",
        };

      case "confirmed":
        return {
          label: "Confirmed",
          message: "Your order has been confirmed and is being prepared.",
        };

      case "shipped":
        return {
          label: "Shipped",
          message: "Your order has been shipped and is on its way.",
        };

      case "delivered":
        return {
          label: "Delivered",
          message: "Your order has been delivered successfully.",
        };

      case "cancelled":
        return {
          label: "Cancelled",
          message: "This order has been cancelled.",
        };

      default:
        return {
          label: status,
          message: "Order status is available.",
        };
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8B1E3F]">
            Libas
          </p>

          <h1 className="mt-3 text-4xl font-bold text-gray-900">
            Track Your Order
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            Enter your Order ID below to check your current order status.
          </p>
        </div>

        {/* Search Form */}
        <div className="mt-10 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <form
            onSubmit={handleTrackOrder}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter your Order ID"
              className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#8B1E3F]"
            />

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#8B1E3F] px-7 py-3 font-semibold text-white transition hover:bg-[#6f1832] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Searching..." : "Track Order"}
            </button>
          </form>

          {error && (
            <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}
        </div>

        {/* Order Result */}
        {order && (
          <div className="mt-8 space-y-6">

            {/* Status */}
            <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Order ID
                  </p>

                  <p className="mt-1 break-all font-semibold text-gray-900">
                    {order._id}
                  </p>
                </div>

                <div className="rounded-full bg-[#F5E9E5] px-5 py-2">
                  <span className="font-semibold text-[#8B1E3F]">
                    {getStatusInfo(order.status).label}
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t pt-6">
                <h2 className="text-xl font-bold">
                  Order Status
                </h2>

                <p className="mt-2 text-gray-600">
                  {getStatusInfo(order.status).message}
                </p>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold">
                Delivery Information
              </h2>

              <div className="mt-5 space-y-3 text-sm text-gray-600">
                <p>
                  <span className="font-medium text-gray-900">
                    Name:
                  </span>{" "}
                  {order.customer?.name}
                </p>

                <p>
                  <span className="font-medium text-gray-900">
                    Phone:
                  </span>{" "}
                  {order.customer?.phone}
                </p>

                <p>
                  <span className="font-medium text-gray-900">
                    City:
                  </span>{" "}
                  {order.customer?.city}
                </p>

                <p>
                  <span className="font-medium text-gray-900">
                    Address:
                  </span>{" "}
                  {order.customer?.address}
                </p>
              </div>
            </div>

            {/* Products */}
            <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold">
                Ordered Products
              </h2>

              <div className="mt-5 space-y-5">
                {order.items?.map((item, index) => (
                  <div
                    key={`${item.productId}-${item.selectedSize}-${index}`}
                    className="flex gap-4 border-b pb-5 last:border-b-0 last:pb-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-20 rounded-xl object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Size: {item.selectedSize}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>

                      <p className="mt-2 font-semibold text-[#8B1E3F]">
                        Rs.{" "}
                        {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-between border-t pt-5">
                <span className="text-lg font-bold">
                  Total
                </span>

                <span className="text-xl font-bold text-[#8B1E3F]">
                  Rs. {order.total?.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

