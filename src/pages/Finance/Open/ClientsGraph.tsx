import React from "react";
import { Bar } from "react-chartjs-2";
import { Box } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
  maintainAspectRatio: false,
};

const ClientsGraph = ({ data }: { data: any }) => {
  const graphData = {
    labels: data.slice(0, 10).map((el: any) => el.Customer),
    datasets: [
      {
        label: "Топ 10 клиенти",
        data: data.slice(0, 10).map((el: any) => el.TotalSum),
        backgroundColor: "rgba(135,211,124,0.5)",
        borderWidth: 1,
        borderColor: "rgba(30, 130, 76,1)",
      },
    ],
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        justifyContent: "center",
        display: "flex",
        width: "90%",
        margin: "0 auto",
      }}
    >
      <Bar data={graphData} options={options} width={600} height={300} />
    </Box>
  );
};

export default ClientsGraph;
