import Dialog from "@mui/material/Dialog";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import CountUpExanple from "./CountUp";

const DialogLoader = () => {
  return (
    <div>
      <Dialog
        open={true}
        //onClose={handleClose}
        fullWidth={true}
        maxWidth="sm"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{ width: "100%", textAlign: "center" }}>
          <CircularProgress
            size={150}
            style={{ textAlign: "center", marginTop: "15%" }}
          />
          <p style={{ textAlign: "center", marginTop: "3%" }}>
            Зареждане....Моля изчакайте <CountUpExanple />
          </p>
        </div>
      </Dialog>
    </div>
  );
};
export default DialogLoader;
