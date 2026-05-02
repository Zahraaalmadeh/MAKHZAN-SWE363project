import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  id: Number,
  name: String,
  stock: Number,
  expiry: String,
  dept: String
});

export const InventoryModel = mongoose.model(
  "Inventory",
  inventorySchema,
  "StaffInventory"
);