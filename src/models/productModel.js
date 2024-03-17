"use strict";

const mongoose = require("mongoose");

const productsCategorySchema = new mongoose.Schema(
  { name: { type: String, required: true, trim: true } },
  { collection: "productsCategory", timestamps: true }
);

const productsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
    },
    productCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productsCategory",
      required: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    price: {
      type: Number,
      trim: true,
      required: [true, "Price is required"],
    },
    rating: {
      type: Number,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      trim: true,
    },
    thumbnail: {
      type: String,
      required: true,
      trim: true,
    },
    image: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],

    discountPercentage: { type: Number, required: true, trim: true },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    collection: "products",
    timestamps: true,
  }
);

module.exports= {
    ProductsCategory: mongoose.model("ProductsCategory", productsCategorySchema),
    Products:mongoose.model("Products",productsSchema)
}