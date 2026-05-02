import express from "express";
import { StaffModel } from "../models/StaffData.js";
const router = express.Router();



router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("BODY:", req.body); 


    const user = await StaffModel.findOne({
      $or: [{ username }, { email: username }]
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Wrong password" });
    }
    console.log("INPUT:", username);
    console.log("USER FOUND:", user);

    res.json(user);

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server crashed" });
  }
});

export default router;