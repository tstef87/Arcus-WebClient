import React, {useEffect, useState} from 'react'
import {Box, Button, Icon, InputAdornment, TextField} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Dashboard from "../../dashboard";
import {initializeApp} from "firebase/app";
import {addDoc, collection, doc, getFirestore, setDoc} from "firebase/firestore";
import {db, firebaseConfig} from "../../../../firebaseConfig";
import {useLocation, useNavigate} from "react-router-dom";



function addRegister(name, num, rnum, uname, pword) {


    const pid = uname+num+rnum;

    setDoc(doc(db, "registers", pid.toLowerCase()), {
        name: name,
        number: num,
        registerNumber: rnum,
        username: uname,
        password: pword,
    }).then(r => (
        setDoc(doc(db, "registers", pid.toLowerCase()+"/items/testpenny"), {
            name: "Test Penny",
            price: 0.01,
            type: "Test"
        }).then(r => console.log("Added"))));
}

const AddNewRegister = () => {

    const [active, setActive] = useState("");
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);


    const [standName, setStandName] = useState('');
    const [standNum, setStandNum] = useState('');
    const [registerNum, setRegisterNum] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeSNAME = (event) => {
        setStandName(event.target.value);
    };
    const handleChangeSNUM = (event) => {
        setStandNum(event.target.value);
    };
    const handleChangeRN = (event) => {
        setRegisterNum(event.target.value);
    };
    const handleChangeUN = (event) => {
        setUserName(event.target.value);
    };
    const handleChangePW = (event) => {
        setPassword(event.target.value);
    };


    return (
        <Box paddingY="40px" paddingX="70px">
            <Box>
                <h1>Add New Register</h1>
            </Box>

            <Box >
                <TextField
                    id="standName"
                    name="standName"
                    onChange={handleChangeSNAME}
                    value={standName}

                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <Icon>
                                <MailOutlineIcon />
                            </Icon>
                        </InputAdornment>,
                    }}
                    label="Stand Name"
                />
            </Box>

            <Box paddingTop="10px">
                <TextField
                    id="standNum"
                    name="standNum"
                    onChange={handleChangeSNUM}
                    value={standNum}

                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <Icon>
                                <MailOutlineIcon />
                            </Icon>
                        </InputAdornment>,
                    }}
                    label="Stand Number"
                />
            </Box>
            <Box paddingTop="10px">
                <TextField
                    id="registerNum"
                    name="registerNum"
                    onChange={handleChangeRN}
                    value={registerNum}

                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <Icon>
                                <MailOutlineIcon />
                            </Icon>
                        </InputAdornment>,
                    }}
                    label="Register number"
                />
            </Box>

            <Box>
                <TextField
                    id="userName"
                    name="userName"
                    onChange={handleChangeUN}
                    value={userName}

                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <Icon>
                                <MailOutlineIcon />
                            </Icon>
                        </InputAdornment>,
                    }}
                    label="Login User Name"
                />
            </Box>

            <Box>
                <TextField
                    id="password"
                    name="password"
                    onChange={handleChangePW}
                    value={password}

                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <Icon>
                                <MailOutlineIcon />
                            </Icon>
                        </InputAdornment>,
                    }}
                    label="Login User Name"
                />
            </Box>

            <Box>
                <Button variant="outlined"
                        onClick={() => {
                            if(standName !== "" &&
                                standNum !== "" &&
                                registerNum !== "" &&
                                userName !== "" &&
                                password !== ""){

                                addRegister(standName, standNum, registerNum, userName, password);
                                navigate("/registers");
                                setActive(Dashboard);

                            }
                            else{
                                alert("One or more Empty Entries")
                            }
                        }}>
                    Add New

                </Button>
            </Box>

        </Box>
    )
}

export default AddNewRegister;