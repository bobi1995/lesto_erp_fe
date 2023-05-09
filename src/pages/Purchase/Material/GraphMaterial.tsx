import React from "react";
import { Box, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import AverageMetricTable from "./AverageMetricTable";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

const GraphMaterial = ({ data }: any) => {
  let allQuantity = 0;
  let allSinglePrice = 0;

  data
    .map((el: any) => {
      allQuantity = allQuantity + parseFloat(el.Quantity);
      if (el.Currency === "EUR") {
        return (allSinglePrice =
          allSinglePrice + parseFloat(el.SinglePrice) * 1.95583);
      }
      return (allSinglePrice = allSinglePrice + parseFloat(el.SinglePrice));
    })
    .sort((a: any, b: any) => {
      return new Date(b.DateOrder).valueOf() - new Date(a.DateOrder).valueOf();
    });

  const sorted = data.sort((a: any, b: any) => {
    return new Date(a.DateOrder).valueOf() - new Date(b.DateOrder).valueOf();
  });

  const tableData = [
    {
      Field: "Средна цена",
      Info: `${numeral(allSinglePrice / sorted.length).format("0,0.00")} ${
        sorted[sorted.length - 1].Currency
      }`,
    },
    {
      Field: "Средно количесто за Поръчка",
      Info: numeral(allQuantity / sorted.length).format("0,0.00"),
    },
    {
      Field: "Последна цена",
      Info: `${numeral(
        parseFloat(sorted[sorted.length - 1].SinglePrice)
      ).format("0,0.00")} ${sorted[sorted.length - 1].Currency}`,
    },
    {
      Field: "Последна/Средна цена",
      Info: `${numeral(
        (parseFloat(sorted[sorted.length - 1].SinglePrice) /
          (allSinglePrice / sorted.length) -
          1) *
          100
      ).format("0.00")}%`,
    },
  ];

  const graphData = {
    labels: sorted
      .slice(sorted.length - 40, sorted.length)
      .map((el: any) => el.DateOrder.substring(0, 10)),
    datasets: [
      {
        label: "Движение на цената последните поръчки",
        pointBorderColor: "#AAAAAD",
        pointBackgroundColor: "white",
        pointHoverBackgroundColor: "#AAAAAD",
        pointHoverBorderColor: "white",
        backgroundColor: "white",
        borderColor: "#AAAAAD",

        data: sorted
          .slice(sorted.length - 40, sorted.length)

          .map((el: any) => {
            if (el.Currency === "EUR") {
              return parseFloat(el.SinglePrice) * 1.95583;
            }
            return parseFloat(el.SinglePrice);
          }),
      },
    ],
  };

  return (
    <Box
      style={{
        textAlign: "center",
        margin: "auto",
        marginTop: 30,
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
      }}
    >
      <Box
        style={{
          width: "50%",
        }}
      >
        <Line data={graphData} />
      </Box>
      <AverageMetricTable data={tableData} itemName={data[0].dsca_bg_BG} />
    </Box>
  );
};

export default GraphMaterial;
