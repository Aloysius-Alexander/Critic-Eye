import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import Movie from "../models/movieModel.js";
import Review from "../models/reviewModel.js";
import bcrypt from "bcrypt";
import Admin from "../models/adminModel.js";
import { adminToken } from "../utils/generateToken.js";
import { cloudinaryInstance } from "../configs/cloudinary.js";
import authenticateAdmin from "../middlewares/adminMiddleware.js";

const adminRouter = express.Router();

// Admin Signup
adminRouter.post("/SignUp", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const adminExist = await Admin.findOne({ email: email.toLowerCase() });

        if (adminExist) return res.send("Admin already exists");

        const hashPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ name, email: email.toLowerCase(), hashPassword });
        await newAdmin.save();

        const token = adminToken(newAdmin);
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'None' });
        res.json({ message: "Admin created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Admin Movie CRUD
adminRouter.post("/add-movie", upload.single("posterUrl"), async (req, res) => {
    try {
        const { title, director, releaseYear, genre, summary, trailerUrl } = req.body;
        const result = await cloudinaryInstance.uploader.upload(req.file.path);
        const newMovie = new Movie({
            title, director, releaseYear, genre, summary, trailerUrl,
            posterUrl: result.url
        });
        await newMovie.save();
        res.send("Movie created successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

adminRouter.put("/update-movie/:id", upload.single("posterUrl"), async (req, res) => {
    try {
        const { title, director, releaseYear, genre, summary, trailerUrl } = req.body;
        const id = req.params.id;
        const updateData = { title, director, releaseYear, genre, summary, trailerUrl };

        if (req.file) {
            const result = await cloudinaryInstance.uploader.upload(req.file.path);
            updateData.posterUrl = result.url;
        }

        const updatedMovie = await Movie.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).send({ message: "Movie updated successfully", movie: updatedMovie });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

adminRouter.delete("/delete-movie/:id", async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: "Movie deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

export default adminRouter;
