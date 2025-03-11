import express from "express";
import { registerUser,loginUser, getAllUsers, getUserById, updateUser, deleteUser,verifyOtp } from "../controller/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register" ,registerUser);
router.post("/login", loginUser);
router.get("/",authMiddleware,getAllUsers);
router.get("/:id",authMiddleware,getUserById);
router.put("/:id",authMiddleware,updateUser);
router.delete("/:id",authMiddleware,deleteUser);
router.post("/verify-otp", verifyOtp);



export default router;