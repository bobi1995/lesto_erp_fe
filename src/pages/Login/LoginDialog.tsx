import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const LoginDialog = ({ setError, open, setOpen }: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = () => {
    console.log("here");
    axios
      .post(
        `${process.env.REACT_APP_API_URL}login`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem("erpUser", response.data.username);
        localStorage.setItem("erpRights", response.data.rights);
        handleClose();
      })
      .catch((error) => {
        setError(error?.message);
      });
  };

  return (
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
            value={username}
            onChange={(e: any) => setUsername(e.target.value)}
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
  );
};

export default LoginDialog;
