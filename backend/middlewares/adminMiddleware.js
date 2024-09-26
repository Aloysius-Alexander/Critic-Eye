import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenticateAdmin = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).send("No token provided");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, admin) => {
    if (err) {
      return res.status(401).send({ message: "Admin verification error" });
    }

    req.admin = admin;
    next();
  });
};

export default authenticateAdmin;
