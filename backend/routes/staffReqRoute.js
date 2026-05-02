import express from "express";
import { RequestModel } from "../models/requests.js";
import mongoose from "mongoose";


const router = express.Router();
router.get("/my/:_id", async (req, res) => {
  try {
    const requests = await RequestModel.find({
      staffId: req.params._id
    });

    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;