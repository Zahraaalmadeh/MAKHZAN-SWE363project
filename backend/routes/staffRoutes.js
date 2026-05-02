import express from "express";
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