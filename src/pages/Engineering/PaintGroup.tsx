import { useState, useEffect } from "react";
import axios from "axios";
import numeral from "numeral";
import { Box, TextField } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import SearchBtn from "../../components/styled/SearchBtn";
import DialogLoader from "../../components/DialogLoader";
import ErrorMessage from "../../components/ErrorMessage";
import ExcelDataGrid from "../../components/styled/ExcelDataGrid";
import ExcelExport from "./PaintGroup/ExcelExport";
import AuthError from "../../components/AuthError";

const columnTemplate = (): GridColDef[] => {
  return [
    {
      field: "Sales",
      headerName: "Поръчка",
      headerClassName: "home-header",
      editable: false,
      headerAlign: "center",
    },
    {
      field: "ProductionOrder",
      headerName: "Поръчка",
      headerClassName: "home-header",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "Item",
      headerName: "Артикул",
      headerClassName: "home-header",
      headerAlign: "center",
      editable: false,
      minWidth: 250,
      flex: 1,
    },
    {
      field: "ItemDescription",
      headerName: "Описание",
      headerClassName: "home-header",
      editable: false,
      headerAlign: "center",
      minWidth: 250,
      flex: 1,
    },
    {
      field: "PaintCode",
      headerName: "Код боя",
      headerClassName: "home-header",
      headerAlign: "center",
      editable: false,
      minWidth: 50,
      align: "left",
    },
    {
      field: "Quantity",
      headerName: "Бройка",
      headerClassName: "home-header",
      headerAlign: "center",
      minWidth: 50,
      editable: false,
      renderCell: (params) => numeral(params.value).format("0,0.00"),
    },
    {
      field: "Quadrature",
      headerName: "Квадратура",
      headerClassName: "home-header",
      headerAlign: "center",
      editable: false,
      minWidth: 50,
      renderCell: (params) => numeral(params.value).format("0,0.00"),
    },
    {
      field: "Total",
      headerName: "Общо",
      headerClassName: "home-header",
      headerAlign: "center",
      editable: false,
      minWidth: 50,
      renderCell: (params) =>
        numeral(params.row.Quantity * params.row.Quadrature).format("0,0.00"),
    },
    {
      field: "Technology",
      headerName: "Технология",
      headerClassName: "home-header",
      headerAlign: "center",
      editable: false,
      minWidth: 150,
      align: "left",
    },
  ];
};
const PaintGroup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [authErr, setAuthErr] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [totalQuadrature, setTotalQuadrature] = useState(0);
  const [paint, setPaint] = useState<{ paint: string; paintDesc: string }>({
    paint: "",
    paintDesc: "",
  });

  const calculateQuadrature = (results: any) => {
    let tempQ = 0;
    let tempCode = "";
    let tempDesc = "";
    if (results && results.length > 0) {
      results.map((row: any) => {
        const rowQuadrature = row.Quantity * row.Quadrature;
        if (row.PaintCode) {
          tempCode = row.PaintCode;
          tempDesc = row.PaintDesc;
        }
        return (tempQ += rowQuadrature);
      });
    }
    setTotalQuadrature(tempQ);
    setPaint({
      paint: tempCode,
      paintDesc: tempDesc,
    });
  };

  const fetchData = async () => {
    setLoading(true);
    console.log(search);
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}engineering/group?group=${search}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: "Basic " + localStorage.getItem("erpToken"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        setData(response.data);
        calculateQuadrature(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);

        if (error && error.response && error.response.status === 401) {
          return setAuthErr(true);
        }

        setError(error);
      });
  };

  useEffect(() => {
    if (search) {
      fetchData();
    }
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 5,
        }}
      >
        <TextField
          id="outlined-controlled"
          label="Въведи Група"
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
          <Box
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <p>
              Боя: <strong>{paint.paint}</strong>
            </p>
            <p>
              Описание: <strong>{paint.paintDesc}</strong>
            </p>
            <p>
              Квадратура:{" "}
              <strong>{numeral(totalQuadrature).format("0,0.00")}</strong>
            </p>
          </Box>
          <ExcelExport
            data={data}
            paint={paint}
            totalQuadrature={totalQuadrature}
          />
          <div
            style={{
              height: "80%",
              width: "100%",
              marginTop: 35,
            }}
          >
            <ExcelDataGrid
              getRowId={(row) => row.Sales + row.ProductionOrder}
              rows={data}
              columns={columnTemplate()}
              disableSelectionOnClick
              getRowHeight={() => 20}
            />
          </div>
        </>
      ) : null}
      {authErr ? <AuthError /> : null}
      {loading ? <DialogLoader /> : null}
      {error ? <ErrorMessage message={error} setMessage={setError} /> : null}
    </div>
  );
};

export default PaintGroup;
