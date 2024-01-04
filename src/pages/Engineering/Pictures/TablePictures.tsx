import React, { useState } from "react";
import { GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid";
import CustomDataGrid from "../../../components/styled/CustomDataGrid";
import CustomPagination from "../../../components/styled/CustomPagination";
import numeral from "numeral";
import { CardMedia, Dialog } from "@mui/material";
import SFCInfo from "./SFCInfo";
import StatusMapperSFC from "../../../components/helper/StatusMapperSFC";
const TablePictures = ({ data }: any) => {
  const [columnVisibilityModel, setColumnVisibilityModel] =
    React.useState<GridColumnVisibilityModel>({
      id: false,
    });
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleClickOpen = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columnTemplate = (): GridColDef[] => {
    return [
      {
        field: "pdno",
        headerName: "Поръчка",
        headerClassName: "home-header",
        editable: false,
        sortable: false,
        headerAlign: "center",
        minWidth: 150,
        renderCell: (params) => (
          <SFCInfo
            sfc={params.value}
            item={params.row.mitm}
            picture={`http://192.168.1.245:8089/${params.row.path}`}
          />
        ),
      },
      {
        field: "osta",
        headerName: "Статус",
        headerClassName: "home-header",
        headerAlign: "center",
        editable: false,
        sortable: false,
        flex: 1,
        renderCell: (params) => <StatusMapperSFC statusCode={params.value} />,
      },
      {
        field: "mitm",
        headerName: "Артикул",
        headerClassName: "home-header",
        headerAlign: "center",
        editable: false,
        sortable: false,
        flex: 1,
        renderCell: (params) =>
          params.value.startsWith("SLS")
            ? params.value.substring(9)
            : params.value,
      },
      {
        field: "qrdr",
        headerName: "Квадратура",
        headerClassName: "home-header",
        editable: false,
        sortable: false,
        headerAlign: "center",
        renderCell: (params) => numeral(params.value).format("0,0.00"),
        minWidth: 250,
      },
      {
        field: "path",
        headerName: "Изображение",
        headerClassName: "home-header",
        headerAlign: "center",
        editable: false,
        sortable: false,
        flex: 1,
        renderCell: (params) => (
          <CardMedia
            component="img"
            sx={{
              width: "45%",
              margin: "0 auto",
              border: "1px solid black",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            image={`http://192.168.1.245:8089/${params.value}`}
            alt="Няма изображение"
            onClick={() =>
              handleClickOpen(`http://192.168.1.245:8089/${params.value}`)
            } // Pass the image URL
          />
        ),
      },
    ];
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        marginTop: 35,
      }}
    >
      <CustomDataGrid
        autoHeight
        rowHeight={150}
        getRowId={(row) => row.pdno}
        rows={data}
        columns={columnTemplate()}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel: any) =>
          setColumnVisibilityModel(newModel)
        }
        pageSize={50}
        components={{
          Pagination: () => <CustomPagination />,
        }}
        rowsPerPageOptions={[5]}
        //checkboxSelection
        disableSelectionOnClick
        disableColumnFilter
        disableColumnMenu
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        experimentalFeatures={{ newEditingApi: false }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        maxWidth="md"
        fullWidth
      >
        <img
          src={selectedImage}
          alt="Няма изображение"
          style={{ width: "100%", height: "auto" }}
        />
      </Dialog>
    </div>
  );
};

export default TablePictures;
