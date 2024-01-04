import React, { useState, useEffect } from "react";
import numeral from "numeral";
import { GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid";
import CustomDataGrid from "../../../../components/styled/CustomDataGrid";
import axios from "axios";
import { Box, CircularProgress, Typography } from "@mui/material";
const columnTemplate = (): GridColDef[] => {
  return [
    {
      field: "Position",
      headerName: "Позиция",
      headerClassName: "home-header",
      editable: false,
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => numeral(params.value).format("0,0"),
    },
    {
      field: "OpNumber",
      headerName: "Операция",
      headerClassName: "home-header",
      editable: false,
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => numeral(params.value).format("0,0"),
    },
    {
      field: "Material",
      headerName: "Материал",
      headerClassName: "home-header",
      headerAlign: "center",
      editable: false,
      sortable: false,
      minWidth: 500,
    },
    {
      field: "Quantity",
      headerName: "Количество",
      headerClassName: "home-header",
      headerAlign: "center",
      editable: false,
      sortable: false,
      renderCell: (params) => numeral(params.value).format("0,0.00"),
    },
  ];
};

const TableMaterials = ({ sfc, setError }: any) => {
  const [columnVisibilityModel, setColumnVisibilityModel] =
    React.useState<GridColumnVisibilityModel>({
      id: false,
    });

  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    await axios
      .get(`${process.env.REACT_APP_API_URL}engineering?sfc=${sfc}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: "Basic " + localStorage.getItem("erpToken"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setMaterials(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };

  useEffect(() => {
    if (sfc) {
      fetchData();
    }
  }, []);

  return (
    <div
      style={{
        marginTop: 35,
        marginBottom: 30,
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          fontSize: 21,
          marginTop: 15,
          marginBottom: 5,
        }}
      >
        Материали
      </Typography>
      {loading ? (
        <Box
          sx={{
            padding: 10,
            textAlign: "center",
          }}
        >
          <CircularProgress size={90} />
        </Box>
      ) : materials ? (
        <div>
          <CustomDataGrid
            autoHeight
            getRowId={(row) => row.Material + row.Position}
            rows={materials}
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
        </div>
      ) : null}
    </div>
  );
};

export default TableMaterials;
