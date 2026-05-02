import express from "express";
import { RequestModel } from "../models/requests.js";

const router = express.Router();
router.post("/", async (req, res) => {
  try {
    const newRequest = await RequestModel.create(req.body);
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/", async (req, res) => {
  const data = await RequestModel.find();
  res.json(data);
});
export default router;