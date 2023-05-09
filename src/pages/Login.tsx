import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { Box } from "@mui/material";
import ErrorMessage from "../components/ErrorMessage";
import Welcome from "./Login/Welcome";

export default function FormDialog() {
  const [open, setOpen] = useState(true);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}login?user=${user}&password=${password}`,
        {
          headers: {
            //Authorization: "Basic " + localStorage.getItem("token"),
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("erpToken", response.data.token);
          localStorage.setItem("erpUser", response.data.username);
          handleClose();
        } else setError(response.data);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };

  return (
    <div>
      {open ? null : <Welcome />}
      {error ? <ErrorMessage message={error} setMessage={setError} /> : null}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            textAlign: "center",
          }}
        >
          Влез в профила
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <TextField
              autoFocus
              margin="dense"
              id="user"
              label="Потребител"
              type="email"
              variant="outlined"
              value={user}
              onChange={(e: any) => setUser(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Парола"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogin}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
