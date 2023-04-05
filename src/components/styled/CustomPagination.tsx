import React from "react";
import Box from "@mui/material/Box";
import {
    gridPageCountSelector,
    gridPageSelector,
    gridRowCountSelector,
    useGridApiContext,
    useGridSelector,
    gridPaginatedVisibleSortedGridRowEntriesSelector,
} from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useSearchParams } from "react-router-dom";

interface PaginationProps {
    setFilterPage?: React.Dispatch<React.SetStateAction<any>>;
}

export default function CustomPagination({ setFilterPage }: PaginationProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    const rows = useGridSelector(apiRef, gridRowCountSelector);
    const currentPageRows = useGridSelector(
        apiRef,
        gridPaginatedVisibleSortedGridRowEntriesSelector
    );

    return (
        <Box sx={{ width: "100%" }}>
            <Typography
                sx={{
                    fontSize: "small",
                    fontWeight: 300,
                    color: "#707070",
                }}
            >
                {/* TODO calculate this dynamically */}
                Показани {currentPageRows.length} резултата от {rows}
            </Typography>
            <Pagination
                sx={{ position: "absolute", bottom: 10, right: 0 }}
                color="primary"
                variant="outlined"
                shape="rounded"
                page={page + 1}
                count={pageCount}
                // @ts-expect-error
                renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
                onChange={(event: React.ChangeEvent<unknown>, value: number) => {
                    apiRef.current.setPage(value - 1);
                    if (setFilterPage) {
                        setFilterPage(value);
                    }
                    let updatedParams = new URLSearchParams(searchParams);
                    updatedParams.set("page", value.toString());
                    setSearchParams(updatedParams);
                }}
            />
        </Box>
    );
}