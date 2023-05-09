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

const monthOrder = [
  "януари",
  "февруари",
  "март",
  "април",
  "май",
  "юни",
  "юли",
  "август",
  "септември",
  "октомври",
  "ноември",
  "декември",
];

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
interface MonthlyOrder {
  month: string;
  total: number;
}
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

const MonthsGraph = ({ data }: { data: any }) => {
  const monthlyOrders: MonthlyOrder[] = [];

  for (const month of monthOrder) {
    monthlyOrders.push({ month, total: 0 });
  }

  data.forEach((order: any) => {
    const currency = order.Currency;
    const totalSum = Number(order.totalSum);
    const month = new Date(order.idat).toLocaleString("bg-BG", {
      month: "long",
    });

    // Convert totalSum if currency is EUR
    const convertedTotalSum =
      currency === "EUR" ? totalSum * 1.95583 : totalSum / 1.2;

    const index = monthlyOrders.findIndex((item) => item.month === month);

    if (index === -1) {
      monthlyOrders.push({ month, total: convertedTotalSum });
    } else {
      monthlyOrders[index].total += convertedTotalSum;
    }
  });
  monthlyOrders.sort(
    (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
  );

  const result = Object.values(monthlyOrders);

  const graphData = {
    labels: result.map((el: any) => el.month),
    datasets: [
      {
        label: "Месечен оборот",
        data: result.map((el: any) => el.total.toFixed(2)),
        backgroundColor: "rgba(135,211,124,0.5)",
        borderWidth: 1,
        borderColor: "rgba(30, 130, 76,1)",
      },
    ],
  };

  return (
    <div>
      <Bar data={graphData} options={options} width={600} height={300} />
    </div>
  );
};

export default MonthsGraph;
