"use client";

import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
  } = useCart();

  if (cart.length === 0) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-20">
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <div className="text-6xl">🛒</div>

          <h1 className="mt-5 text-3xl font-bold">
            Your Cart is Empty
          </h1>

          <p className="mt-3 text-gray-500">
            You haven't added any products yet.
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
      
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-[#8B1E3F]">
            Libas
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Shopping Cart
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-sm font-medium text-red-600 hover:underline"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">

        {/* Cart Items */}
        <div className="space-y-5 lg:col-span-2">
          {cart.map((item) => (
            <div
              key={`${item.id}-${item.selectedSize}`}
              className="flex gap-5 rounded-2xl bg-white p-4 shadow-sm"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="h-32 w-28 rounded-xl object-cover"
              />

              {/* Details */}
              <div className="flex flex-1 flex-col justify-between">

                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-semibold">
                        {item.name}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        Size: {item.selectedSize}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        removeFromCart(
                          item.id,
                          item.selectedSize
                        )
                      }
                      className="text-sm text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>

                  <p className="mt-2 font-semibold text-[#8B1E3F]">
                    Rs. {item.price.toLocaleString()}
                  </p>
                </div>

                {/* Quantity */}
                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() =>
                      decreaseQuantity(
                        item.id,
                        item.selectedSize
                      )
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-full border"
                  >
                    -
                  </button>

                  <span className="w-6 text-center font-medium">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(
                        item.id,
                        item.selectedSize
                      )
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-full border"
                  >
                    +
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            Order Summary
          </h2>

          <div className="mt-6 flex justify-between border-b pb-4">
            <span className="text-gray-600">
              Subtotal
            </span>

            <span className="font-semibold">
              Rs. {cartTotal.toLocaleString()}
            </span>
          </div>

          <div className="mt-4 flex justify-between">
            <span className="text-gray-600">
              Delivery
            </span>

            <span className="font-semibold">
              Calculated at checkout
            </span>
          </div>

          <div className="mt-6 flex justify-between border-t pt-5">
            <span className="text-lg font-bold">
              Total
            </span>

            <span className="text-xl font-bold text-[#8B1E3F]">
              Rs. {cartTotal.toLocaleString()}
            </span>
          </div>

          <Link
            href="/checkout"
            className="mt-6 block rounded-full bg-[#8B1E3F] py-3 text-center font-medium text-white hover:bg-[#6f1832]"
          >
            Proceed to Checkout
          </Link>
        </div>

      </div>
    </main>
  );
}