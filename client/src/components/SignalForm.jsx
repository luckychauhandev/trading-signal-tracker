import { useState } from "react";
import { createSignal } from "../api/signalApi";

const initialState = {
  symbol: "",
  direction: "BUY",
  entryPrice: "",
  stopLoss: "",
  targetPrice: "",
  entryTime: "",
  expiryTime: "",
};

const SignalForm = ({ onSignalCreated }) => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createSignal({
        ...formData,
        entryPrice: Number(formData.entryPrice),
        stopLoss: Number(formData.stopLoss),
        targetPrice: Number(formData.targetPrice),
      });

      setFormData(initialState);

      if (onSignalCreated) {
        onSignalCreated();
      }
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);

      alert(error.response?.data?.message || "Failed to create signal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-2xl bg-white p-6 shadow-md"
    >
      <h2 className="mb-6 text-2xl font-bold">Create Signal</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          name="symbol"
          placeholder="BTCUSDT"
          value={formData.symbol}
          onChange={handleChange}
          className="rounded-lg border p-3"
          required
        />

        <select
          name="direction"
          value={formData.direction}
          onChange={handleChange}
          className="rounded-lg border p-3"
        >
          <option value="BUY">BUY</option>
          <option value="SELL">SELL</option>
        </select>

        <input
          type="number"
          name="entryPrice"
          placeholder="Entry Price"
          value={formData.entryPrice}
          onChange={handleChange}
          className="rounded-lg border p-3"
          required
        />

        <input
          type="number"
          name="stopLoss"
          placeholder="Stop Loss"
          value={formData.stopLoss}
          onChange={handleChange}
          className="rounded-lg border p-3"
          required
        />

        <input
          type="number"
          name="targetPrice"
          placeholder="Target Price"
          value={formData.targetPrice}
          onChange={handleChange}
          className="rounded-lg border p-3"
          required
        />

        <input
          type="datetime-local"
          name="entryTime"
          value={formData.entryTime}
          onChange={handleChange}
          className="rounded-lg border p-3"
          required
        />

        <input
          type="datetime-local"
          name="expiryTime"
          value={formData.expiryTime}
          onChange={handleChange}
          className="rounded-lg border p-3"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-lg bg-black px-4 py-3 text-white transition hover:bg-gray-800"
      >
        {loading ? "Creating..." : "Create Signal"}
      </button>
    </form>
  );
};

export default SignalForm;
