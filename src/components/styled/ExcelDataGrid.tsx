import { DataGrid, gridClasses } from "@mui/x-data-grid";
import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";

const ExcelDataGrid = styled(DataGrid)({
  m: 2,
  border: "1px solid #ccc", // Add a border around the grid
  width: "100%",
  margin: 0,
  fontSize: "12px", // Reduce font size to make rows smaller

  [`& .${gridClasses.row}`]: {
    maxHeight: 10,
    backgroundColor: "#FFFFFF",
    "&:hover, &.Mui-hovered": {
      backgroundColor: "#F2F2F2", // Grayish background on hover
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
  },

  "& .MuiDataGrid-cell": {
    border: "1px solid #ccc", // Add borders to cells
    padding: "2px 4px", // Adjust padding for cell content
    "&.MuiDataGrid-cellEditing": {
      background: "inherit",
    },
  },

  "& .MuiDataGrid-sortIcon": {
    color: "#000",
  },

  "& .MuiDataGrid-columnHeader": {
    backgroundColor: "#F2F2F2", // Grayish column header background
    color: "#000",
    borderBottom: "1px solid #ccc", // Add a border to column headers
    height: "32px", // Adjust column header height
    display: "flex",
    alignItems: "center",
    padding: "0 4px", // Adjust padding for column header content
    fontSize: "14px", // Increase font size for headers
    fontWeight: "bold", // Make headers bold
  },

  "& .MuiCheckbox-root svg": {
    backgroundColor: "transparent",
    color: "black",
    height: "100%",
    "&:focus": {
      outline: 0,
    },
    "&:active": {
      outline: 0,
    },
  },

  "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
    outline: "none !important",
  },
});

export default ExcelDataGrid;
