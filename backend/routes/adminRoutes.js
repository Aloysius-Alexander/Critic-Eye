import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import User from "../models/userModel.js";
import Movie from "../models/movieModel.js";
import Review from "../models/reviewModel.js";
import bcrypt from "bcrypt";
import Admin from "../models/adminModel.js";
import { adminToken } from "../utils/generateToken.js";
import { cloudinaryInstance } from "../configs/cloudinary.js";
import authenticateAdmin from "../middlewares/adminMiddleware.js";
import { check, validationResult } from "express-validator";

const adminRouter = express.Router();

// Admin Sign-Up
adminRouter.post("/SignUp", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const adminExist = await Admin.findOne({ email: email.toLowerCase() });

    if (adminExist) return res.status(400).send("Admin already exists");

    const hashPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, email: email.toLowerCase(), hashPassword });
    await newAdmin.save();

    const token = adminToken(newAdmin);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.status(201).send("Admin created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Admin Sign-In
adminRouter.post("/SignIn", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) return res.status(404).send("Admin not found");

    const matchPassword = await bcrypt.compare(password, admin.hashPassword);
    if (!matchPassword) return res.status(400).send("Invalid password");

    const token = adminToken(admin);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.send("Logged In!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Add Movie
adminRouter.post("/add-movie", 
  upload.single("posterUrl"),
  [
    check("title").notEmpty().withMessage("Title is required"),
    check("releaseYear").isNumeric().withMessage("Release Year should be a number"),
    check("genre").notEmpty().withMessage("Genre is required"),
    check("summary").notEmpty().withMessage("Summary is required")
  ],
  authenticateAdmin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, director, releaseYear, genre, summary, trailerUrl } = req.body;
      const result = await cloudinaryInstance.uploader.upload(req.file.path);
      const newMovie = new Movie({
        title,
        director,
        releaseYear,
        genre,
        summary,
        trailerUrl,
        posterUrl: result.url
      });
      await newMovie.save();
      res.status(201).send("Movie added successfully");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// Update Movie by ID
adminRouter.put("/update-movie/:id", upload.single("posterUrl"), authenticateAdmin, async (req, res) => {
  try {
    const { title, director, releaseYear, genre, summary, trailerUrl } = req.body;
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("Movie not found");

    if (req.file) {
      const result = await cloudinaryInstance.uploader.upload(req.file.path);
      movie.posterUrl = result.url;
    }

    movie.title = title || movie.title;
    movie.director = director || movie.director;
    movie.releaseYear = releaseYear || movie.releaseYear;
    movie.genre = genre || movie.genre;
    movie.summary = summary || movie.summary;
    movie.trailerUrl = trailerUrl || movie.trailerUrl;

    await movie.save();
    res.status(200).send("Movie updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete Movie by ID
adminRouter.delete("/delete-movie/:id", authenticateAdmin, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).send("Movie not found");
    res.status(200).send("Movie deleted successfully");
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get All Movies with Pagination and Search
adminRouter.get("/show-movies", async (req, res) => {
  try {
    const { page = 1, limit = 10, genre } = req.query;
    const filter = genre ? { genre } : {};

    const movies = await Movie.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const totalMovies = await Movie.countDocuments(filter);
    res.status(200).json({ totalMovies, movies });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get Movie by ID
adminRouter.get("/movie/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("Movie not found");
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get Reviews for a Movie
adminRouter.get("/movie/:id/get-reviews", async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.id });
    if (!reviews.length) return res.status(404).send("No reviews found");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Admin Overview
adminRouter.get("/overview", authenticateAdmin, async (req, res) => {
  try {
    const recentUsers = await User.countDocuments({
      createdAt: { $gt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    });
    const totalUsers = await User.countDocuments();
    const recentReviews = await Review.countDocuments({
      createdAt: { $gt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    });
    const totalReviews = await Review.countDocuments();
    const recentMovies = await Movie.countDocuments({
      createdAt: { $gt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    });
    const totalMovies = await Movie.countDocuments();

    res.status(200).json({
      recentUsers,
      totalUsers,
      recentReviews,
      totalReviews,
      recentMovies,
      totalMovies,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// User Management Routes

// List All Users with Pagination
adminRouter.get("/user-list", authenticateAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const totalUsers = await User.countDocuments();
    res.status(200).json({ totalUsers, users });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get User by ID
adminRouter.get("/show-user/:id", authenticateAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send({ message: "User not found" });
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Delete User by ID
adminRouter.delete("/delete-user/:id", authenticateAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      res.status(404).send({ message: "User not found" });
    } else {
      res.status(200).send({ message: "User deleted successfully" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Check Admin Authentication
adminRouter.get("/check-admin", authenticateAdmin, async (req, res) => {
  const admin = req.admin;
  if (!admin) {
    return res.json({ message: "Middleware authentication error" });
  }
  const findAdmin = await Admin.findOne({ email: admin.email });
  if (!findAdmin) {
    return res.json({ message: "Authentication failed", success: false });
  }
  res.json({ message: "Authenticated Admin", success: true });
});

export default adminRouter;
