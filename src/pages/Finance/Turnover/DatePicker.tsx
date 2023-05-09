import React, { useState, useEffect } from "react";
import {
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Radio,
  FormControlLabel,
  RadioGroup,
  Paper,
} from "@mui/material";

const DatePicker = ({ year, setYear, month, setMonth }: any) => {
  const handleMonthChange = (event: any) => {
    setMonth(event.target.value);
  };

  return (
    <div style={{ width: "100%" }}>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <FormControl variant="outlined" style={{ width: 200 }}>
          <InputLabel id="demo-simple-select-label">Година</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={year}
            onChange={(event: any) => setYear(event.target.value)}
            label="Година"
          >
            <MenuItem value={2018}>2018</MenuItem>
            <MenuItem value={2019}>2019</MenuItem>
            <MenuItem value={2020}>2020</MenuItem>
            <MenuItem value={2021}>2021</MenuItem>
            <MenuItem value={2022}>2022</MenuItem>
            <MenuItem value={2023}>2023</MenuItem>
          </Select>
        </FormControl>
        <Paper style={{ width: 200 }}>
          <FormControl variant="outlined" style={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-label1">Месец</InputLabel>
            <Select
              labelId="demo-simple-select-label1"
              id="demo-simple-select1"
              value={month}
              onChange={handleMonthChange}
              label="Месец"
            >
              <MenuItem value={"all"}>Всички месеци</MenuItem>
              <MenuItem value={1}>Януари</MenuItem>
              <MenuItem value={2}>Февруари</MenuItem>
              <MenuItem value={3}>Март</MenuItem>
              <MenuItem value={4}>Април</MenuItem>
              <MenuItem value={5}>Май</MenuItem>
              <MenuItem value={6}>Юни</MenuItem>
              <MenuItem value={7}>Юли</MenuItem>
              <MenuItem value={8}>Август</MenuItem>
              <MenuItem value={9}>Септември</MenuItem>
              <MenuItem value={10}>Октомври</MenuItem>
              <MenuItem value={11}>Ноември</MenuItem>
              <MenuItem value={12}>Декември</MenuItem>
            </Select>
          </FormControl>
        </Paper>
      </Box>
    </div>
  );
};

export default DatePicker;
