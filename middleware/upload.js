import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure directories exist
const coverImageDir = "uploads/covers/";
const ebookDir = "uploads/ebooks/";

[coverImageDir, ebookDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "coverImage") {
      cb(null, coverImageDir); 
    } else if (file.fieldname === "ebookFile") {
      cb(null, ebookDir); 
    } else {
      cb(new Error("Invalid file field name"), "");
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

// Multer Upload Middleware
export const uploadFiles = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Allowed file types
    const allowedTypes = {
      coverImage: ["image/png", "image/jpeg"],
      ebookFile: ["application/pdf"],
    };

    if (file.fieldname === "coverImage" && !allowedTypes.coverImage.includes(file.mimetype)) {
      return cb(new Error("Only .png and .jpg files are allowed for cover images"));
    }

    if (file.fieldname === "ebookFile" && !allowedTypes.ebookFile.includes(file.mimetype)) {
      return cb(new Error("Only .pdf files are allowed for ebooks"));
    }

    cb(null, true);
  },
}).fields([
  { name: "coverImage", maxCount: 1 },
  { name: "ebookFile", maxCount: 1 }, 
]);

