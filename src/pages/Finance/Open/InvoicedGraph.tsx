import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Typography, Box } from "@mui/material";
import numeral from "numeral";
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

const InvoicedGraph = ({
  opened,
  invoiced,
}: {
  opened: number;
  invoiced: number;
}) => {
  const graphData = {
    labels: ["Всички", "Фактурирани", "Отворени"],
    datasets: [
      {
        label: "Суми в лв.",
        data: [opened, invoiced, opened - invoiced],
        backgroundColor: "rgba(135,211,124,0.5)",
        borderWidth: 1,
        borderColor: "rgba(30, 130, 76,1)",
      },
    ],
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <Box
        sx={{
          marginTop: "3%",
          width: "35%",
          padding: 5,
          textAlign: "center",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 20,
              color: "#01579B",
            }}
          >
            Фактурирана сума: {numeral(invoiced).format("0,0.00")} лева{" "}
          </Typography>
          <Typography
            sx={{
              fontSize: 10,
              color: "red",
            }}
          >
            *При изчисление курса на еврото е отчетен на 1.95583
            <br />
            *Приспаднато ДДС.
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: 20,
              color: "#01579B",
            }}
          >
            Поръчки за периода: {numeral(opened).format("0,0.00")} лева
          </Typography>
          <Typography
            sx={{
              fontSize: 10,
              color: "red",
            }}
          >
            *При изчисление курса на еврото е отчетен на 1.95583
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: 20,
              color: "#01579B",
            }}
          >
            Оставащи за периода: {numeral(opened - invoiced).format("0,0.00")}{" "}
            лева
          </Typography>
          <Typography
            sx={{
              fontSize: 10,
              color: "red",
            }}
          >
            *При изчисление курса на еврото е отчетен на 1.95583
          </Typography>
        </Box>
      </Box>
      <Box sx={{ width: "65%", padding: 5 }}>
        <Bar data={graphData} options={options} width={600} height={300} />
      </Box>
    </div>
  );
};

export default InvoicedGraph;
