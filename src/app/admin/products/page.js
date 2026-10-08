// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function AdminProductsPage() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [deletingId, setDeletingId] = useState(null);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await fetch("/api/products");

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data.message || "Failed to fetch products."
//         );
//       }

//       setProducts(data.products || []);
//     } catch (error) {
//       console.error("FETCH PRODUCTS ERROR:", error);

//       setError(
//         error.message || "Failed to load products."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleDelete = async (id, name) => {
//     const confirmDelete = window.confirm(
//       `Are you sure you want to delete "${name}"?`
//     );

//     if (!confirmDelete) {
//       return;
//     }

//     try {
//       setDeletingId(id);
//       setMessage("");
//       setError("");

//       const response = await fetch(`/api/products/${id}`, {
//         method: "DELETE",
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data.message || "Failed to delete product."
//         );
//       }

//       setProducts((currentProducts) =>
//         currentProducts.filter(
//           (product) => String(product._id) !== String(id)
//         )
//       );

//       setMessage("Product deleted successfully.");
//     } catch (error) {
//       console.error("DELETE PRODUCT ERROR:", error);

//       setError(
//         error.message || "Failed to delete product."
//       );
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-gray-50 px-4 py-10">
//       <div className="mx-auto max-w-7xl">

//         {/* Header */}
//         <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

//           <div>
//             <p className="text-sm font-semibold uppercase tracking-widest text-[#8B1E3F]">
//               Libas Admin
//             </p>

//             <h1 className="mt-2 text-3xl font-bold text-gray-900">
//               Products
//             </h1>

//             <p className="mt-2 text-gray-500">
//               Manage all products in your Libas store.
//             </p>
//           </div>

//           <div className="flex flex-wrap gap-3">

//             <Link
//               href="/admin/products/new"
//               className="rounded-full bg-[#8B1E3F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#6f1832]"
//             >
//               + Add Product
//             </Link>

//             <Link
//               href="/"
//               className="rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:border-[#8B1E3F] hover:text-[#8B1E3F]"
//             >
//               Back to Store
//             </Link>

//           </div>
//         </div>

//         {/* Success Message */}
//         {message && (
//           <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-700">
//             ✓ {message}
//           </div>
//         )}

//         {/* Error Message */}
//         {error && (
//           <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
//             {error}
//           </div>
//         )}

//         {/* Loading */}
//         {loading && (
//           <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
//             <p className="text-gray-500">
//               Loading products...
//             </p>
//           </div>
//         )}

//         {/* Empty */}
//         {!loading && products.length === 0 && !error && (
//           <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

//             <h2 className="text-xl font-semibold text-gray-900">
//               No products found
//             </h2>

//             <p className="mt-2 text-gray-500">
//               Add your first product to the store.
//             </p>

//             <Link
//               href="/admin/products/new"
//               className="mt-5 inline-block rounded-full bg-[#8B1E3F] px-6 py-3 font-medium text-white hover:bg-[#6f1832]"
//             >
//               Add Product
//             </Link>

//           </div>
//         )}

//         {/* Products */}
//         {!loading && products.length > 0 && (
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

//             {products.map((product) => (
//               <div
//                 key={product._id}
//                 className="overflow-hidden rounded-2xl bg-white shadow-sm"
//               >

//                 {/* Image */}
//                 <div className="h-72 overflow-hidden bg-gray-100">

//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="h-full w-full object-cover"
//                   />

//                 </div>

//                 {/* Information */}
//                 <div className="p-5">

//                   <p className="text-xs font-semibold uppercase tracking-wider text-[#8B1E3F]">
//                     {product.category}
//                   </p>

//                   <h2 className="mt-1 text-lg font-bold text-gray-900">
//                     {product.name}
//                   </h2>

//                   <p className="mt-3 text-xl font-bold text-[#8B1E3F]">
//                     Rs. {Number(product.price).toLocaleString()}
//                   </p>

//                   <p className="mt-2 text-sm text-gray-500">
//                     Collection:{" "}
//                     <span className="font-medium text-gray-700">
//                       {product.collection}
//                     </span>
//                   </p>

//                   {/* Sizes */}
//                   <div className="mt-3">

//                     <p className="mb-2 text-sm font-medium text-gray-700">
//                       Sizes
//                     </p>

//                     <div className="flex flex-wrap gap-2">

//                       {product.sizes?.map((size) => (
//                         <span
//                           key={size}
//                           className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
//                         >
//                           {size}
//                         </span>
//                       ))}

//                     </div>
//                   </div>

//                   {/* Delete Button */}
//                   <div className="mt-5">

//                     <button
//                       type="button"
//                       disabled={
//                         deletingId === String(product._id)
//                       }
//                       onClick={() =>
//                         handleDelete(
//                           String(product._id),
//                           product.name
//                         )
//                       }
//                       className="w-full rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
//                     >
//                       {deletingId === String(product._id)
//                         ? "Deleting..."
//                         : "Delete"}
//                     </button>

//                   </div>

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
import Link from "next/link";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/products");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch products."
        );
      }

      setProducts(data.products || []);
    } catch (error) {
      console.error("FETCH PRODUCTS ERROR:", error);

      setError(
        error.message || "Failed to load products."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingId(id);
      setMessage("");
      setError("");

      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete product."
        );
      }

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => String(product._id) !== String(id)
        )
      );

      setMessage("Product deleted successfully.");
    } catch (error) {
      console.error("DELETE PRODUCT ERROR:", error);

      setError(
        error.message || "Failed to delete product."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#8B1E3F]">
              Libas Admin
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Products
            </h1>

            <p className="mt-2 text-gray-500">
              Manage all products in your Libas store.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/products/new"
              className="rounded-full bg-[#8B1E3F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#6f1832]"
            >
              + Add Product
            </Link>

            <Link
              href="/"
              className="rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:border-[#8B1E3F] hover:text-[#8B1E3F]"
            >
              Back to Store
            </Link>
          </div>
        </div>

        {/* Success Message */}
        {message && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-700">
            ✓ {message}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <p className="text-gray-500">
              Loading products...
            </p>
          </div>
        )}

        {/* No Products */}
        {!loading && products.length === 0 && !error && (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              No products found
            </h2>

            <p className="mt-2 text-gray-500">
              Add your first product to the store.
            </p>

            <Link
              href="/admin/products/new"
              className="mt-5 inline-block rounded-full bg-[#8B1E3F] px-6 py-3 font-medium text-white hover:bg-[#6f1832]"
            >
              Add Product
            </Link>
          </div>
        )}

        {/* Products */}
        {!loading && products.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {products.map((product) => (
              <div
                key={product._id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm"
              >

                {/* Product Image */}
                <div className="h-72 overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-5">

                  {/* Category */}
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#8B1E3F]">
                    {product.category}
                  </p>

                  {/* Name */}
                  <h2 className="mt-1 text-lg font-bold text-gray-900">
                    {product.name}
                  </h2>

                  {/* Price */}
                  <p className="mt-3 text-xl font-bold text-[#8B1E3F]">
                    Rs. {Number(product.price).toLocaleString()}
                  </p>

                  {/* Collection */}
                  <p className="mt-2 text-sm text-gray-500">
                    Collection:{" "}
                    <span className="font-medium text-gray-700">
                      {product.collection}
                    </span>
                  </p>

                  {/* Sizes */}
                  <div className="mt-3">
                    <p className="mb-2 text-sm font-medium text-gray-700">
                      Sizes
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {product.sizes?.map((size) => (
                        <span
                          key={size}
                          className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Edit & Delete Buttons */}
                  <div className="mt-5 flex gap-3">

                    {/* Edit Button */}
                    <Link
                      href={`/admin/products/edit/${product._id}`}
                      className="flex-1 rounded-lg border border-[#8B1E3F] px-4 py-2.5 text-center text-sm font-semibold text-[#8B1E3F] transition hover:bg-[#8B1E3F] hover:text-white"
                    >
                      Edit
                    </Link>

                    {/* Delete Button */}
                    <button
                      type="button"
                      disabled={
                        deletingId === String(product._id)
                      }
                      onClick={() =>
                        handleDelete(
                          String(product._id),
                          product.name
                        )
                      }
                      className="flex-1 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletingId === String(product._id)
                        ? "Deleting..."
                        : "Delete"}
                    </button>

                  </div>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </main>
  );
}