import React from 'react'
import {Box, Icon, InputAdornment, TextField} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const AddNew = () => {
    return (
        <Box paddingX="20px">
            <Box>
                <h1>Add New Register</h1>
            </Box>
            <Box paddingTop="10px">
                <TextField
                    id="outlined-start-adornment"

                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <Icon>
                                <MailOutlineIcon />
                            </Icon>
                        </InputAdornment>,
                    }}
                    label="Name"
                />
            </Box>
            <Box paddingTop="10px">
                <TextField
                    id="outlined-start-adornment"

                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <Icon>
                                <MailOutlineIcon />
                            </Icon>
                        </InputAdornment>,
                    }}
                    label="Email"
                />
            </Box>
        </Box>
    )
}

export default AddNew;