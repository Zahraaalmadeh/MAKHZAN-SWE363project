import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    requestId: { type: Number, unique: true },

    staffId: { type: mongoose.Schema.Types.ObjectId, ref: "staff" },
    staffName: String,
    department: String,

    itemName: String,
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "inventory" },

    quantity: { type: Number, required: true },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    reason: String
  },
  { timestamps: true }
);

export const RequestModel = mongoose.model("requests", requestSchema);