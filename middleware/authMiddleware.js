import jwt from "jsonwebtoken";
import user from "../model/User.js";

const authMiddleware = async (req, res, next) =>{
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]; 
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 
      req.user = await user.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
}
  }
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
};

export default authMiddleware