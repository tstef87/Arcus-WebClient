import React, {useEffect, useState} from 'react'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {
    Alert, AlertTitle,
    Backdrop,
    Box,
    Button, Chip, CircularProgress,
    FormControl, Icon,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput, Snackbar,
    TextField,
    useTheme
} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import Dashboard from "../A_dashboard";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../fs/firebaseConfig";
import {Stack} from "@mui/system";
import MuiAlert from '@mui/material/Alert';
import SimpleBackdrop from "./backdrop";





const Login = () => {
    const [active, setActive] = useState("");
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [docExists, setDocExists] = useState(false);
    const [emp, setEmp] = useState([]);

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);


    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);



    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [email, setEmail] = useState('');
    const [pin, setPin] = useState('');
    const [password, setPassword] = useState('');

    const [valid, setValid] = useState(false);
    const [open, setOpen] = React.useState(false);

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };
    const handleChangePin = (event) => {
        setPin(event.target.value);
    };
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };


    async function check(e, p){

        const q = query(collection(db, 'Employee'), where('email', '==', e), where('password', '==', p));
        const querySnapshot = await getDocs(q);

        let g =0;
        querySnapshot.forEach(() =>{
            g++;
        });

        if (g>0){
            setValid(true);
            setOpen(false);
        }
        else{
            setValid(false);
            setOpen(true);

        }

    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
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
                    id="email"
                    name="email"
                    onChange={handleChangeEmail}
                    value={email}

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
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        name="password"
                        onChange={handleChangePassword}
                        value={password}

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
                <Button variant="elevated"

                        onClick={ () => {
                            check(email, password).then(r => console.log("checking"));
                            if(valid){
                                navigate("/A_dashboard");
                            }
                        }}>
                    Login
                </Button>

            </Box>
            {open?
                (<Stack spacing={2} sx={{ width: '100%' }}>
                    <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
                        <Alert severity="error" sx={{ width: '100%' }}>
                            Invalid Login Credentials!
                        </Alert>
                    </Snackbar>
                </Stack>):
                (<a></a>)
            }
        </Box>
    )
}
export default Login;