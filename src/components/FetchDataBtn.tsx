import { Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import DialogLoader from "./DialogLoader";
import HistoryIcon from "@mui/icons-material/History";
import ErrorMessage from "./ErrorMessage";

const FetchDataBtn = ({ department }: { department: String }) => {
  const [loading, setLoading] = useState(false);
  const [authErr, setAuthErr] = useState(false);
  const [err, setErr] = useState("");

  const fetchData = async () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_FETCH}manual?department=${department}`, {
        headers: {
          Authorization: "Basic " + localStorage.getItem("erpToken"),
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setLoading(false);
        setErr("Данните са обновени!");
      })
      .catch((error) => {
        if (error && error.response && error.response.status === 401) {
          return setAuthErr(true);
        }
        setLoading(false);
      });
  };
  return (
    <div style={{ width: "100%", display: "flex" }}>
      {loading ? <DialogLoader /> : null}
      <Button
        onClick={fetchData}
        style={{
          backgroundColor: "#AAAAAD",
          color: "white",
          textAlign: "center",
          margin: "0 auto",
        }}
      >
        <HistoryIcon />
        Обнови данните
      </Button>
      {err ? <ErrorMessage message={err} setMessage={setErr} /> : null}
    </div>
  );
};

export default FetchDataBtn;
