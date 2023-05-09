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
  const transformedData = data.map((obj: any) => {
    let totalSum = parseFloat(obj.totalSum);
    if (obj.Currency === "BGN") {
      totalSum /= 1.2;
    } else if (obj.Currency === "EUR") {
      totalSum *= 1.95583;
    }
    return { ...obj, totalSum };
  });

  function groupBy(objectArray: any, property: any) {
    return objectArray.reduce(function (acc: any, obj: any) {
      var key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  const groupedByClient = groupBy(transformedData, "Customer");
  const result = Object.entries(groupedByClient)
    .map(([client, invoices]: any) => ({
      client,
      total: invoices.reduce(
        (acc: any, { totalSum }: any) => acc + totalSum,
        0
      ),
    }))
    .sort((el1, el2) => el2.total - el1.total)
    .filter((el: any) => el.total > 10000);

  const graphData = {
    labels: result.map((el: any) => el.client),
    datasets: [
      {
        label: "Клиенти с оборот над 10,000 лв.",
        data: result.map((el: any) => el.total),
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
