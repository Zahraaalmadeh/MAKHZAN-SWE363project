import express from "express";
import mongoose from "mongoose";
import { StaffModel } from "../models/StaffData.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const staff = await StaffModel.find();
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const staff = await StaffModel.findById(req.params.id);

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;