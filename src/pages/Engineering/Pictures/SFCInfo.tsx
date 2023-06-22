import React, { useState } from "react";
import {
  Dialog,
  Button,
  CardMedia,
  Box,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import ErrorMessage from "../../../components/ErrorMessage";
import TableTechnology from "./SFCInfo/TableTechnology";
import CloseIcon from "@mui/icons-material/Close";
import TableMaterials from "./SFCInfo/TableMaterials";

const SFCInfo = ({
  sfc,
  picture,
  item,
}: {
  sfc: string;
  picture: string;
  item: string;
}) => {
  const [open, setOpen] = useState(false);

  const [error, setError] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {sfc}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={false}
        scroll="body"
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">{sfc}</Typography>{" "}
            <Typography variant="h6">
              {item.startsWith("SLS") ? item.substring(9) : item}
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <CardMedia
          component="img"
          sx={{
            width: "30%",
            margin: "auto",
            border: "1px solid black",
            marginTop: 5,
            marginBottom: 5,
          }}
          image={picture}
          alt="Няма изображение"
        />

        <TableTechnology item={item} setError={setError} />
        <TableMaterials sfc={sfc} setError={setError} />
        {error ? <ErrorMessage message={error} setMessage={setError} /> : null}
      </Dialog>
    </div>
  );
};

export default SFCInfo;
