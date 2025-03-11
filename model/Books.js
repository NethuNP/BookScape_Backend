import mongoose from "mongoose";
import Counter from "./Counter.js";

const { Schema, model } = mongoose;

const bookSchema = new Schema(
  {
    book_id: { type: String, unique: true },
    author: { type: String },
    title: { type: String },
    summary: { type: String },
    genre: { type: String },
    language: { type: String },
    format: { type: String, enum: ["Ebook", "Audio", "Video"] },
    coverImage: { type: String },
    ebookFile: { type: String },
    audioLink: { type: String },
    videoLink: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

bookSchema.pre("save", async function (next) {
  if (!this.book_id) {
    const count = await Counter.findOneAndUpdate(
      { name: "book_counter" }, 
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    this.book_id = count.sequence_value; 
  }
  next();
});

export default model("Book", bookSchema);
