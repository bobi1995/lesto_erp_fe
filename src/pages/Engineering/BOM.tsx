import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import DialogLoader from "../../components/DialogLoader";
import ErrorMessage from "../../components/ErrorMessage";
import SearchBtn from "../../components/styled/SearchBtn";
import { TextField, Box } from "@mui/material";

const BOM = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    setLoading(true);
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}engineering/pictures?item=${search}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: "Basic " + localStorage.getItem("erpToken"),
          },
        }
      )
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);

        setError(error);
      });
  };
  return <div>BOM</div>;
};

export default BOM;
