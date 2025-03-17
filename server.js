import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import errorHandler from "./utils/errorHandler.js";
import booksRoutes from "./routes/booksRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// dotenv.config();

const app = express();

connectDB();

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/books", booksRoutes);
app.use("/api/users", userRoutes);
app.use("/uploads", express.static("uploads"));

// // Webhook needs raw body
// app.post('/api/payment/webhook', express.raw({type: 'application/json'}),
//   (req, res) => paymentController.handleWebhook(req, res));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
