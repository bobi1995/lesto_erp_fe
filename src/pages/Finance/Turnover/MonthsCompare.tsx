import { Box, Typography, Paper } from "@mui/material";
import numeral from "numeral";
import MonthsGraph from "./MonthsGraph";

const MonthCompare = ({ data }: any) => {
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
      <Typography sx={{ textAlign: "center", fontSize: 21 }}>
        Годишна графика
      </Typography>
      <Box>
        <Box>
          <Typography
            style={{ fontSize: 19, color: "#01579B", textAlign: "left" }}
          >
            Общо сума:{" "}
            {numeral(
              data.reduce((sum: any, obj: any) => sum + obj.TotalSum, 0)
            ).format("0,00.00")}{" "}
            лева
          </Typography>
          <Typography style={{ fontSize: 10, color: "red" }}>
            *При изчисление курса на еврото е отчетен на 1.95583 <br />
            *Приспаднато ДДС.
          </Typography>
        </Box>
      </Box>
      <MonthsGraph data={data} />
    </Paper>
  );
};

export default MonthCompare;
