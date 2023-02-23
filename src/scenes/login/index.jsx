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
    TextField
} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import Dashboard from "../dashboard";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDz-hK8oO_OEhTsd0ly9Zqwj3jKapp0Vw8",
    authDomain: "arcus-43b7c.firebaseapp.com",
    projectId: "arcus-43b7c",
    storageBucket: "arcus-43b7c.appspot.com",
    messagingSenderId: "901347999337",
    appId: "1:901347999337:web:7ce80300b3bcfba612acf8",
    measurementId: "G-P9Q49KHFVX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function writeUserData(email, password) {
    const db = getFirestore(app);
    addDoc(collection(db, "cities"), {
        email: email,
        country: password
    }).then(r => alert("added"));
}

const Login = () => {
    function ifValid(email, password){
        if(email == "tstefano87@gmail.com" && password == "Troy654321!"){
            return true;
        }
        else{
            return false;
        }
    }


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

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [update, setUpdated] = useState(email);
    const [updateP, setUpdatedP] = useState(password);


    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
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
                <Button variant="outlined"
                        onClick={() => {
                            //handleClick();
                            //console.log(email);
                            //console.log(password);
                            if(ifValid(email, password)){
                                writeUserData(email, password)
                                navigate("/dashboard");
                                setActive(Dashboard);
                            }
                            else{
                                return(
                                    alert("Invalid Login Credentials")
                                );
                            }

                        }}>
                    Login

                </Button>

            </Box>
        </Box>
    )
}
export default Login;