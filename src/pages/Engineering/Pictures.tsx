import axios from "axios";
import { useState, useEffect } from "react";
import DialogLoader from "../../components/DialogLoader";
import ErrorMessage from "../../components/ErrorMessage";
import TablePictures from "./Pictures/TablePictures";
import { TextField, Box } from "@mui/material";
import SearchBtn from "../../components/styled/SearchBtn";

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  fontSize: "24px",
  fontWeight: "bold",
  color: "#333", // Choose your desired text color
  backgroundColor: "#f8f8f8", // Choose your desired background color
};
const Pictures = () => {
  const [openSls, setOpenSls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  return <div style={containerStyle}>Coming soon</div>;

  const fetchData = async () => {
    setLoading(true);
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}engineering/pictures?item=${search}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: "Basic " + localStorage.getItem("erpToken"),
          },
        }
      )
      .then((response) => {
        setOpenSls(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);

        setError(error);
      });
  };

  useEffect(() => {
    if (search) {
      fetchData();
    }
  }, []);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 5,
        }}
      >
        <TextField
          id="outlined-controlled"
          label="Въведи SLS"
          value={search}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(event.target.value);
          }}
          style={{
            marginRight: 10,
          }}
        />
        <SearchBtn submit={fetchData}>Търси</SearchBtn>
      </Box>
      {loading ? <DialogLoader /> : null}
      {error ? <ErrorMessage message={error} setMessage={setError} /> : null}
      {openSls && openSls.length > 0 ? (
        <Box>
          <TablePictures data={openSls} />
        </Box>
      ) : null}
    </div>
  );
};

export default Pictures;
