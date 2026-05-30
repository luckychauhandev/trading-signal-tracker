import { useState } from "react";
import SignalForm from "../components/SignalForm";
import SignalList from "../components/SignalList";

const Home = () => {
  const [refresh, setRefresh] = useState(0);

  const handleSignalCreated = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-center text-4xl font-bold">
          Trading Signal Tracker
        </h1>

        <p className="mt-2 text-center text-gray-500">
          Monitor trading signals, ROI and status in real-time
        </p>
      </div>

      <SignalForm onSignalCreated={handleSignalCreated} />

      <SignalList key={refresh} />
    </div>
  );
};

export default Home;
