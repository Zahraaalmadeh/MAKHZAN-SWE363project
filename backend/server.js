import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./db.js";

import inventoryRoutes from "./routes/inventoryStaffDB.routes.js";
import staffRoutes from "./routes/staffRoutes.js";
import requestRoutes from "./routes/requestsRoute.js";
import authRoutes from "./routes/authRoutes.js";
import staffReqRoutes from "./routes/staffReqRoute.js";

import supplierRoutes from "./routes/supplierRoutes.js";
import availabilityRoutes from "./routes/availabilityRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB().catch(() => {
  console.warn("DB connection failed");
});

app.use("/inventoryStaffDB", inventoryRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/auth", authRoutes);
<<<<<<< Updated upstream
app.use("/api/requests/my", staffReqRoutes);

app.use("/api/suppliers", supplierRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/messages", messageRoutes);

=======
app.use("/api/suppliers", SupplierRoutes);
app.use("/api/availability", AvailabilityRoutes);
app.use("/api/delivery", DeliveryRoutes);
app.use("/api/documents", DocumentRoutes);
app.use("/api/messages", MessageRoutes);
app.use("/api/srequests", staffReqRoutes);
>>>>>>> Stashed changes
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});