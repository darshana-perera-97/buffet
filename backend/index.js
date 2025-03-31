const express = require('express');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 5111;

// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

// POST /createHotel with image upload
app.post('/createHotel', upload.single('FeaturedImage'), (req, res) => {
  const {
    HotelName,
    description,
    Location,
    contactNumber,
    State,
  } = req.body;

  // Validate required fields
  if (!HotelName || !State) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Generate HotelId and process image
  const HotelId = 'HTL-' + Date.now();
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  // Create hotel object
  const newHotel = {
    HotelId,
    HotelName,
    description,
    FeaturedImage: imagePath,
    Location,
    contactNumber,
    State,
  };

  const filePath = 'hotels.json';
  let hotels = [];

  // Load existing hotels if file exists
  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath);
      hotels = JSON.parse(data);
      if (!Array.isArray(hotels)) hotels = [];
    } catch {
      hotels = [];
    }
  }

  // Add new hotel and save to file
  hotels.push(newHotel);
  fs.writeFileSync(filePath, JSON.stringify(hotels, null, 2));

  // Respond with success
  res.json({ message: 'Hotel created successfully', hotel: newHotel });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
