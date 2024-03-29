import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import { Button } from "@mui/material";

interface ErrorInterface {
  message?: string;
  setMessage?: React.Dispatch<React.SetStateAction<string>>;
}

const ErrorMessage = ({ message, setMessage }: ErrorInterface) => {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <Dialog
        open={open}
        //onClose={handleClose}
        fullWidth={true}
        maxWidth="sm"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{ width: "100%", textAlign: "center" }}>
          <p style={{ textAlign: "center", marginTop: "3%" }}>
            {message
              ? message
              : " Проблем със зареждането на данните от Инфор."}
          </p>
        </div>
        <Button
          onClick={() => {
            setOpen(false);
            if (setMessage) {
              setMessage("");
            }
            window.location.reload();
          }}
        >
          Затвори
        </Button>
      </Dialog>
    </div>
  );
};
export default ErrorMessage;
