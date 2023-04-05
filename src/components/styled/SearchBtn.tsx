import React from 'react'
import { Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
const SearchBtn = ({ children, submit }: any) => {
    return (
        <Button style={{
            backgroundColor: '#AAAAAD',
            color: 'white'
        }}
            onClick={submit}>
            <SearchIcon />{children}
        </Button >
    )
}

export default SearchBtn