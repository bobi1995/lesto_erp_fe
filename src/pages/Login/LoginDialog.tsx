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
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    localStorage.clear();
  }, []);

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
        console.log(response.data);
        if (response.status === 200) {
          localStorage.setItem("erpToken", response.data.token);
          localStorage.setItem("erpUser", response.data.username);
          localStorage.setItem("erpRights", response.data.rights);
          handleClose();
        } else setError(response.data);
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
  );
};

export default LoginDialog;
