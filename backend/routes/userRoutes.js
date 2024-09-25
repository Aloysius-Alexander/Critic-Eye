import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import Movie from "../models/movieModel.js";
import Review from "../models/reviewModel.js";
import { generateToken } from "../utils/generateToken.js";
import authenticateUser from "../middlewares/userMiddleware.js";

const userRouter = express.Router();

// User SignUp
userRouter.post("/SignUp", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const userExist = await User.findOne({ email: email.toLowerCase() });

        if (userExist) return res.send("User already exists");

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstName, lastName, email: email.toLowerCase(), hashPassword });
        await newUser.save();

        const token = generateToken(newUser.email);
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'None' });
        res.send("Signed up successfully");
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// User Add Review
userRouter.post("/add-review", authenticateUser, async (req, res) => {
    try {
        const { movieId, rating, content } = req.body;
        const user = await User.findOne({ email: req.user.data });

        const newReview = new Review({
            movieId,
            userId: user._id,
            userName: user.firstName,
            rating,
            content
        });

        await newReview.save();
        const reviews = await Review.find({ movieId });
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = (totalRating / reviews.length).toFixed(1);

        const movie = await Movie.findById(movieId);
        movie.averageRating = averageRating;
        await movie.save();

        res.send("Review added successfully");
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

export default userRouter;
