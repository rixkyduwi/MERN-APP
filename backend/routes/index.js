import express from "express";
import { getUsers, updateUser, deleteUser, Register, Login, Logout } from "../controllers/Users.js";
import { getData, createData, updateData, deleteData, getDataById, getDataForStatus, getDataByUserId } from "../controllers/Data.js";
import { verifyToken, authorizeRole } from '../middleware/VerifyToken.js';

const router = express.Router();

// Route user
router.get("/users", getUsers);
router.post("/users", Register);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.post("/login", Login);
// router.get("/token", refreshToken);
router.delete("/logout", Logout);

// Middleware to verify token for all /data routes
router.use('/data', verifyToken);

// Route Data
router.post("/data", createData);
router.get("/data", getData);
router.put("/data/:id", updateData);
router.delete("/data/:id", deleteData);
router.get("/data/:id", getDataById);
router.get("/data/status/:status", getDataForStatus); 
router.get("/data/user/:userId", getDataByUserId);

export default router;
