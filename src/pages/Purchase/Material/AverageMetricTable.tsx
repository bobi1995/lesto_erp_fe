import React from "react";
import { GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid";
import CustomDataGrid from "../../../components/styled/CustomDataGrid";
import CustomPagination from "../../../components/styled/CustomPagination";
import { Typography } from "@mui/material";

const columnTemplate = (): GridColDef[] => {
  return [
    {
      field: "Field",
      headerName: "Поле",
      headerClassName: "home-header",
      editable: false,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "Info",
      headerName: "Информация",
      headerClassName: "home-header",
      headerAlign: "center",
      editable: false,
      flex: 1,
    },
  ];
};

const AverageMetricTable = ({ data, itemName }: any) => {
  const [columnVisibilityModel, setColumnVisibilityModel] =
    React.useState<GridColumnVisibilityModel>({
      id: false,
    });

  return (
    <div
      style={{
        height: 350,
        width: "30%",
      }}
    >
      <Typography
        sx={{
          marginTop: 3,
          marginBottom: 3,
          fontSize: 21,
        }}
      >
        {itemName}
      </Typography>
      <CustomDataGrid
        getRowId={(row: any) => row.Field}
        rows={data}
        columns={columnTemplate()}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel: any) =>
          setColumnVisibilityModel(newModel)
        }
        disableSelectionOnClick
        hideFooter
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        experimentalFeatures={{ newEditingApi: false }}
      />
    </div>
  );
};

export default AverageMetricTable;
