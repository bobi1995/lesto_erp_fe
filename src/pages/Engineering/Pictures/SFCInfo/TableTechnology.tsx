import React, { useState, useEffect } from "react";
import numeral from "numeral";
import { GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid";
import CustomDataGrid from "../../../../components/styled/CustomDataGrid";
import StatusMapper from "../../../../components/helper/StatusMapper";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";

const columnTemplate = (): GridColDef[] => {
  return [
    {
      field: "Operation",
      headerName: "Операция",
      headerClassName: "home-header",
      editable: false,
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => numeral(params.value).format("0,0"),
    },
    {
      field: "Status",
      headerName: "Статус",
      headerClassName: "home-header",
      editable: false,
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => <StatusMapper statusCode={params.value} />,
      minWidth: 150,
    },
    {
      field: "refo",
      headerName: "Задача",
      headerClassName: "home-header",
      headerAlign: "center",
      editable: false,
      sortable: false,
    },
    {
      field: "WorkCenter",
      headerName: "Работен Център",
      headerClassName: "home-header",
      headerAlign: "center",
      editable: false,
      sortable: false,
      minWidth: 150,
    },
    {
      field: "WC_NAME",
      headerName: "Работен Център Описание",
      headerClassName: "home-header",
      headerAlign: "center",
      editable: false,
      sortable: false,
      flex: 1,
    },
    {
      field: "ProdTime",
      headerName: "Време за произв.",
      headerClassName: "home-header",
      headerAlign: "center",
      editable: false,
      sortable: false,
      renderCell: (params) => numeral(params.value).format("0,0.00"),
      minWidth: 150,
    },
    {
      field: "Machine",
      headerName: "Машина",
      headerClassName: "home-header",
      headerAlign: "center",
      editable: false,
      sortable: false,
    },
    {
      field: "MachineName",
      headerName: "Наименувание на машина",
      headerClassName: "home-header",
      headerAlign: "center",
      editable: false,
      sortable: false,
      flex: 1,
      minWidth: 250,
      renderCell: (params) =>
        params.value === "Without WC" ? "НЕПРИЛОЖИМО" : params.value,
    },
  ];
};

const TableTechnology = ({ item, setError }: any) => {
  const [columnVisibilityModel, setColumnVisibilityModel] =
    React.useState<GridColumnVisibilityModel>({
      id: false,
    });
  const [sfcData, setSfcData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    await axios
      .get(`${process.env.REACT_APP_API_URL}engineering/sfc?item=${item}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: "Basic " + localStorage.getItem("erpToken"),
        },
      })
      .then((response) => {
        setSfcData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };

  useEffect(() => {
    if (item) {
      fetchData();
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        marginTop: 35,
        marginBottom: 30,
      }}
    >
      {loading ? (
        <Box
          sx={{
            padding: 10,
            textAlign: "center",
          }}
        >
          <CircularProgress size={90} />
        </Box>
      ) : sfcData ? (
        <CustomDataGrid
          autoHeight
          getRowId={(row) => row.Operation}
          rows={sfcData}
          onRowClick={() => {}}
          columns={columnTemplate()}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(newModel: any) =>
            setColumnVisibilityModel(newModel)
          }
          rowsPerPageOptions={[5]}
          //checkboxSelection
          disableSelectionOnClick
          disableColumnFilter
          disableColumnMenu
          hideFooter
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
          experimentalFeatures={{ newEditingApi: false }}
        />
      ) : null}
    </div>
  );
};

export default TableTechnology;
