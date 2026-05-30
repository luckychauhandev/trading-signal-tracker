import axios from "axios";

export const getCurrentPrice = async (symbol) => {
    const { data } = await axios.get(
        `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
    );

    return Number(data.price);
};