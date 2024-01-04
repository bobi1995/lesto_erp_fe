import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { TextField, Box } from "@mui/material";
import SearchBtn from "../../../components/styled/SearchBtn";
import DialogLoader from "../../../components/DialogLoader";
import TableMaterial from "./TableMaterial";
import GraphMaterial from "./GraphMaterial";
import AuthError from "../../../components/AuthError";

const Item = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [authErr, setAuthErr] = useState(false);
  const searchBtnRef = useRef<HTMLButtonElement>(null);

  const fetchData = async () => {
    console.log(search);
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}purchase/material?material=${search}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        const newData = response.data.map((item: any, index: any) => ({
          ...item,
          id: index + 1,
        }));

        setData(newData);
        setLoading(false);
      })
      .catch((error) => {
        if (error && error.response && error.response.status === 401) {
          return setAuthErr(true);
        }
        setLoading(false);
      });
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default behavior of the Enter key

      searchBtnRef.current?.click();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []); // Empty dependency array ensures that the effect runs only once, similar to componentDidMount

  return (
    <div>
      {loading ? <DialogLoader /> : null}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 5,
        }}
      >
        <TextField
          id="outlined-controlled"
          label="Въведи материал"
          value={search}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(event.target.value);
          }}
          style={{
            marginRight: 10,
          }}
        />
        <SearchBtn reference={searchBtnRef} submit={fetchData}>
          Търси
        </SearchBtn>
      </Box>
      {data && data.length > 0 ? (
        <>
          <GraphMaterial data={data} />
          <TableMaterial data={data} />
        </>
      ) : null}
      {authErr ? <AuthError /> : null}
    </div>
  );
};

export default Item;
