import mongoose from "mongoose";
import { products } from "../src/data/products.js";
import Product from "../src/models/Product.js";

const MONGODB_URI = process.env.MONGODB_URI;

async function seedProducts() {
  try {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is missing.");
    }

    await mongoose.connect(MONGODB_URI, {
      dbName: "libas",
    });

    console.log("MongoDB connected.");

    const existingProducts = await Product.countDocuments();

    if (existingProducts > 0) {
      console.log(
        `Database already has ${existingProducts} products.`
      );

      await mongoose.disconnect();
      return;
    }

    const productsForDatabase = products.map((product) => ({
      name: product.name,
      price: product.price,
      category: product.category,
      collection: product.collection,
      sizes: product.sizes,
      image: product.image,
      description: product.description || "",
    }));

    await Product.insertMany(productsForDatabase);

    console.log(
      `${productsForDatabase.length} products added successfully.`
    );

    await mongoose.disconnect();

    console.log("MongoDB disconnected.");
  } catch (error) {
    console.error("SEED PRODUCTS ERROR:", error);

    process.exit(1);
  }
}

seedProducts();