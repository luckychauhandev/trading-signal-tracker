import Signal from "../models/Signal.js";

export const createSignal = async (req, res) => {
    try {
        const signal = await Signal.create(req.body);

        res.status(201).json({
            success: true,
            data: signal,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getSignals = async (req, res) => {
    try {
        const signals = await Signal.find().sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            count: signals.length,
            data: signals,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getSignalById = async (req, res) => {
    try {
        const signal = await Signal.findById(req.params.id);

        if (!signal) {
            return res.status(404).json({
                success: false,
                message: "Signal not found",
            });
        }

        res.status(200).json({
            success: true,
            data: signal,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};