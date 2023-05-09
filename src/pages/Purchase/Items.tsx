import React, { useState } from "react";
import axios from "axios";
import { TextField, Box } from "@mui/material";
import SearchBtn from "../../components/styled/SearchBtn";
import DialogLoader from "../../components/DialogLoader";
import GraphMaterial from "./Material/GraphMaterial";
import TableData from "../../components/TableData";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import numeral from "numeral";

const columnTemplate = (): GridColDef[] => {
  return [
    {
      field: "OrderNumber",
      headerName: "Поръчка",
      headerClassName: "home-header",
      editable: false,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "DateOrder",
      headerName: "Дата",
      headerClassName: "home-header",
      editable: false,
      headerAlign: "center",
      renderCell: (params) => moment(params.value).format("DD-MM-YYYY HH:mm"),
      flex: 1,
    },

    {
      field: "SinglePrice",
      headerName: "Единична цена",
      headerClassName: "home-header",
      headerAlign: "center",
      editable: false,
      renderCell: (params) =>
        `${numeral(params.value).format("0,0.00")} ${params.row.Currency}`,
      flex: 1,
    },
    {
      field: "Quantity",
      headerName: "Поръчано Количество",
      headerClassName: "home-header",
      editable: false,
      headerAlign: "center",
      renderCell: (params) => numeral(params.value).format("0,0.00"),
      flex: 1,
    },
    {
      field: "Currency",
      headerName: "Валута",
      headerClassName: "home-header",
      headerAlign: "center",
      editable: false,
      renderCell: (params) =>
        `${numeral(params.row.SinglePrice * params.row.Quantity).format(
          "0,0.00"
        )} ${params.value}`,
      flex: 1,
    },
    {
      field: "ClientOrder",
      headerName: "Номер поръчка",
      headerClassName: "home-header",
      headerAlign: "center",
      editable: false,
      flex: 1,
    },
  ];
};

const Items = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}purchase/item-price?item=${search}`,
        {
          headers: {
            Authorization: "Basic " + localStorage.getItem("erpToken"),
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        const newData = response.data.map((item: any, index: any) => ({
          ...item,
          id: index + 1,
        }));

        setData(newData);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div>
      {loading ? <DialogLoader /> : null}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 5,
        }}
      >
        <TextField
          id="outlined-controlled"
          label="Въведи материал"
          value={search}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(event.target.value);
          }}
          style={{
            marginRight: 10,
          }}
        />
        <SearchBtn submit={fetchData}>Търси</SearchBtn>
      </Box>
      {data && data.length > 0 ? (
        <>
          <GraphMaterial data={data} />
          <TableData data={data} columnTemplate={columnTemplate} />
        </>
      ) : null}
    </div>
  );
};

export default Items;
