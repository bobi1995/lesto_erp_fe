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
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = React.useState<string | number>("all");
  const [error, setError] = useState("");
  const [authErr, setAuthErr] = useState(false);

  const fetchData = async () => {
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
        `${process.env.REACT_APP_API_URL}finance/turnover-client?from=${moment(
          date
        ).format("yyyy-MM-DD HH:mm")}&to=${moment(tempDate).format(
          "yyyy-MM-DD HH:mm"
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
        ).format("yyyy-MM-DD HH:mm")}&to=${moment(tempDate).format(
          "yyyy-MM-DD HH:mm"
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

  console.log(openSls);
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
      <InvoicedGraph
        opened={openSls.reduce((sum: any, obj: any) => sum + obj.totalSum, 0)}
        invoiced={turnOver.reduce(
          (sum: any, obj: any) => sum + obj.TotalSum,
          0
        )}
      />
      {turnOver ? <ClientsGraph data={turnOver} /> : null}
    </div>
  );
};

export default Open;
