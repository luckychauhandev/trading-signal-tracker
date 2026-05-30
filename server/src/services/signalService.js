import { getCurrentPrice } from "./binanceService.js";

const CLOSED_STATUSES = [
    "TARGET_HIT",
    "STOPLOSS_HIT",
    "EXPIRED",
];

export const calculateROI = (
    direction,
    entryPrice,
    currentPrice
) => {
    if (direction === "BUY") {
        return (
            ((currentPrice - entryPrice) /
                entryPrice) *
            100
        );
    }

    return (
        ((entryPrice - currentPrice) /
            entryPrice) *
        100
    );
};

export const updateSignalStatus = async (
    signal
) => {
    const currentPrice =
        await getCurrentPrice(signal.symbol);

    if (
        CLOSED_STATUSES.includes(
            signal.status
        )
    ) {
        return {
            ...signal.toObject(),
            currentPrice,
        };
    }

    signal.realizedROI = calculateROI(
        signal.direction,
        signal.entryPrice,
        currentPrice
    );

    if (new Date() > signal.expiryTime) {
        signal.status = "EXPIRED";
    } else if (
        signal.direction === "BUY"
    ) {
        if (
            currentPrice >= signal.targetPrice
        ) {
            signal.status = "TARGET_HIT";
        } else if (
            currentPrice <= signal.stopLoss
        ) {
            signal.status = "STOPLOSS_HIT";
        }
    } else if (
        signal.direction === "SELL"
    ) {
        if (
            currentPrice <= signal.targetPrice
        ) {
            signal.status = "TARGET_HIT";
        } else if (
            currentPrice >= signal.stopLoss
        ) {
            signal.status = "STOPLOSS_HIT";
        }
    }

    await signal.save();

    return {
        ...signal.toObject(),
        currentPrice,
    };
};