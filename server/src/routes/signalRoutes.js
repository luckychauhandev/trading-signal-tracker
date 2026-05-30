import { Router } from "express";
import {
    createSignal,
    getSignals,
    getSignalById,
} from "../controllers/signalController.js";

const router = Router();


router.post("/", createSignal);
router.get("/", getSignals);
router.get("/:id", getSignalById);

export default router;