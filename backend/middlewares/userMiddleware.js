import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenticateUser = (req, res, next) => {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).send("No token provided");
  }

  // Verify the token using the same secret key
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send("Failed to authenticate token");
    }

    req.user = user;  // Attach user information to the request object
    next();
  });
};

export default authenticateUser;
//n