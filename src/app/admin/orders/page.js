// // "use client";

// // import { useEffect, useState } from "react";

// // export default function AdminOrdersPage() {
// //   const [orders, setOrders] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   const fetchOrders = async () => {
// //     try {
// //       setLoading(true);
// //       setError("");

// //       const response = await fetch("/api/orders");

// //       const data = await response.json();

// //       if (!response.ok) {
// //         throw new Error(
// //           data.message || "Failed to fetch orders."
// //         );
// //       }

// //       setOrders(data.orders || []);
// //     } catch (error) {
// //       console.error("FETCH ORDERS ERROR:", error);

// //       setError(
// //         error.message || "Failed to load orders."
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchOrders();
// //   }, []);

// //   return (
// //     <main className="min-h-screen bg-gray-50 px-4 py-10">
// //       <div className="mx-auto max-w-7xl">

// //         {/* Header */}
// //         <div className="mb-8">
// //           <p className="text-sm font-semibold uppercase tracking-widest text-[#8B1E3F]">
// //             Libas Admin
// //           </p>

// //           <h1 className="mt-2 text-3xl font-bold text-gray-900">
// //             Orders
// //           </h1>

// //           <p className="mt-2 text-gray-500">
// //             Manage customer orders from your Libas store.
// //           </p>
// //         </div>

// //         {/* Error */}
// //         {error && (
// //           <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
// //             {error}
// //           </div>
// //         )}

// //         {/* Loading */}
// //         {loading && (
// //           <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
// //             <p className="text-gray-500">
// //               Loading orders...
// //             </p>
// //           </div>
// //         )}

// //         {/* No Orders */}
// //         {!loading && !error && orders.length === 0 && (
// //           <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
// //             <h2 className="text-xl font-semibold text-gray-900">
// //               No orders found
// //             </h2>

// //             <p className="mt-2 text-gray-500">
// //               Customer orders will appear here.
// //             </p>
// //           </div>
// //         )}

// //         {/* Orders */}
// //         {!loading && orders.length > 0 && (
// //           <div className="space-y-6">
// //             {orders.map((order) => (
// //               <div
// //                 key={order._id}
// //                 className="rounded-2xl bg-white p-6 shadow-sm"
// //               >

// //                 {/* Order Header */}
// //                 <div className="flex flex-col gap-4 border-b border-gray-100 pb-5 md:flex-row md:items-center md:justify-between">
// //                   <div>
// //                     <p className="text-xs font-semibold uppercase tracking-wider text-[#8B1E3F]">
// //                       Order ID
// //                     </p>

// //                     <p className="mt-1 break-all text-sm font-medium text-gray-700">
// //                       {order._id}
// //                     </p>
// //                   </div>

// //                   <div>
// //                     <p className="text-sm text-gray-500">
// //                       Status
// //                     </p>

// //                     <span className="mt-1 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
// //                       {order.status || "Pending"}
// //                     </span>
// //                   </div>
// //                 </div>

// //                 {/* Customer Information */}
// //                 <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

// //                   <div>
// //                     <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
// //                       Customer
// //                     </p>

// //                     <p className="mt-1 font-medium text-gray-900">
// //                       {order.customerName || "N/A"}
// //                     </p>
// //                   </div>

// //                   <div>
// //                     <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
// //                       Phone
// //                     </p>

// //                     <p className="mt-1 font-medium text-gray-900">
// //                       {order.phone || "N/A"}
// //                     </p>
// //                   </div>

// //                   <div>
// //                     <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
// //                       Email
// //                     </p>

// //                     <p className="mt-1 break-all font-medium text-gray-900">
// //                       {order.email || "N/A"}
// //                     </p>
// //                   </div>

// //                   <div>
// //                     <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
// //                       Total
// //                     </p>

// //                     <p className="mt-1 text-lg font-bold text-[#8B1E3F]">
// //                       Rs.{" "}
// //                       {Number(
// //                         order.totalAmount || 0
// //                       ).toLocaleString()}
// //                     </p>
// //                   </div>

// //                 </div>

// //                 {/* Address */}
// //                 <div className="mt-6">
// //                   <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
// //                     Delivery Address
// //                   </p>

// //                   <p className="mt-1 text-gray-700">
// //                     {order.address || "N/A"}
// //                   </p>
// //                 </div>

// //                 {/* Products */}
// //                 <div className="mt-6">
// //                   <p className="mb-3 text-sm font-semibold text-gray-900">
// //                     Ordered Products
// //                   </p>

// //                   <div className="space-y-3">
// //                     {order.items?.map((item, index) => (
// //                       <div
// //                         key={item._id || index}
// //                         className="flex flex-col gap-3 rounded-xl bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between"
// //                       >
// //                         <div>
// //                           <p className="font-medium text-gray-900">
// //                             {item.name}
// //                           </p>

// //                           <p className="mt-1 text-sm text-gray-500">
// //                             Size: {item.size || "N/A"}{" "}
// //                             · Quantity:{" "}
// //                             {item.quantity || 1}
// //                           </p>
// //                         </div>

// //                         <p className="font-semibold text-gray-900">
// //                           Rs.{" "}
// //                           {Number(
// //                             item.price || 0
// //                           ).toLocaleString()}
// //                         </p>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 {/* Date */}
// //                 <div className="mt-6 border-t border-gray-100 pt-5">
// //                   <p className="text-xs text-gray-400">
// //                     Order Date
// //                   </p>

// //                   <p className="mt-1 text-sm text-gray-600">
// //                     {order.createdAt
// //                       ? new Date(
// //                           order.createdAt
// //                         ).toLocaleString()
// //                       : "N/A"}
// //                   </p>
// //                 </div>

// //               </div>
// //             ))}
// //           </div>
// //         )}

// //       </div>
// //     </main>
// //   );
// // }


// "use client";

// import { useEffect, useState } from "react";

// export default function AdminOrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await fetch("/api/orders");

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data.message || "Failed to fetch orders."
//         );
//       }

//       setOrders(data.orders || []);
//     } catch (error) {
//       console.error("FETCH ORDERS ERROR:", error);

//       setError(
//         error.message || "Failed to load orders."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   return (
//     <main className="min-h-screen bg-gray-50 px-4 py-10">
//       <div className="mx-auto max-w-7xl">

//         {/* Header */}
//         <div className="mb-8">
//           <p className="text-sm font-semibold uppercase tracking-widest text-[#8B1E3F]">
//             Libas Admin
//           </p>

//           <h1 className="mt-2 text-3xl font-bold text-gray-900">
//             Orders
//           </h1>

//           <p className="mt-2 text-gray-500">
//             Manage customer orders from your Libas store.
//           </p>
//         </div>

//         {/* Error */}
//         {error && (
//           <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
//             {error}
//           </div>
//         )}

//         {/* Loading */}
//         {loading && (
//           <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
//             <p className="text-gray-500">
//               Loading orders...
//             </p>
//           </div>
//         )}

//         {/* No Orders */}
//         {!loading && !error && orders.length === 0 && (
//           <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
//             <h2 className="text-xl font-semibold text-gray-900">
//               No orders found
//             </h2>

//             <p className="mt-2 text-gray-500">
//               Customer orders will appear here.
//             </p>
//           </div>
//         )}

//         {/* Orders */}
//         {!loading && orders.length > 0 && (
//           <div className="space-y-6">

//             {orders.map((order) => (
//               <div
//                 key={order._id}
//                 className="rounded-2xl bg-white p-6 shadow-sm"
//               >

//                 {/* Order Header */}
//                 <div className="flex flex-col gap-4 border-b border-gray-100 pb-5 md:flex-row md:items-center md:justify-between">

//                   <div>
//                     <p className="text-xs font-semibold uppercase tracking-wider text-[#8B1E3F]">
//                       Order ID
//                     </p>

//                     <p className="mt-1 break-all text-sm font-medium text-gray-700">
//                       {order._id}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-sm text-gray-500">
//                       Status
//                     </p>

//                     <span className="mt-1 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
//                       {order.status || "pending"}
//                     </span>
//                   </div>

//                 </div>

//                 {/* Customer Information */}
//                 <div className="mt-6 grid gap-5 md:grid-cols-3">

//                   {/* Customer Name */}
//                   <div>
//                     <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
//                       Customer
//                     </p>

//                     <p className="mt-1 font-medium text-gray-900">
//                       {order.customer?.name || "N/A"}
//                     </p>
//                   </div>

//                   {/* Phone */}
//                   <div>
//                     <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
//                       Phone
//                     </p>

//                     <p className="mt-1 font-medium text-gray-900">
//                       {order.customer?.phone || "N/A"}
//                     </p>
//                   </div>

//                   {/* City */}
//                   <div>
//                     <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
//                       City
//                     </p>

//                     <p className="mt-1 font-medium text-gray-900">
//                       {order.customer?.city || "N/A"}
//                     </p>
//                   </div>

//                 </div>

//                 {/* Total */}
//                 <div className="mt-6 rounded-xl bg-gray-50 p-4">
//                   <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
//                     Total Amount
//                   </p>

//                   <p className="mt-1 text-2xl font-bold text-[#8B1E3F]">
//                     Rs.{" "}
//                     {Number(
//                       order.total || 0
//                     ).toLocaleString()}
//                   </p>
//                 </div>

//                 {/* Address */}
//                 <div className="mt-6">
//                   <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
//                     Delivery Address
//                   </p>

//                   <p className="mt-1 text-gray-700">
//                     {order.customer?.address || "N/A"}
//                   </p>
//                 </div>

//                 {/* Products */}
//                 <div className="mt-6">

//                   <p className="mb-3 text-sm font-semibold text-gray-900">
//                     Ordered Products
//                   </p>

//                   <div className="space-y-3">

//                     {order.items?.map((item, index) => (
//                       <div
//                         key={`${order._id}-${index}`}
//                         className="flex flex-col gap-4 rounded-xl bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between"
//                       >

//                         {/* Product Info */}
//                         <div className="flex items-center gap-4">

//                           {item.image && (
//                             <img
//                               src={item.image}
//                               alt={item.name}
//                               className="h-16 w-16 rounded-lg object-cover"
//                             />
//                           )}

//                           <div>
//                             <p className="font-medium text-gray-900">
//                               {item.name}
//                             </p>

//                             <p className="mt-1 text-sm text-gray-500">
//                               Size:{" "}
//                               {item.selectedSize || "N/A"}
//                             </p>

//                             <p className="mt-1 text-sm text-gray-500">
//                               Quantity:{" "}
//                               {item.quantity || 1}
//                             </p>
//                           </div>

//                         </div>

//                         {/* Product Price */}
//                         <p className="font-semibold text-gray-900">
//                           Rs.{" "}
//                           {Number(
//                             item.price || 0
//                           ).toLocaleString()}
//                         </p>

//                       </div>
//                     ))}

//                   </div>
//                 </div>

//                 {/* Order Date */}
//                 <div className="mt-6 border-t border-gray-100 pt-5">

//                   <p className="text-xs text-gray-400">
//                     Order Date
//                   </p>

//                   <p className="mt-1 text-sm text-gray-600">
//                     {order.createdAt
//                       ? new Date(
//                           order.createdAt
//                         ).toLocaleString()
//                       : "N/A"}
//                   </p>

//                 </div>

//               </div>
//             ))}

//           </div>
//         )}

//       </div>
//     </main>
//   );
// }


"use client";

import { useEffect, useState } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/orders");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch orders."
        );
      }

      setOrders(data.orders || []);
    } catch (error) {
      console.error("FETCH ORDERS ERROR:", error);

      setError(
        error.message || "Failed to load orders."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);
      setError("");

      const response = await fetch(
        `/api/orders/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update order status."
        );
      }

      // Update status on screen
      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          String(order._id) === String(orderId)
            ? {
                ...order,
                status: newStatus,
              }
            : order
        )
      );
    } catch (error) {
      console.error(
        "UPDATE ORDER STATUS ERROR:",
        error
      );

      setError(
        error.message ||
          "Failed to update order status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // Status styling
  const getStatusClass = (status) => {
    switch (status) {
      case "confirmed":
        return "border-blue-200 bg-blue-50 text-blue-700";

      case "shipped":
        return "border-purple-200 bg-purple-50 text-purple-700";

      case "delivered":
        return "border-green-200 bg-green-50 text-green-700";

      case "cancelled":
        return "border-red-200 bg-red-50 text-red-700";

      default:
        return "border-yellow-200 bg-yellow-50 text-yellow-700";
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#8B1E3F]">
            Libas Admin
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Orders
          </h1>

          <p className="mt-2 text-gray-500">
            Manage customer orders from your Libas store.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <p className="text-gray-500">
              Loading orders...
            </p>
          </div>
        )}

        {/* No Orders */}
        {!loading && !error && orders.length === 0 && (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              No orders found
            </h2>

            <p className="mt-2 text-gray-500">
              Customer orders will appear here.
            </p>
          </div>
        )}

        {/* Orders */}
        {!loading && orders.length > 0 && (
          <div className="space-y-6">

            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >

                {/* Order Header */}
                <div className="flex flex-col gap-5 border-b border-gray-100 pb-5 md:flex-row md:items-center md:justify-between">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#8B1E3F]">
                      Order ID
                    </p>

                    <p className="mt-1 break-all text-sm font-medium text-gray-700">
                      {order._id}
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-500">
                      Order Status
                    </p>

                    <select
                      value={order.status || "pending"}
                      disabled={
                        updatingId ===
                        String(order._id)
                      }
                      onChange={(e) =>
                        handleStatusChange(
                          String(order._id),
                          e.target.value
                        )
                      }
                      className={`rounded-lg border px-4 py-2.5 text-sm font-semibold outline-none transition ${getStatusClass(
                        order.status
                      )}`}
                    >
                      <option value="pending">
                        Pending
                      </option>

                      <option value="confirmed">
                        Confirmed
                      </option>

                      <option value="shipped">
                        Shipped
                      </option>

                      <option value="delivered">
                        Delivered
                      </option>

                      <option value="cancelled">
                        Cancelled
                      </option>
                    </select>

                    {updatingId ===
                      String(order._id) && (
                      <p className="mt-2 text-xs text-gray-400">
                        Updating...
                      </p>
                    )}
                  </div>

                </div>

                {/* Customer Information */}
                <div className="mt-6 grid gap-5 md:grid-cols-3">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Customer
                    </p>

                    <p className="mt-1 font-medium text-gray-900">
                      {order.customer?.name || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Phone
                    </p>

                    <p className="mt-1 font-medium text-gray-900">
                      {order.customer?.phone || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      City
                    </p>

                    <p className="mt-1 font-medium text-gray-900">
                      {order.customer?.city || "N/A"}
                    </p>
                  </div>

                </div>

                {/* Total */}
                <div className="mt-6 rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Total Amount
                  </p>

                  <p className="mt-1 text-2xl font-bold text-[#8B1E3F]">
                    Rs.{" "}
                    {Number(
                      order.total || 0
                    ).toLocaleString()}
                  </p>
                </div>

                {/* Address */}
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Delivery Address
                  </p>

                  <p className="mt-1 text-gray-700">
                    {order.customer?.address || "N/A"}
                  </p>
                </div>

                {/* Products */}
                <div className="mt-6">

                  <p className="mb-3 text-sm font-semibold text-gray-900">
                    Ordered Products
                  </p>

                  <div className="space-y-3">

                    {order.items?.map((item, index) => (
                      <div
                        key={`${order._id}-${index}`}
                        className="flex flex-col gap-4 rounded-xl bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                      >

                        {/* Product */}
                        <div className="flex items-center gap-4">

                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-16 w-16 rounded-lg object-cover"
                            />
                          )}

                          <div>
                            <p className="font-medium text-gray-900">
                              {item.name}
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                              Size:{" "}
                              {item.selectedSize ||
                                "N/A"}
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                              Quantity:{" "}
                              {item.quantity || 1}
                            </p>
                          </div>

                        </div>

                        {/* Price */}
                        <p className="font-semibold text-gray-900">
                          Rs.{" "}
                          {Number(
                            item.price || 0
                          ).toLocaleString()}
                        </p>

                      </div>
                    ))}

                  </div>
                </div>

                {/* Order Date */}
                <div className="mt-6 border-t border-gray-100 pt-5">

                  <p className="text-xs text-gray-400">
                    Order Date
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    {order.createdAt
                      ? new Date(
                          order.createdAt
                        ).toLocaleString()
                      : "N/A"}
                  </p>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}