import React from "react";
import { GridColumnVisibilityModel } from "@mui/x-data-grid";
import CustomDataGrid from "./styled/CustomDataGrid";
import CustomPagination from "./styled/CustomPagination";

const TableData = ({ data, columnTemplate }: any) => {
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
        getRowId={(row) => row.id}
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

export default TableData;
