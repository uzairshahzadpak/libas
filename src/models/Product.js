

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      required: true,
      enum: ["Female", "Male", "Kids"],
    },

    collection: {
      type: String,
      required: true,
      enum: ["female", "male", "kids"],
    },

    // Only for Kids products
    kidsType: {
      type: String,
      enum: ["boys", "girls"],
      default: undefined,
    },

    sizes: {
      type: [String],
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema);

export default Product;

