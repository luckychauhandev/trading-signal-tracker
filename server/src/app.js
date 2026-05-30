import express from "express";
import signalRoutes from "./routes/signalRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/signals", signalRoutes);

export default app;