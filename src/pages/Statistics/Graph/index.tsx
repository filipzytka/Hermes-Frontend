import { Bar, Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export type TGraphDataset = {
  x: number | string;
  y: number;
};

type Props = {
  dataset: TGraphDataset[];
  type: "line" | "bar";
};

const Graph = ({ dataset, type }: Props) => {
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
        ticks: {
          precision: 0,
          beginAtZero: true,
        },
        min: 0,
        max: 12,
      },
    },
  };

  const chartData = {
    labels: dataset.map((d) => d.x),
    datasets: [
      {
        label: "Players Count",
        data: dataset.map((d) => d.y),
        borderColor: "darkcyan",
        backgroundColor: "darkcyan",
        fill: false,
      },
    ],
  };

  return (
    <>
      {type === "line" && <Line options={options} data={chartData} />}
      {type === "bar" && <Bar options={options} data={chartData} />}
    </>
  );
};

export default Graph;
