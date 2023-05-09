import React, { useState, useEffect } from "react";
import DatePicker from "./Turnover/DatePicker";
import axios from "axios";
import moment from "moment";
import DialogLoader from "../../components/DialogLoader";
import InvoicedGraph from "./Open/InvoicedGraph";
import ErrorMessage from "../../components/ErrorMessage";
import ClientsGraph from "./Open/ClientsGraph";
import AuthError from "../../components/AuthError";

const Open = () => {
  const [turnOver, setTurnOver] = useState([]);
  const [openSls, setOpenSls] = useState([]);
  const [totalOpened, setTotalOpened] = useState(0);
  const [totalTurnOver, setTotalTurnOver] = useState(0);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = React.useState<string | number>(
    // new Date().getMonth() + 1
    "all"
  );
  const [error, setError] = useState("");
  const [authErr, setAuthErr] = useState(false);

  const fetchData = async () => {
    await setTotalTurnOver(0);
    await setTotalOpened(0);

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

    await axios
      .get(
        `${process.env.REACT_APP_API_URL}finance/turnover?from=${moment(
          date
        ).format("yyyy-MM-D HH:mm")}&to=${moment(tempDate).format(
          "yyyy-MM-D HH:mm"
        )}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: "Basic " + localStorage.getItem("erpToken"),
          },
        }
      )
      .then((response) => {
        const temp = response.data.filter(
          (el: any) => el.Customer !== "ПАТЛИДЖАНСКИ ООД"
        );
        return temp;
      })
      .then((temp) => setTurnOver(temp))
      .catch((error) => {
        console.log(error);
        setError(error);
      });

    await axios
      .get(
        `${process.env.REACT_APP_API_URL}finance/opened?from=${moment(
          date
        ).format("yyyy-MM-D HH:mm")}&to=${moment(tempDate).format(
          "yyyy-MM-D HH:mm"
        )}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: "Basic " + localStorage.getItem("erpToken"),
          },
        }
      )
      .then((response) => {
        const temp = response.data.filter(
          (el: any) => el.Customer !== "ПАТЛИДЖАНСКИ ООД"
        );
        return temp;
      })
      .then((temp) => {
        setOpenSls(temp);
      })
      .catch((error) => {
        if (error && error.response && error.response.status === 401) {
          setAuthErr(true);
        }
        setError(error);
      });
  };

  useEffect(() => {
    const generalFetch = async () => {
      setLoading(true);
      await fetchData();
      setLoading(false);
    };
    generalFetch().catch((error) => setError(error));
  }, [year, month]);

  useEffect(() => {
    calculateTotals();
  }, [openSls, turnOver]);

  const calculateTotals = async () => {
    if (openSls && openSls.length > 0) {
      let tempTotalSum = 0;
      openSls.map((el: any) => {
        if (el.Currency === "EUR") {
          tempTotalSum = tempTotalSum + parseFloat(el.totalSum) * 1.95583;
        } else tempTotalSum = tempTotalSum + parseFloat(el.totalSum);
      });
      await setTotalOpened(tempTotalSum);
    }

    if (turnOver && turnOver.length > 0) {
      let tempTotalSum = 0;
      turnOver.map((el: any) => {
        if (el.Currency === "EUR") {
          tempTotalSum = tempTotalSum + parseFloat(el.totalSum) * 1.95583;
        } else tempTotalSum = tempTotalSum + parseFloat(el.totalSum) / 1.2;
      });
      await setTotalTurnOver(tempTotalSum);
    }
  };

  return (
    <div
      style={{
        marginTop: 25,
      }}
    >
      {authErr ? <AuthError /> : null}
      <DatePicker
        year={year}
        setYear={setYear}
        month={month}
        setMonth={setMonth}
      />
      {loading ? <DialogLoader /> : null}
      <InvoicedGraph opened={totalOpened} invoiced={totalTurnOver} />
      {turnOver ? <ClientsGraph data={turnOver} /> : null}
    </div>
  );
};

export default Open;
