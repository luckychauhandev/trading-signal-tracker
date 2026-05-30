import { Router } from "express";
import { createSignal } from "../controllers/signalController.js";

const router = Router();

router.post("/", createSignal);

export default router;