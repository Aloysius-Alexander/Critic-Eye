import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connect } from "../configs/db.js";
import userRouter from "../routes/userRoutes.js";
import adminRouter from "../routes/adminRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);

connect();

app.get("/", (req, res) => {
    res.send("Welcome to Critic Eye");
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
