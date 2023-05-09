import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Box } from "@mui/material";
import SearchBtn from "../../components/styled/SearchBtn";
import DialogLoader from "../../components/DialogLoader";
import TableData from "../../components/TableData";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import numeral from "numeral";
import DatePicker from "./Turnover/DatePicker";
import HeaderStat from "./Turnover/HeaderStat";
import MonthCompare from "./Turnover/MonthsCompare";
import AuthError from "../../components/AuthError";

const TurnOver = () => {
  const [data, setData] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authErr, setAuthErr] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = React.useState<string | number>(
    new Date().getMonth() + 1
  );

  const fetchData = () => {
    setLoading(true);
    let date;
    let tempDate;

    if (month === "all") {
      date = `${year}-01-01 00:00:00`;
      tempDate = `${year + 1}-01-01 00:00:00`;
    } else {
      date = new Date(`${year}-${month}-01 00:00:00`);
      tempDate = new Date(date);
      tempDate.setMonth(tempDate.getMonth() + 1);
      tempDate.setDate(tempDate.getDate() - 1);
      tempDate.setHours(23);
    }

    axios
      .get(
        `${process.env.REACT_APP_API_URL}finance/turnover?from=${moment(
          date
        ).format("yyyy-MM-D HH:mm")}&to=${moment(tempDate).format(
          "yyyy-MM-D HH:mm"
        )}`,
        {
          headers: {
            Authorization: "Basic " + localStorage.getItem("erpToken"),
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        const temp = response.data.filter(
          (el: any) => el.Customer !== "ПАТЛИДЖАНСКИ ООД"
        );
        setData(temp);
        setLoading(false);
      })
      .catch((error) => {
        if (error && error.response && error.response.status === 401) {
          setAuthErr(true);
        }
        setLoading(false);
      });
  };

  const fetchYearChange = () => {
    const date = `${year}-01-01 00:00:00`;
    const tempDate = `${year + 1}-01-01 00:00:00`;
    axios
      .get(
        `${process.env.REACT_APP_API_URL}finance/turnover?from=${moment(
          date
        ).format("yyyy-MM-D HH:mm")}&to=${moment(tempDate).format(
          "yyyy-MM-D HH:mm"
        )}`,
        {
          headers: {
            Authorization: "Basic " + localStorage.getItem("erpToken"),
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        const temp = response.data.filter(
          (el: any) => el.Customer !== "ПАТЛИДЖАНСКИ ООД"
        );
        setYearData(temp);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [year, month]);

  useEffect(() => {
    fetchYearChange();
  }, [year]);

  return (
    <div>
      {authErr ? <AuthError /> : null}
      {loading ? <DialogLoader /> : null}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 5,
        }}
      >
        <DatePicker
          year={year}
          setYear={setYear}
          month={month}
          setMonth={setMonth}
        />
      </Box>
      {yearData && yearData.length > 0 ? (
        <MonthCompare data={yearData} />
      ) : null}

      {data && data.length > 0 ? (
        <>
          <HeaderStat data={data} />
        </>
      ) : null}
    </div>
  );
};

export default TurnOver;
