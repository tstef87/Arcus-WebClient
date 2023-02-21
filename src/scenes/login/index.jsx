import React, {useEffect, useState} from 'react'
import AddNew from "../registers/addnew";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {
    Box,
    Button, Chip,
    FormControl, Icon,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField
} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import Dashboard from "../dashboard";
import {Visibility, VisibilityOff} from "@mui/icons-material";
const Login = () => {

    const [active, setActive] = useState("");

    const { pathname } = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (


        <Box textAlign="center" paddingY="100px" sx={{
            width: "100%",
            height: "100%",
            backgroundImage: "linear-gradient(to bottom right, orange, purple)",
        }}>

            <Box fontSize={72}>
                Arcus
            </Box>
            <Box>

            </Box>
            <Box>
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

            <Box>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
            </Box>
            <Box >
                <Button variant="outlined"
                        onClick={() => {
                            navigate("/dashboard");
                            setActive(Dashboard);
                        }}>
                    Login
                </Button>
            </Box>
        </Box>
    )
}

export default Login;