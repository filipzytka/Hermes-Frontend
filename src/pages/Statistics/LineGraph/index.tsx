import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineGraph = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: "rgba(128, 128, 128, 0.4)",
        },
      },
      y: {
        grid: {
          color: "rgba(128, 128, 128, 0.4)",
        },
      },
    },
  };

  const lineChartData = {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    datasets: [
      {
        label: "Steps",
        data: [300, 100, 1231, 111, 515, 661, 151],
        borderColor: "gray",
      },
      {
        label: "Other Data",
        data: [11, 213, 122, 44, 14, 5, 151],
        borderColor: "darkcyan",
      },
    ],
  };

  return (
    <>
      <Line options={options} data={lineChartData} />
    </>
  );
};

export default LineGraph;
