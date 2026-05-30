import express from "express";
import cors from "cors";
import signalRoutes from "./routes/signalRoutes.js";

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
    })
);
app.use(express.json());

app.use("/api/signals", signalRoutes);

export default app;