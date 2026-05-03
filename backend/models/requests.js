import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
        staffId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "StaffData", 
       required: true
     },

    staffName:{ type: String, 
      required: true },

    department: String,

    itemName: String,

    quantity: { type: Number, required: true },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium"
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    }
  },
  { timestamps: true }
);


export const RequestModel = mongoose.model("SRequests", requestSchema);

