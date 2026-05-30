import { Router } from "express";
import {
    createSignal,
    getSignals,
    getSignalById,
    deleteSignal,
} from "../controllers/signalController.js";

const router = Router();


router.post("/", createSignal);
router.get("/", getSignals);
router.get("/:id", getSignalById);
router.delete("/:id", deleteSignal);

export default router;