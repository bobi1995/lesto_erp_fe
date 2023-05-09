import { Box, Typography, Paper } from "@mui/material";
import numeral from "numeral";
import MonthsGraph from "./MonthsGraph";

const MonthCompare = ({ data }: any) => {
  const euroInvoices = data.filter((el: any) => el.Currency === "EUR");
  const bgnInvoices = data.filter((el: any) => el.Currency === "BGN");
  let euroSum = 0;
  let bgnSum = 0;
  euroInvoices.map((el: any) => (euroSum = euroSum + parseFloat(el.totalSum)));
  bgnInvoices.map((el: any) => (bgnSum = bgnSum + parseFloat(el.totalSum)));

  const totalSum = bgnSum / 1.2 + euroSum * 1.95583;

  return (
    <Paper
      elevation={11}
      sx={{
        marginLeft: 1,
        marginRight: 1,
        marginTop: "3%",
        margin: "1%",
      }}
    >
      <Typography sx={{ textAlign: "center", fontSize: 21, marginBottom: 5 }}>
        Годишна графика
      </Typography>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Box>
          <Typography style={{ fontSize: 19, color: "#01579B" }}>
            Общо сума за BGN: {numeral(bgnSum / 1.2).format("0,00.00")} лева
          </Typography>
          <Typography style={{ fontSize: 10, color: "red" }}>
            *Приспаднато ДДС. Оригинално по фактури{" "}
            {numeral(bgnSum).format("0,00.00")} лева
          </Typography>
        </Box>
        <Box>
          <Typography style={{ fontSize: 19, color: "#01579B" }}>
            Общо сума за EUR: {numeral(euroSum).format("0,00.00")} евро
          </Typography>
        </Box>
        <Box>
          <Typography style={{ fontSize: 19, color: "#01579B" }}>
            Общо сума: {numeral(totalSum).format("0,00.00")} лева
          </Typography>
          <Typography style={{ fontSize: 10, color: "red" }}>
            *При изчисление курса на еврото е отчетен на 1.95583
          </Typography>
        </Box>
      </Box>
      <MonthsGraph data={data} />
    </Paper>
  );
};

export default MonthCompare;
