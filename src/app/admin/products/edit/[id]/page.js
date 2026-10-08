
// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";

// export default function EditProductPage() {
//   const params = useParams();
//   const router = useRouter();

//   const id = params?.id;

//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     category: "",
//     collection: "",
//     sizes: [],
//     description: "",
//     image: "",
//   });

//   const [newImage, setNewImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState("");

//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   // Fetch existing product
//   useEffect(() => {
//     if (!id) return;

//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const response = await fetch(`/api/products/${id}`);

//         const data = await response.json();

//         if (!response.ok) {
//           throw new Error(
//             data.message || "Failed to fetch product."
//           );
//         }

//         const product = data.product;

//         setFormData({
//           name: product.name || "",
//           price: product.price ?? "",
//           category: product.category || "",
//           collection: product.collection || "",
//           sizes: Array.isArray(product.sizes)
//             ? product.sizes
//             : [],
//           description: product.description || "",
//           image: product.image || "",
//         });

//         setImagePreview(product.image || "");
//       } catch (error) {
//         console.error("FETCH PRODUCT ERROR:", error);

//         setError(
//           error.message || "Failed to load product."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   // Handle normal inputs
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((current) => ({
//       ...current,
//       [name]: value,
//     }));
//   };

//   // Handle sizes
//   const handleSizeChange = (size) => {
//     setFormData((current) => {
//       const alreadySelected =
//         current.sizes.includes(size);

//       if (alreadySelected) {
//         return {
//           ...current,
//           sizes: current.sizes.filter(
//             (item) => item !== size
//           ),
//         };
//       }

//       return {
//         ...current,
//         sizes: [...current.sizes, size],
//       };
//     });
//   };

//   // Handle new image
//   const handleImageChange = (e) => {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     setNewImage(file);

//     const previewUrl = URL.createObjectURL(file);

//     setImagePreview(previewUrl);
//   };

//   // Submit update
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setUpdating(true);
//       setError("");
//       setMessage("");

//       // Make sure at least one size is selected
//       if (formData.sizes.length === 0) {
//         throw new Error("Please select at least one size.");
//       }

//       // Existing image remains if user doesn't select new image
//       let imageUrl = formData.image;

//       // Upload new image to Cloudinary
//       if (newImage) {
//         const uploadData = new FormData();

//         uploadData.append("file", newImage);

//         const uploadResponse = await fetch("/api/upload", {
//           method: "POST",
//           body: uploadData,
//         });

//         const uploadResult =
//           await uploadResponse.json();

//         if (!uploadResponse.ok) {
//           throw new Error(
//             uploadResult.message ||
//               "Image upload failed."
//           );
//         }

//         imageUrl = uploadResult.url;
//       }

//       // Update product in MongoDB
//       const response = await fetch(
//         `/api/products/${id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             name: formData.name,
//             price: Number(formData.price),
//             category: formData.category,
//             collection: formData.collection,
//             sizes: formData.sizes,
//             description: formData.description,
//             image: imageUrl,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data.message ||
//             "Failed to update product."
//         );
//       }

//       setMessage(
//         "Product updated successfully."
//       );

//       // Go back to products page
//       setTimeout(() => {
//         router.push("/admin/products");
//       }, 1000);
//     } catch (error) {
//       console.error(
//         "UPDATE PRODUCT ERROR:",
//         error
//       );

//       setError(
//         error.message ||
//           "Failed to update product."
//       );
//     } finally {
//       setUpdating(false);
//     }
//   };

//   // Loading screen
//   if (loading) {
//     return (
//       <main className="min-h-screen bg-gray-50 px-4 py-10">
//         <div className="mx-auto max-w-3xl rounded-2xl bg-white p-10 text-center shadow-sm">
//           <p className="text-gray-500">
//             Loading product...
//           </p>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-gray-50 px-4 py-10">
//       <div className="mx-auto max-w-3xl">

//         {/* Header */}
//         <div className="mb-8">
//           <p className="text-sm font-semibold uppercase tracking-widest text-[#8B1E3F]">
//             Libas Admin
//           </p>

//           <h1 className="mt-2 text-3xl font-bold text-gray-900">
//             Edit Product
//           </h1>

//           <p className="mt-2 text-gray-500">
//             Update your product information.
//           </p>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
//             {error}
//           </div>
//         )}

//         {/* Success Message */}
//         {message && (
//           <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-700">
//             ✓ {message}
//           </div>
//         )}

//         {/* Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="space-y-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8"
//         >

//           {/* Product Name */}
//           <div>
//             <label className="mb-2 block text-sm font-medium text-gray-700">
//               Product Name
//             </label>

//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#8B1E3F]"
//             />
//           </div>

//           {/* Price */}
//           <div>
//             <label className="mb-2 block text-sm font-medium text-gray-700">
//               Price
//             </label>

//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               required
//               min="0"
//               className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#8B1E3F]"
//             />
//           </div>

//           {/* Category */}
//           <div>
//             <label className="mb-2 block text-sm font-medium text-gray-700">
//               Category
//             </label>

//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               required
//               className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#8B1E3F]"
//             >
//               <option value="">
//                 Select Category
//               </option>

//               <option value="Male">
//                 Male
//               </option>

//               <option value="Female">
//                 Female
//               </option>

//               <option value="Kids">
//                 Kids
//               </option>
//             </select>
//           </div>

//           {/* Collection */}
//           <div>
//             <label className="mb-2 block text-sm font-medium text-gray-700">
//               Collection
//             </label>

//             <select
//               name="collection"
//               value={formData.collection}
//               onChange={handleChange}
//               required
//               className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#8B1E3F]"
//             >
//               <option value="">
//                 Select Collection
//               </option>

//               <option value="male">
//                 Male
//               </option>

//               <option value="female">
//                 Female
//               </option>

//               <option value="kids">
//                 Kids
//               </option>
//             </select>
//           </div>

//           {/* Sizes */}
//           <div>
//             <p className="mb-3 text-sm font-medium text-gray-700">
//               Sizes
//             </p>

//             <div className="flex flex-wrap gap-3">
//               {[
//                 "XS",
//                 "S",
//                 "M",
//                 "L",
//                 "XL",
//                 "XXL",
//               ].map((size) => (
//                 <label
//                   key={size}
//                   className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2"
//                 >
//                   <input
//                     type="checkbox"
//                     checked={formData.sizes.includes(
//                       size
//                     )}
//                     onChange={() =>
//                       handleSizeChange(size)
//                     }
//                   />

//                   <span className="text-sm">
//                     {size}
//                   </span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Description */}
//           <div>
//             <label className="mb-2 block text-sm font-medium text-gray-700">
//               Description
//             </label>

//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               rows="5"
//               className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#8B1E3F]"
//             />
//           </div>

//           {/* Product Image */}
//           <div>
//             <label className="mb-2 block text-sm font-medium text-gray-700">
//               Product Image
//             </label>

//             {imagePreview && (
//               <div className="mb-4">
//                 <img
//                   src={imagePreview}
//                   alt="Product preview"
//                   className="h-64 w-full rounded-xl object-cover"
//                 />
//               </div>
//             )}

//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="w-full rounded-lg border border-gray-300 px-4 py-3"
//             />

//             <p className="mt-2 text-xs text-gray-500">
//               Select a new image only if you want to
//               replace the current image.
//             </p>
//           </div>

//           {/* Buttons */}
//           <div className="flex flex-col gap-3 pt-4 sm:flex-row">

//             <button
//               type="submit"
//               disabled={updating}
//               className="flex-1 rounded-lg bg-[#8B1E3F] px-5 py-3 font-semibold text-white transition hover:bg-[#6f1832] disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               {updating
//                 ? "Updating..."
//                 : "Update Product"}
//             </button>

//             <button
//               type="button"
//               onClick={() =>
//                 router.push("/admin/products")
//               }
//               className="rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:border-[#8B1E3F] hover:text-[#8B1E3F]"
//             >
//               Cancel
//             </button>

//           </div>
//         </form>
//       </div>
//     </main>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id;

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    collection: "",
    kidsType: "",
    sizes: [],
    description: "",
    image: "",
  });

  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Fetch existing product
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`/api/products/${id}`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch product."
          );
        }

        const product = data.product;

        setFormData({
          name: product.name || "",
          price: product.price ?? "",
          category: product.category || "",
          collection: product.collection || "",
          kidsType: product.kidsType || "",
          sizes: Array.isArray(product.sizes)
            ? product.sizes
            : [],
          description: product.description || "",
          image: product.image || "",
        });

        setImagePreview(product.image || "");
      } catch (error) {
        console.error("FETCH PRODUCT ERROR:", error);

        setError(
          error.message || "Failed to load product."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle normal inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    const value = e.target.value;

    setFormData((current) => ({
      ...current,
      category: value,
      kidsType: value === "Kids" ? current.kidsType : "",
    }));
  };

  // Handle sizes
  const handleSizeChange = (size) => {
    setFormData((current) => {
      const alreadySelected =
        current.sizes.includes(size);

      if (alreadySelected) {
        return {
          ...current,
          sizes: current.sizes.filter(
            (item) => item !== size
          ),
        };
      }

      return {
        ...current,
        sizes: [...current.sizes, size],
      };
    });
  };

  // Handle new image
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setNewImage(file);

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);
      setError("");
      setMessage("");

      // Make sure at least one size is selected
      if (formData.sizes.length === 0) {
        throw new Error(
          "Please select at least one size."
        );
      }

      // Kids product ke liye Boys/Girls required hai
      if (
        formData.category === "Kids" &&
        !formData.kidsType
      ) {
        throw new Error(
          "Please select Kids Type: Boys or Girls."
        );
      }

      // Existing image remains if user doesn't select new image
      let imageUrl = formData.image;

      // Upload new image to Cloudinary
      if (newImage) {
        const uploadData = new FormData();

        uploadData.append("file", newImage);

        const uploadResponse = await fetch(
          "/api/upload",
          {
            method: "POST",
            body: uploadData,
          }
        );

        const uploadResult =
          await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(
            uploadResult.message ||
              "Image upload failed."
          );
        }

        imageUrl = uploadResult.url;
      }

      // Update product in MongoDB
      const response = await fetch(
        `/api/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            price: Number(formData.price),
            category: formData.category,
            collection: formData.collection,

            // Kids ke liye hi kidsType save hoga
            kidsType:
              formData.category === "Kids"
                ? formData.kidsType
                : undefined,

            sizes: formData.sizes,
            description: formData.description,
            image: imageUrl,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update product."
        );
      }

      setMessage(
        "Product updated successfully."
      );

      // Go back to products page
      setTimeout(() => {
        router.push("/admin/products");
      }, 1000);
    } catch (error) {
      console.error(
        "UPDATE PRODUCT ERROR:",
        error
      );

      setError(
        error.message ||
          "Failed to update product."
      );
    } finally {
      setUpdating(false);
    }
  };

  // Loading screen
  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-10 text-center shadow-sm">
          <p className="text-gray-500">
            Loading product...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#8B1E3F]">
            Libas Admin
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Edit Product
          </h1>

          <p className="mt-2 text-gray-500">
            Update your product information.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {/* Success Message */}
        {message && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-700">
            ✓ {message}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8"
        >

          {/* Product Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#8B1E3F]"
            />
          </div>

          {/* Price */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#8B1E3F]"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleCategoryChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#8B1E3F]"
            >
              <option value="">
                Select Category
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Kids">
                Kids
              </option>
            </select>
          </div>

          {/* Kids Type */}
          {formData.category === "Kids" && (
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Kids Type
              </label>

              <select
                name="kidsType"
                value={formData.kidsType}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#8B1E3F]"
              >
                <option value="">
                  Select Kids Type
                </option>

                <option value="boys">
                  Boys
                </option>

                <option value="girls">
                  Girls
                </option>
              </select>
            </div>
          )}

          {/* Collection */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Collection
            </label>

            <select
              name="collection"
              value={formData.collection}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#8B1E3F]"
            >
              <option value="">
                Select Collection
              </option>

              <option value="male">
                Male
              </option>

              <option value="female">
                Female
              </option>

              <option value="kids">
                Kids
              </option>
            </select>
          </div>

          {/* Sizes */}
          <div>
            <p className="mb-3 text-sm font-medium text-gray-700">
              Sizes
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                "XS",
                "S",
                "M",
                "L",
                "XL",
                "XXL",
              ].map((size) => (
                <label
                  key={size}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2"
                >
                  <input
                    type="checkbox"
                    checked={formData.sizes.includes(
                      size
                    )}
                    onChange={() =>
                      handleSizeChange(size)
                    }
                  />

                  <span className="text-sm">
                    {size}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#8B1E3F]"
            />
          </div>

          {/* Product Image */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Product Image
            </label>

            {imagePreview && (
              <div className="mb-4">
                <img
                  src={imagePreview}
                  alt="Product preview"
                  className="h-64 w-full rounded-xl object-cover"
                />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />

            <p className="mt-2 text-xs text-gray-500">
              Select a new image only if you want to
              replace the current image.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-4 sm:flex-row">

            <button
              type="submit"
              disabled={updating}
              className="flex-1 rounded-lg bg-[#8B1E3F] px-5 py-3 font-semibold text-white transition hover:bg-[#6f1832] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {updating
                ? "Updating..."
                : "Update Product"}
            </button>

            <button
              type="button"
              onClick={() =>
                router.push("/admin/products")
              }
              className="rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:border-[#8B1E3F] hover:text-[#8B1E3F]"
            >
              Cancel
            </button>

          </div>
        </form>
      </div>
    </main>
  );
}



