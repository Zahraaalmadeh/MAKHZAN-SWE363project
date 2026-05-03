import express from "express";
import { RequestModel } from "../models/requests.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await RequestModel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/user/:id", async (req, res) => {
  try {
    const staffId = req.params.id;

    const requests = await RequestModel.find({
      staffId: staffId
    });

    console.log("REQUESTS:", requests);

    if (!requests.length) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(requests);

  } catch (err) {
    console.log("ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;