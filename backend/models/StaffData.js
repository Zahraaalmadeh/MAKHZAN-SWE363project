import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
      staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StaffData", 
    required: true
  },

    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    username: { type: String, required: true, unique: true }, 

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["staff", "manager", "admin", "supplier"],
      required: true
    },

    department: {
      type: String,
      enum: [
        "icu",
        "er",
        "opd",
        "surgery",
        "pharmacy",
        "radiology",
        "blood_bank"
      ]
    },

    phone: String,

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true 
  }
);

export const StaffModel = mongoose.model("staff", staffSchema);