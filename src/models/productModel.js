"use strict";

const { Schema, model } = require("mongoose");

const { isURL } = require("validator");

const ProductSchema = new Schema(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    discountPercentage: {
      type: Number,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
    },
    stock: {
      type: Number,
      trim: true,
      required: true,
    },
    brand: {
      type: String,
      trim: true,
      required: true,
    },

    thumbnail: {
      type: String,
      required: true,
      validate: [isURL, "Please enter a valid URL"],
    },
    images: [
      {
        type: String,
        validate: [isURL, "Please enter a valid URL"],
      },
    ],
  },
  { collection: "Products", timestamps: true }
);
module.exports= model("Product", ProductSchema)
