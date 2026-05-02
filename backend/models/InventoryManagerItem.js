import mongoose from "mongoose";

const inventoryManagerItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    productionDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    department: { type: String, required: true },
    supplier: { type: String, required: true },
    lowStockThreshold: { type: Number, default: 5 },
    removed: { type: Boolean, default: false },
    removedReason: String
  },
  { timestamps: true }
);

export const InventoryManagerItem = mongoose.model(
  "InventoryManagerItem",
  inventoryManagerItemSchema
);