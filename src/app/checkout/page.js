
"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const orderData = {
        customer: {
          name: formData.name,
          phone: formData.phone,
          city: formData.city,
          address: formData.address,
        },

        items: cart.map((item) => ({
          productId: String(item.id),
          name: item.name,
          image: item.image,
          price: item.price,
          selectedSize: item.selectedSize,
          quantity: item.quantity,
        })),

        total: cartTotal,
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order.");
      }

      // Save Order ID
      setOrderId(data.order._id);

      setIsOrderPlaced(true);

      clearCart();
    } catch (error) {
      console.error("CHECKOUT ERROR:", error);

      setError(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isOrderPlaced) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-20">
        <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
            ✓
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-[#8B1E3F]">
            Libas
          </p>

          <h1 className="mt-3 text-3xl font-bold">
            Order Placed Successfully!
          </h1>

          {/* Order ID */}
          <div className="mt-4 rounded-xl bg-gray-50 px-4 py-3">
            <p className="text-sm text-gray-500">
              Your Order ID
            </p>

            <p className="mt-1 break-all font-semibold text-[#8B1E3F]">
              {orderId}
            </p>
          </div>

          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            Thank you for shopping with Libas. Your order has
            been saved successfully.
          </p>

          <div className="mt-8 rounded-2xl bg-gray-50 p-6 text-left">
            <h2 className="font-semibold">
              Delivery Information
            </h2>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-900">
                  Name:
                </span>{" "}
                {formData.name}
              </p>

              <p>
                <span className="font-medium text-gray-900">
                  Phone:
                </span>{" "}
                {formData.phone}
              </p>

              <p>
                <span className="font-medium text-gray-900">
                  City:
                </span>{" "}
                {formData.city}
              </p>

              <p>
                <span className="font-medium text-gray-900">
                  Address:
                </span>{" "}
                {formData.address}
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="mt-8 inline-block rounded-full bg-[#8B1E3F] px-8 py-3 font-medium text-white transition hover:bg-[#6f1832]"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-20">
        <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
          <div className="text-6xl">🛒</div>

          <h1 className="mt-5 text-3xl font-bold">
            Your Cart is Empty
          </h1>

          <p className="mt-3 text-gray-500">
            Please add some products before checkout.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-full bg-[#8B1E3F] px-8 py-3 font-medium text-white hover:bg-[#6f1832]"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#8B1E3F]">
          Libas
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Checkout
        </h1>

        <p className="mt-3 text-gray-600">
          Enter your delivery information to place your order.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Delivery Information */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">
              Delivery Information
            </h2>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#8B1E3F]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="03XX-XXXXXXX"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#8B1E3F]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#8B1E3F]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Complete Address
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House number, street, area..."
                  rows="5"
                  required
                  className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#8B1E3F]"
                />
              </div>

              {error && (
                <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-[#8B1E3F] py-3.5 font-semibold text-white transition hover:bg-[#6f1832] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            Order Summary
          </h2>

          <div className="mt-6 space-y-5">
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize}`}
                className="flex gap-4 border-b pb-5"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-16 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h3 className="text-sm font-semibold">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Size: {item.selectedSize}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Quantity: {item.quantity}
                  </p>

                  <p className="mt-2 text-sm font-semibold text-[#8B1E3F]">
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
              Rs. {cartTotal.toLocaleString()}
            </span>
          </div>

          <p className="mt-4 text-xs leading-5 text-gray-500">
            Payment method: Cash on Delivery
          </p>
        </div>
      </div>
    </main>
  );
}

