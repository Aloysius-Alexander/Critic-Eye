import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import Review from "../models/reviewModel.js";
import Movie from "../models/movieModel.js";
import { generateToken } from "../utils/generateToken.js";
import authenticateUser from "../middlewares/userMiddleware.js";
import { check, validationResult } from "express-validator";

const userRouter = express.Router();

// User Sign-Up
userRouter.post(
  "/SignUp",
  [
    check("firstName").notEmpty().withMessage("First Name is required"),
    check("lastName").notEmpty().withMessage("Last Name is required"),
    check("email").isEmail().withMessage("Valid Email is required"),
    check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { firstName, lastName, email, password } = req.body;
      const userExist = await User.findOne({ email: email.toLowerCase() });

      if (userExist) return res.status(400).send("User already exists");

      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ firstName, lastName, email: email.toLowerCase(), hashPassword });
      await newUser.save();

      const token = generateToken(newUser.email);
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      res.status(201).send("Signed Up successfully!");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// User Sign-In
userRouter.post(
  "/SignIn",
  [
    check("email").isEmail().withMessage("Valid Email is required"),
    check("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email.toLowerCase() });

      if (!user) return res.status(404).send("User not found");

      const matchPassword = await bcrypt.compare(password, user.hashPassword);
      if (!matchPassword) return res.status(400).send("Invalid password");

      const token = generateToken(user.email);
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
  }
);

// Add Review to a Movie
userRouter.post(
  "/add-review",
  authenticateUser,
  [
    check("movieId").notEmpty().withMessage("Movie ID is required"),
    check("rating").isNumeric().withMessage("Rating should be a number"),
    check("content").notEmpty().withMessage("Review content is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { movieId, rating, content } = req.body;
      const user = await User.findOne({ email: req.user.data });

      const movie = await Movie.findById(movieId);
      if (!movie) {
        return res.status(404).send("Movie not found");
      }

      const newReview = new Review({
        movieId,
        userId: user._id,
        userName: user.firstName,
        rating,
        content,
      });

      await newReview.save();

      const reviews = await Review.find({ movieId });
      const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
      const averageRating = (totalRating / reviews.length).toFixed(1);

      movie.averageRating = averageRating;
      await movie.save();

      res.status(201).send("Review added successfully");
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }
);

// Get All Movies (For User)
userRouter.get("/home", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Get User Profile
userRouter.get("/profile", authenticateUser, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.data });
    if (!user) return res.status(404).send("User not found");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Get Reviews for a Movie
userRouter.get("/movie/:id/get-reviews", async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.id });
    if (!reviews.length) return res.status(404).send("No reviews found");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// User Logout
userRouter.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  res.send("Logged out successfully");
});

// Check User Authentication
userRouter.get("/check-auth", authenticateUser, async (req, res) => {
  res.status(200).send("User is authenticated");
});

export default userRouter;
