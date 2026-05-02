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
import Supplier from "../models/SupplierData.js";

router.post("/supplier-login", async (req, res) => {
  try {
    const { email, supplierId } = req.body;

    const supplier = await Supplier.findOne({
      email: email.toLowerCase(),
      supplierId: supplierId.toUpperCase(),
      isActive: true
    });

    if (!supplier) {
      return res.status(401).json({
        success: false,
        message: "Invalid supplier email or ID"
      });
    }

    res.status(200).json({
      success: true,
      message: "Supplier login successful",
      user: {
        id: supplier._id,
        supplierId: supplier.supplierId,
        companyName: supplier.companyName,
        email: supplier.email,
        role: "supplier"
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});
export default router;