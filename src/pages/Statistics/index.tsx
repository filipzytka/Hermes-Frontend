import { useEffect, useState } from "react";
import Footer from "../../components/Shared/Footer";
import NavigationBar from "../../components/Shared/NavigationBar";
import StatusCard from "./StatusCard";
import LineGraph from "./LineGraph";

export type TServerState = "ON" | "PENDING" | "OFF";

const API_URL = `${import.meta.env.VITE_API_URL}`;

const Statistics = () => {
  const [serverState, setServerState] = useState<TServerState>("PENDING");
  const checkServerStatus = async () => {
    try {
      await fetch(API_URL, {
        method: "GET",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setServerState("ON");
    } catch (error) {
      setServerState("OFF");
    }
  };
  useEffect(() => {
    checkServerStatus();

    const intervalId = setInterval(() => {
      checkServerStatus();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      <div className="flex flex-grow justify-center mt-8 md:mt-32 mx-6">
        <div className="flex w-full max-w-5xl gap-10">
          <div className="w-1/4">
            <StatusCard state={serverState} />
          </div>
          <div className="w-3/4 max-h-96 overflow-hidden">
            <LineGraph />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Statistics;
