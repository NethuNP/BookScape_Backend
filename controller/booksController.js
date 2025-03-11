import Book from "../model/Books.js";
import fs from "fs";
import { uploadFiles } from "../middleware/upload.js";

// Add a Book with File Uploads
export const addBook = async (req, res) => {
  try {
    console.log(req.files);
    const { author, title, summary, genre, language, format } = req.body;

    const coverImage = req.files?.coverImage
      ? req.files.coverImage[0].path
      : null;
    const ebookFile = req.files?.ebookFile ? req.files.ebookFile[0].path : null;
    const audioLink = req.body.audioLink || null;
    const videoLink = req.body.videoLink || null;

    console.log("Cover Image Path:", coverImage);
    console.log("Ebook File Path:", ebookFile);

    const book = new Book({
      title,
      author,
      summary,
      genre,
      language,
      format,
      coverImage,
      ebookFile,
      audioLink,
      videoLink,
      createdAt: new Date(),
    });

    await book.save();
    res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ message: "Fetched all books", books });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a Book by ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.status(200).json({ message: "Fetched book by ID", book });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a Book with File Uploads
export const updateBook = async (req, res) => {
  try {
    uploadFiles(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      const { title, author, description } = req.body;
      let updateData = { title, author, description };

      if (req.files?.coverImage)
        updateData.coverImage = req.files.coverImage[0].path;
      if (req.files?.ebookFile)
        updateData.ebookFile = req.files.ebookFile[0].path;

      const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      if (!updatedBook)
        return res.status(404).json({ message: "Book not found" });

      res
        .status(200)
        .json({ message: "Book updated successfully", book: updatedBook });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Delete files from storage
    if (book.coverImage) fs.unlinkSync(book.coverImage);
    if (book.ebookFile) fs.unlinkSync(book.ebookFile);

    await book.deleteOne();
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const approveBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.status = "Approved";
    await book.save();
    res.status(200).json({ message: "Book approved successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const rejectBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.status = "Rejected";
    await book.save();
    res.status(200).json({ message: "Book rejected successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
