import React from "react";
import { GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid";
import CustomDataGrid from "../../../components/styled/CustomDataGrid";
import CustomPagination from "../../../components/styled/CustomPagination";
import numeral from "numeral";
import moment from "moment";

const columnTemplate = (): GridColDef[] => {
  return [
    {
      field: "OrderNumber",
      headerName: "Поръчка",
      headerClassName: "home-header",
      editable: false,
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "ProviderName",
      headerName: "Доставчик",
      headerClassName: "home-header",
      headerAlign: "center",
      editable: false,
      flex: 1,
    },
    {
      field: "DateOrder",
      headerName: "Дата",
      headerClassName: "home-header",
      editable: false,
      headerAlign: "center",
      renderCell: (params) => moment(params.value).format("DD-MM-YYYY HH:mm"),
      minWidth: 250,
    },
    {
      field: "Quantity",
      headerName: "Поръчано Количество",
      headerClassName: "home-header",
      editable: false,
      headerAlign: "center",
      renderCell: (params) => numeral(params.value).format("0,0.00"),
      minWidth: 250,
    },
    {
      field: "SinglePrice",
      headerName: "Единична цена",
      headerClassName: "home-header",
      headerAlign: "center",
      editable: false,
      renderCell: (params) => numeral(params.value).format("0,0.00"),
      minWidth: 150,
    },
    {
      field: "Currency",
      headerName: "Валута",
      headerClassName: "home-header",
      headerAlign: "center",
      editable: false,
      minWidth: 150,
    },
    {
      field: "Status",
      headerName: "Статус",
      headerClassName: "home-header",
      headerAlign: "center",
      editable: false,
      minWidth: 150,
      renderCell: (params) =>
        params.value === "25.000000000000000" ? "Затворена" : "В обработка",
    },
  ];
};

const TableMaterial = ({ data }: any) => {
  const [columnVisibilityModel, setColumnVisibilityModel] =
    React.useState<GridColumnVisibilityModel>({
      id: false,
    });

  return (
    <div
      style={{
        height: "75vh",
        width: "100%",
        marginTop: 35,
      }}
    >
      <CustomDataGrid
        getRowId={(row) => row.OrderNumber + row.Quantity + row.DateOrder}
        rows={data.slice().sort((a: any, b: any) => {
          return (
            new Date(b.DateOrder).valueOf() - new Date(a.DateOrder).valueOf()
          );
        })}
        columns={columnTemplate()}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel: any) =>
          setColumnVisibilityModel(newModel)
        }
        pageSize={10}
        components={{
          Pagination: () => <CustomPagination />,
        }}
        rowsPerPageOptions={[5]}
        //checkboxSelection
        disableSelectionOnClick
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        experimentalFeatures={{ newEditingApi: false }}
      />
    </div>
  );
};

export default TableMaterial;
