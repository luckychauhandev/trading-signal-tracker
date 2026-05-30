import mongoose from "mongoose";

const signalSchema = new mongoose.Schema(
    {
        symbol: {
            type: String,
            required: true,
            uppercase: true,
            trim: true,
        },

        direction: {
            type: String,
            enum: ["BUY", "SELL"],
            required: true,
        },

        entryPrice: {
            type: Number,
            required: true,
        },

        stopLoss: {
            type: Number,
            required: true,
        },

        targetPrice: {
            type: Number,
            required: true,
        },

        entryTime: {
            type: Date,
            required: true,
        },

        expiryTime: {
            type: Date,
            required: true,
        },

        status: {
            type: String,
            enum: [
                "OPEN",
                "TARGET_HIT",
                "STOPLOSS_HIT",
                "EXPIRED",
            ],
            default: "OPEN",
        },

        realizedROI: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

signalSchema.pre("validate", function () {
    if (this.expiryTime <= this.entryTime) {
        throw new Error(
            "expiryTime must be greater than entryTime"
        );
    }

    if (this.direction === "BUY") {
        if (this.stopLoss >= this.entryPrice) {
            throw new Error(
                "BUY: stopLoss must be less than entryPrice"
            );
        }

        if (this.targetPrice <= this.entryPrice) {
            throw new Error(
                "BUY: targetPrice must be greater than entryPrice"
            );
        }
    }

    if (this.direction === "SELL") {
        if (this.stopLoss <= this.entryPrice) {
            throw new Error(
                "SELL: stopLoss must be greater than entryPrice"
            );
        }

        if (this.targetPrice >= this.entryPrice) {
            throw new Error(
                "SELL: targetPrice must be less than entryPrice"
            );
        }
    }
});

export default mongoose.model("Signal", signalSchema);