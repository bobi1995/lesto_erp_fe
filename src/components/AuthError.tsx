import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AuthError = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="sm"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{ width: "100%", textAlign: "center" }}>
          <p style={{ textAlign: "center", marginTop: "3%" }}>
            Нямаш права за тази сесия. Моля впиши се.
          </p>
        </div>
        <Button onClick={handleClose}>Затвори</Button>
      </Dialog>
    </div>
  );
};
export default AuthError;
