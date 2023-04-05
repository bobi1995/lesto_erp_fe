import React, { useState } from 'react'
import axios from 'axios';
import { TextField, Box } from '@mui/material'
import SearchBtn from '../../../components/styled/SearchBtn';
import DialogLoader from '../../../components/DialogLoader';
import TableMaterial from './TableMaterial';
import GraphMaterial from './GraphMaterial';

const Item = () => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        setLoading(true)
        axios
            .get(`${process.env.REACT_APP_API_URL}purchase/material?material=${search}`, {
                headers: {
                    //Authorization: "Basic " + localStorage.getItem("token"),
                    "Access-Control-Allow-Origin": "*",
                },
            })
            .then((response) => {
                setData(response.data);
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            });
    }



    return (
        <div >
            {loading ? <DialogLoader /> : null}
            <Box sx={{
                display: "flex",
                justifyContent: 'center',
                marginTop: 5

            }}>
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
                <SearchBtn submit={fetchData}>Търси</SearchBtn>
            </Box>
            {
                data && data.length > 0 ? <>
                    <GraphMaterial data={data} />
                    <TableMaterial data={data} />
                </>
                    : null
            }
        </div>
    )
}

export default Item