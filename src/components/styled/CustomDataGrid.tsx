import { DataGrid, gridClasses } from "@mui/x-data-grid";
import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";

const CustomDataGrid = styled(DataGrid)({
    m: 2, // Sets the margin to 2 times the spacing unit = 16px
    boxShadow: "2pxs",
    border: "2px",
    borderColor: "#F4F4F4",
    width: "95%",
    margin: "auto",

    [`& .${gridClasses.row}.even`]: {
        backgroundColor: "#EDEEF2",
        "&:hover, &.Mui-hovered": {
            backgroundColor: grey[300],
            "@media (hover: none)": {
                backgroundColor: "transparent",
            },
        },
    },
    "& .MuiDataGrid-cell:hover": {
        fontWeight: "800",
    },
    "& .MuiDataGrid-sortIcon": {
        color: "white",
    },
    "& .MuiDataGrid-columnHeaders": {
        backgroundColor: "#5A607A",
        color: "white",
    },
    "& .MuiCheckbox-root svg": {
        backgroundColor: "transparent",
        color: "white",
        height: "100%",
        "$:focus": {
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

export default CustomDataGrid;