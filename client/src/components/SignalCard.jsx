import { deleteSignal } from "../api/signalApi";

const SignalCard = ({ signal, onSignalDeleted }) => {
  const handleDelete = async () => {
    try {
      await deleteSignal(signal._id);

      onSignalDeleted();
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to delete signal");
    }
  };

  const getTimeRemaining = (expiryTime) => {
    const expiry = new Date(expiryTime);

    const now = new Date();

    const diff = expiry - now;

    if (diff <= 0) {
      return "Expired";
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m`;
  };

  const statusClasses = {
    OPEN: "bg-blue-100 text-blue-700",
    TARGET_HIT: "bg-green-100 text-green-700",
    STOPLOSS_HIT: "bg-red-100 text-red-700",
    EXPIRED: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold">{signal.symbol}</h2>

          <p className="mt-1 text-sm text-gray-500">{signal.direction}</p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            statusClasses[signal.status]
          }`}
        >
          {signal.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Entry Price</p>

          <p className="font-semibold">{signal.entryPrice}</p>
        </div>

        <div>
          <p className="text-gray-500">Current Price</p>

          <p className="font-semibold">{signal.currentPrice ?? "N/A"}</p>
        </div>

        <div>
          <p className="text-gray-500">Target Price</p>

          <p className="font-semibold">{signal.targetPrice}</p>
        </div>

        <div>
          <p className="text-gray-500">Stop Loss</p>

          <p className="font-semibold">{signal.stopLoss}</p>
        </div>

        <div>
          <p className="text-gray-500">ROI</p>

          <p className="font-semibold">
            {Number(signal.realizedROI || 0).toFixed(2)}%
          </p>
        </div>

        <div>
          <p className="text-gray-500">Time Remaining</p>

          <p className="font-semibold">{getTimeRemaining(signal.expiryTime)}</p>
        </div>
      </div>

      <div className="mt-4 border-t pt-4 text-xs text-gray-500">
        <p>Entry Time: {new Date(signal.entryTime).toLocaleString()}</p>

        <p>Expiry Time: {new Date(signal.expiryTime).toLocaleString()}</p>
      </div>

      <button
        onClick={handleDelete}
        className="mt-5 w-full rounded-lg bg-red-500 py-2 text-white transition hover:bg-red-600"
      >
        Delete Signal
      </button>
    </div>
  );
};

export default SignalCard;
