// "use client";

// import { useState } from "react";
// import Link from "next/link";

// export default function NewProductPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     category: "Female",
//     collection: "female",
//     sizes: [],
//     description: "",
//   });

//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const availableSizes = {
//     Female: ["S", "M", "L", "XL", "XXL"],
//     Male: ["S", "M", "L", "XL", "XXL"],
//     Kids: ["2-3Y", "3-4Y", "4-5Y", "5-6Y", "6-7Y", "7-8Y", "8-9Y"],
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((current) => ({
//       ...current,
//       [name]: value,
//     }));
//   };

//   const handleCategoryChange = (e) => {
//     const category = e.target.value;

//     let collection = "female";

//     if (category === "Male") {
//       collection = "male";
//     }

//     if (category === "Kids") {
//       collection = "kids";
//     }

//     setFormData((current) => ({
//       ...current,
//       category,
//       collection,
//       sizes: [],
//     }));
//   };

//   const handleSizeChange = (size) => {
//     setFormData((current) => {
//       const alreadySelected = current.sizes.includes(size);

//       if (alreadySelected) {
//         return {
//           ...current,
//           sizes: current.sizes.filter((item) => item !== size),
//         };
//       }

//       return {
//         ...current,
//         sizes: [...current.sizes, size],
//       };
//     });
//   };

//   const handleImageChange = (e) => {
//     const selectedFile = e.target.files?.[0];

//     if (!selectedFile) {
//       return;
//     }

//     if (!selectedFile.type.startsWith("image/")) {
//       setError("Please select an image file.");
//       return;
//     }

//     if (selectedFile.size > 5 * 1024 * 1024) {
//       setError("Image size must be less than 5MB.");
//       return;
//     }

//     setError("");
//     setImage(selectedFile);

//     const imageUrl = URL.createObjectURL(selectedFile);
//     setPreview(imageUrl);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setMessage("");
//     setError("");

//     if (!formData.name.trim()) {
//       setError("Product name is required.");
//       return;
//     }

//     if (!formData.price || Number(formData.price) < 0) {
//       setError("Please enter a valid price.");
//       return;
//     }

//     if (formData.sizes.length === 0) {
//       setError("Please select at least one size.");
//       return;
//     }

//     if (!image) {
//       setError("Please select a product image.");
//       return;
//     }

//     try {
//       setLoading(true);

//       // STEP 1: Image Cloudinary par upload karna
//       const imageFormData = new FormData();

//       imageFormData.append("file", image);

//       const uploadResponse = await fetch("/api/upload", {
//         method: "POST",
//         body: imageFormData,
//       });

//       const uploadData = await uploadResponse.json();

//       if (!uploadResponse.ok) {
//         throw new Error(
//           uploadData.message || "Image upload failed."
//         );
//       }

//       // STEP 2: Product MongoDB mein save karna
//       const productResponse = await fetch("/api/products", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: formData.name.trim(),
//           price: Number(formData.price),
//           category: formData.category,
//           collection: formData.collection,
//           sizes: formData.sizes,
//           image: uploadData.url,
//           description: formData.description.trim(),
//         }),
//       });

//       const productData = await productResponse.json();

//       if (!productResponse.ok) {
//         throw new Error(
//           productData.message || "Product creation failed."
//         );
//       }

//       setMessage("Product added successfully!");

//       // Form reset
//       setFormData({
//         name: "",
//         price: "",
//         category: "Female",
//         collection: "female",
//         sizes: [],
//         description: "",
//       });

//       setImage(null);
//       setPreview("");

//       // File input reset
//       e.target.reset();
//     } catch (error) {
//       console.error("ADD PRODUCT ERROR:", error);

//       setError(
//         error.message || "Something went wrong."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-gray-50 px-4 py-10">
//       <div className="mx-auto max-w-4xl">
//         {/* Header */}
//         <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <p className="text-sm font-semibold uppercase tracking-widest text-[#8B1E3F]">
//               Libas Admin
//             </p>

//             <h1 className="mt-2 text-3xl font-bold text-gray-900">
//               Add New Product
//             </h1>

//             <p className="mt-2 text-gray-500">
//               Add a new product to your Libas store.
//             </p>
//           </div>

//           <Link
//             href="/"
//             className="inline-flex w-fit rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:border-[#8B1E3F] hover:text-[#8B1E3F]"
//           >
//             ← Back to Store
//           </Link>
//         </div>

//         {/* Messages */}
//         {message && (
//           <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-700">
//             ✓ {message}
//           </div>
//         )}

//         {error && (
//           <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
//             {error}
//           </div>
//         )}

//         {/* Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="rounded-3xl bg-white p-6 shadow-sm md:p-8"
//         >
//           {/* Product Name */}
//           <div>
//             <label className="mb-2 block text-sm font-semibold text-gray-700">
//               Product Name
//             </label>

//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="e.g. Premium Black Kurta"
//               className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#8B1E3F]"
//             />
//           </div>

//           {/* Price */}
//           <div className="mt-6">
//             <label className="mb-2 block text-sm font-semibold text-gray-700">
//               Price
//             </label>

//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               placeholder="3500"
//               min="0"
//               className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#8B1E3F]"
//             />
//           </div>

//           {/* Category */}
//           <div className="mt-6">
//             <label className="mb-2 block text-sm font-semibold text-gray-700">
//               Category
//             </label>

//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleCategoryChange}
//               className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#8B1E3F]"
//             >
//               <option value="Female">Female</option>
//               <option value="Male">Male</option>
//               <option value="Kids">Kids</option>
//             </select>
//           </div>

//           {/* Collection */}
//           <div className="mt-6">
//             <label className="mb-2 block text-sm font-semibold text-gray-700">
//               Collection
//             </label>

//             <input
//               type="text"
//               value={formData.collection}
//               readOnly
//               className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-600 outline-none"
//             />

//             <p className="mt-2 text-xs text-gray-400">
//               Collection automatically changes according to category.
//             </p>
//           </div>

//           {/* Sizes */}
//           <div className="mt-6">
//             <label className="mb-3 block text-sm font-semibold text-gray-700">
//               Available Sizes
//             </label>

//             <div className="flex flex-wrap gap-3">
//               {availableSizes[formData.category].map((size) => {
//                 const selected = formData.sizes.includes(size);

//                 return (
//                   <button
//                     type="button"
//                     key={size}
//                     onClick={() => handleSizeChange(size)}
//                     className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
//                       selected
//                         ? "border-[#8B1E3F] bg-[#8B1E3F] text-white"
//                         : "border-gray-300 bg-white text-gray-700 hover:border-[#8B1E3F]"
//                     }`}
//                   >
//                     {size}
//                   </button>
//                 );
//               })}
//             </div>

//             <p className="mt-2 text-xs text-gray-400">
//               Select all sizes that are available.
//             </p>
//           </div>

//           {/* Description */}
//           <div className="mt-6">
//             <label className="mb-2 block text-sm font-semibold text-gray-700">
//               Description
//             </label>

//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               rows="5"
//               placeholder="Write product description..."
//               className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#8B1E3F]"
//             />
//           </div>

//           {/* Image */}
//           <div className="mt-6">
//             <label className="mb-2 block text-sm font-semibold text-gray-700">
//               Product Image
//             </label>

//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm"
//             />

//             <p className="mt-2 text-xs text-gray-400">
//               JPG, PNG, WEBP etc. Maximum size: 5MB.
//             </p>
//           </div>

//           {/* Image Preview */}
//           {preview && (
//             <div className="mt-6">
//               <p className="mb-3 text-sm font-semibold text-gray-700">
//                 Image Preview
//               </p>

//               <div className="h-80 w-full overflow-hidden rounded-2xl bg-gray-100">
//                 <img
//                   src={preview}
//                   alt="Product Preview"
//                   className="h-full w-full object-cover"
//                 />
//               </div>
//             </div>
//           )}

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="mt-8 w-full rounded-full bg-[#8B1E3F] py-4 font-semibold text-white transition hover:bg-[#6f1832] disabled:cursor-not-allowed disabled:opacity-60"
//           >
//             {loading ? "Uploading & Saving..." : "Add Product"}
//           </button>
//         </form>
//       </div>
//     </main>
//   );
// }



"use client";

import { useState } from "react";
import Link from "next/link";

export default function NewProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Female",
    collection: "female",
    kidsType: "",
    sizes: [],
    description: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const availableSizes = {
    Female: ["S", "M", "L", "XL", "XXL"],
    Male: ["S", "M", "L", "XL", "XXL"],
    Kids: [
      "2-3Y",
      "3-4Y",
      "4-5Y",
      "5-6Y",
      "6-7Y",
      "7-8Y",
      "8-9Y",
    ],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;

    let collection = "female";

    if (category === "Male") {
      collection = "male";
    }

    if (category === "Kids") {
      collection = "kids";
    }

    setFormData((current) => ({
      ...current,
      category,
      collection,
      kidsType: category === "Kids" ? current.kidsType : "",
      sizes: [],
    }));
  };

  const handleSizeChange = (size) => {
    setFormData((current) => {
      const alreadySelected = current.sizes.includes(size);

      if (alreadySelected) {
        return {
          ...current,
          sizes: current.sizes.filter((item) => item !== size),
        };
      }

      return {
        ...current,
        sizes: [...current.sizes, size],
      };
    });
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    }

    setError("");
    setImage(selectedFile);

    const imageUrl = URL.createObjectURL(selectedFile);
    setPreview(imageUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!formData.name.trim()) {
      setError("Product name is required.");
      return;
    }

    if (!formData.price || Number(formData.price) < 0) {
      setError("Please enter a valid price.");
      return;
    }

    if (formData.category === "Kids" && !formData.kidsType) {
      setError("Please select Kids Type: Boys or Girls.");
      return;
    }

    if (formData.sizes.length === 0) {
      setError("Please select at least one size.");
      return;
    }

    if (!image) {
      setError("Please select a product image.");
      return;
    }

    try {
      setLoading(true);

      // STEP 1: Image Cloudinary par upload karna
      const imageFormData = new FormData();

      imageFormData.append("file", image);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: imageFormData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(
          uploadData.message || "Image upload failed."
        );
      }

      // STEP 2: Product MongoDB mein save karna
      const productResponse = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          price: Number(formData.price),
          category: formData.category,
          collection: formData.collection,
          kidsType:
            formData.category === "Kids"
              ? formData.kidsType
              : undefined,
          sizes: formData.sizes,
          image: uploadData.url,
          description: formData.description.trim(),
        }),
      });

      const productData = await productResponse.json();

      if (!productResponse.ok) {
        throw new Error(
          productData.message || "Product creation failed."
        );
      }

      setMessage("Product added successfully!");

      // Form reset
      setFormData({
        name: "",
        price: "",
        category: "Female",
        collection: "female",
        kidsType: "",
        sizes: [],
        description: "",
      });

      setImage(null);
      setPreview("");

      // File input reset
      e.target.reset();
    } catch (error) {
      console.error("ADD PRODUCT ERROR:", error);

      setError(
        error.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#8B1E3F]">
              Libas Admin
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Add New Product
            </h1>

            <p className="mt-2 text-gray-500">
              Add a new product to your Libas store.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex w-fit rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:border-[#8B1E3F] hover:text-[#8B1E3F]"
          >
            ← Back to Store
          </Link>
        </div>

        {/* Messages */}
        {message && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-700">
            ✓ {message}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-6 shadow-sm md:p-8"
        >
          {/* Product Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Premium Black Kurta"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#8B1E3F]"
            />
          </div>

          {/* Price */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="3500"
              min="0"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#8B1E3F]"
            />
          </div>

          {/* Category */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleCategoryChange}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#8B1E3F]"
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          {/* Kids Type */}
          {formData.category === "Kids" && (
            <div className="mt-6">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Kids Type
              </label>

              <select
                name="kidsType"
                value={formData.kidsType}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#8B1E3F]"
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

              <p className="mt-2 text-xs text-gray-400">
                Select whether this product is for boys or girls.
              </p>
            </div>
          )}

          {/* Collection */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Collection
            </label>

            <input
              type="text"
              value={formData.collection}
              readOnly
              className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-600 outline-none"
            />

            <p className="mt-2 text-xs text-gray-400">
              Collection automatically changes according to category.
            </p>
          </div>

          {/* Sizes */}
          <div className="mt-6">
            <label className="mb-3 block text-sm font-semibold text-gray-700">
              Available Sizes
            </label>

            <div className="flex flex-wrap gap-3">
              {availableSizes[formData.category].map((size) => {
                const selected = formData.sizes.includes(size);

                return (
                  <button
                    type="button"
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                      selected
                        ? "border-[#8B1E3F] bg-[#8B1E3F] text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:border-[#8B1E3F]"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>

            <p className="mt-2 text-xs text-gray-400">
              Select all sizes that are available.
            </p>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              placeholder="Write product description..."
              className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#8B1E3F]"
            />
          </div>

          {/* Image */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm"
            />

            <p className="mt-2 text-xs text-gray-400">
              JPG, PNG, WEBP etc. Maximum size: 5MB.
            </p>
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-gray-700">
                Image Preview
              </p>

              <div className="h-80 w-full overflow-hidden rounded-2xl bg-gray-100">
                <img
                  src={preview}
                  alt="Product Preview"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-full bg-[#8B1E3F] py-4 font-semibold text-white transition hover:bg-[#6f1832] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Uploading & Saving..."
              : "Add Product"}
          </button>
        </form>
      </div>
    </main>
  );
}
