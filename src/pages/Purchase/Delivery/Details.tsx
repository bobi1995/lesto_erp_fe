import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import moment from "moment";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Details = ({ event, setEvent }: any) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setEvent(null);
    setOpen(false);
  };
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {event.ClientOrder}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            Поръчка: <b>{event.OrderNumber}</b>
          </Typography>
          <Typography gutterBottom>
            Дата на доставка:{" "}
            <b>{moment(event.DeliveryDate).format("DD-MMM-YYYY")}</b>
          </Typography>

          <Typography gutterBottom>
            Клиент: <b>{event.Client}</b>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} style={{ margin: "0 auto" }}>
            Затвори
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default Details;
