const mongoose = require("mongoose");

// creating our Schema
const FavoritesBookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    authors: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    edition: {
      type: String,
      required: false,
    },
    format: {
      type: String,
      required: true,
    },
    genres: {
      type: String,
      required: false,
    },
    image_url: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("FavoritesBook", FavoritesBookSchema);
