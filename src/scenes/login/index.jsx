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
    OutlinedInput,
    TextField,
    useTheme
} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import Dashboard from "../dashboard";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import CheckDocumentExistence from "./check";
import useDocumentExistence from "./check";
import {db} from "../../fs/firebaseConfig";
import {collection, query, where, doc, getDoc, getDocs} from "firebase/firestore";



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

    const [update, setUpdated] = useState(email);
    const [updateP, setUpdatedP] = useState(password);

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };
    const handleChangePin = (event) => {
        setPin(event.target.value);
    };
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };


    async function check(e, p) {
        let g = 0;
        const q = query(collection(db, 'employee'), where('email', '==', e), where('password', '==', p));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            g++;
            console.log(doc.id, ' => ', doc.data());
        });
    }

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

                        onClick={() => {
                            //if(check(email, password)){
                            if(check(email, password) >= 1){
                                navigate("/dashboard");
                            }
                            //
                            //} else {
                              //  alert("Invalid Login Credentials");
                            //}
                        }}>
                    Login
                </Button>

            </Box>
        </Box>
    )
}
export default Login;