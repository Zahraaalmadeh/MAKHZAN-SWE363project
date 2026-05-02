import express from "express";
import { RequestModel } from "../models/requests.js";
import mongoose from "mongoose";


const router = express.Router();
router.get("/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const requests = await RequestModel.find({
      username: username
    });

    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;