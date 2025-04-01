const express = require("express");
const fs = require("fs");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 5111;

// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

// POST /createHotel with image upload
app.post("/createHotel", upload.single("FeaturedImage"), (req, res) => {
  const { HotelName, description, Location, contactNumber, State } = req.body;

  // Validate required fields
  if (!HotelName || !State) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Generate HotelId and process image
  const HotelId = "HTL-" + Date.now();
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

  const filePath = "hotels.json";
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
  res.json({ message: "Hotel created successfully", hotel: newHotel });
});

// GET /getHotels — returns all hotel data
app.get("/getHotels", (req, res) => {
  const filePath = "hotels.json";

  if (!fs.existsSync(filePath)) {
    return res.json([]); // return empty array if no file
  }

  try {
    const data = fs.readFileSync(filePath);
    const hotels = JSON.parse(data);
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: "Failed to read hotels.json" });
  }
});

// POST /addUserToHotel — add a user with role to a specific hotel
app.post("/addUserToHotel", (req, res) => {
  const { HotelId, email, password, role } = req.body;

  // Validate required fields
  if (!HotelId || !email || !password || !role) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Check if hotel exists
  const hotelFilePath = "hotels.json";
  let hotels = [];
  if (fs.existsSync(hotelFilePath)) {
    try {
      const data = fs.readFileSync(hotelFilePath);
      hotels = JSON.parse(data);
    } catch {
      return res.status(500).json({ error: "Failed to read hotels data" });
    }
  }

  const hotelExists = hotels.find((h) => h.HotelId === HotelId);
  if (!hotelExists) {
    return res.status(404).json({ error: "Hotel not found" });
  }

  // Load existing users
  const usersFilePath = "users.json";
  let users = [];
  if (fs.existsSync(usersFilePath)) {
    try {
      const data = fs.readFileSync(usersFilePath);
      users = JSON.parse(data);
    } catch {
      users = [];
    }
  }

  // Check for duplicate email within the same hotel
  const existingUser = users.find(
    (u) => u.email === email && u.HotelId === HotelId
  );
  if (existingUser) {
    return res
      .status(400)
      .json({ error: "User already exists for this hotel" });
  }

  // Create new user
  const userId = "USR-" + Date.now();
  const newUser = {
    userId,
    email,
    password, // In production, you must hash this
    role,
    HotelId,
  };

  users.push(newUser);
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

  res.json({ message: "User added successfully", user: newUser });
});

// GET /getUsers — returns all users
app.get("/getUsers", (req, res) => {
  const filePath = "users.json";

  if (!fs.existsSync(filePath)) return res.json([]);

  try {
    const data = fs.readFileSync(filePath);
    const users = JSON.parse(data);
    res.json(users);
  } catch {
    res.status(500).json({ error: "Failed to read users.json" });
  }
});

// DELETE /deleteUser/:userId — deletes a user by ID
app.delete("/deleteUser/:userId", (req, res) => {
  const { userId } = req.params;
  const filePath = "users.json";

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "User data not found" });
  }

  let users = [];
  try {
    const data = fs.readFileSync(filePath);
    users = JSON.parse(data);
  } catch {
    return res.status(500).json({ error: "Failed to read users file" });
  }

  const updatedUsers = users.filter((u) => u.userId !== userId);
  if (users.length === updatedUsers.length) {
    return res.status(404).json({ error: "User not found" });
  }

  fs.writeFileSync(filePath, JSON.stringify(updatedUsers, null, 2));
  res.json({ message: "User deleted successfully" });
});

// POST /login — authenticate user
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  const filePath = "users.json";

  if (!fs.existsSync(filePath))
    return res.status(404).json({ error: "User data not found" });

  const data = fs.readFileSync(filePath);
  const users = JSON.parse(data);

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  res.json({
    message: "Login successful",
    userId: user.userId,
    role: user.role,
    HotelId: user.HotelId,
    email: user.email,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
