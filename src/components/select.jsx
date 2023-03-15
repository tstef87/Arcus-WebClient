import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
    const [type, setType] = React.useState('');

    const handleChange = (event) => {
        setType(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="type"
                    value={type}
                    label="Type"
                    onChange={handleChange}
                >
                    <MenuItem value={"Food"}></MenuItem>
                    <MenuItem value={"Non-Alcoholic Beverage" }>Non-Alcoholic Beverage</MenuItem>
                    <MenuItem value={"Alcoholic Beverage"}>Alcoholic Beverage</MenuItem>
                    <MenuItem value={"Test"}>Test</MenuItem>

                </Select>
            </FormControl>
        </Box>
    );
}