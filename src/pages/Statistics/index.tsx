import { useEffect, useState } from "react";
import Footer from "../../components/Shared/Footer";
import NavigationBar from "../../components/Shared/NavigationBar";
import { getChartData, getServerData } from "../../api/monitor-server";
import { TServerDataResponse } from "../../api/response-types";
import DataTable from "../../components/DataTable";
import Graph, { TGraphDataset } from "./Graph";
import { IoIosRefresh } from "react-icons/io";
const Statistics = () => {
  const [serverData, setServerData] = useState<TServerDataResponse[]>([]);
  const [isFetched, setIsFetched] = useState(false);
  const [chartDataset, setChartDataset] = useState<TGraphDataset[]>([]);

  const fetchServerData = async () => {
    const response = await getServerData();
    const responseChart = await getChartData();
    const chartData = responseChart.payload;

    const data = response.payload;

    if (!data || !chartData) return;

    if (!response.success) {
      setChartDataset([]);
      setServerData([]);
      setIsFetched(true);
      return;
    }

    const parsedToChartFormat: TGraphDataset[] = chartData.map((d) => ({
      x: d.date,
      y: d.players,
    }));

    setChartDataset(parsedToChartFormat);
    setServerData([data]);
    setIsFetched(true);
  };

  useEffect(() => {
    fetchServerData();
  }, []);

  if (!isFetched) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavigationBar />
        <div className="flex-grow" />
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      <div className="flex flex-col px-3 mt-8 md:mt-32 lg:mx-40">
        <div className="flex flex-col justify-center gap-4 md:gap-20">
          <DataTable
            data={serverData}
            rowSelection={false}
            pagination={false}
          />
          <div className="flex flex-col lg:flex-row justify-center mt-4 gap-x-4">
            <div className="w-full lg:flex-[2] max-h-96 min-h-72">
              <Graph dataset={chartDataset} type={"line"} />
            </div>
            <div className="w-full lg:flex-[3] max-h-96 mt-4 lg:mt-0 min-h-72">
              <Graph dataset={chartDataset} type={"bar"} />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end">
          <button
            onClick={fetchServerData}
            type="submit"
            className="text-lg py-2 px-6 mt-4 inline-flex justify-center items-center gap-2 rounded-md
                 border border-transparent font-semibold
                bg-cyan-600 text-white hover:bg-cyan-700 focus:outline-none focus:ring-blue-500 focus:ring-offset-2
                 transition-all dark:focus:ring-offset-gray-800"
          >
            <IoIosRefresh />
          </button>
        </div>
      </div>
      <div className="flex flex-grow"></div>
      <Footer />
    </div>
  );
};

export default Statistics;
