import express from "express";
import { addBook, getAllBooks, getBookById, updateBook, deleteBook,approveBook,rejectBook } from "../controller/booksController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { uploadFiles } from "../middleware/upload.js";

const router = express.Router();

router.post("/", uploadFiles,addBook);
router.get("/", getAllBooks);
router.get("/:id",getBookById);
router.put("/:id",updateBook);
router.put("/:id/approve",approveBook)
router.put("/:id/reject",rejectBook)
router.delete("/:id",deleteBook);

export default router;