const express = require("express");
const multer = require("multer");
const path = require("path");
const tesseract = require("tesseract.js");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.static(path.join(__dirname, "/uploads")));
app.use(cors());
app.use(express.json()); // handling JSON data


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage: storage });


app.post("/api/extractTextFromImage", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded!" });
    }

    console.log("Uploaded file:", req.file.path); 

    
    const {
      data: { text },
    } = await tesseract.recognize(req.file.path, "eng");

    console.log("Extracted Text:", text);
    res.json({ text });

  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Text extraction failed!" });
  }
});


app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
