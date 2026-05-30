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