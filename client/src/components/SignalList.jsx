import { useEffect, useState } from "react";
import { getSignals } from "../api/signalApi";
import SignalCard from "./SignalCard";

const SignalList = () => {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSignals = async () => {
    try {
      const { data } = await getSignals();

      setSignals(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignals();

    const interval = setInterval(fetchSignals, 15000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="py-10 text-center">Loading...</div>;
  }

  if (!signals.length) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow">
        No Signals Found
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {signals.map((signal) => (
        <SignalCard
          key={signal._id}
          signal={signal}
          onSignalDeleted={fetchSignals}
        />
      ))}
    </div>
  );
};

export default SignalList;
