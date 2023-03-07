import {initializeApp} from "firebase/app";
import {db, firebaseConfig} from "../../../firebase/firebaseConfig";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Box, Button, Icon, InputAdornment, TextField} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Dashboard from "../../dashboard";

function addEmployee(fname, lname, email, pword) {

    addDoc(collection(db, "employee"), {
        fname: fname,
        lname: lname,
        email: email,
        password: pword
    }).then(r => alert("added"));


}


const AddNewEmployee = () => {
    const [active, setActive] = useState("");
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    const [fName, setfName] = useState('');
    const [lName, setlName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [updatefName, setUpdatedfName] = useState(fName);
    const [updatelName, setUpdatedlName] = useState(lName);
    const [updateEM, setUpdatedEM] = useState(email);
    const [updatePW, setUpdatedPW] = useState(password);

    const handleChangefNAME = (event) => {
        setfName(event.target.value);
    };
    const handleChangelNAME = (event) => {
        setlName(event.target.value);
    };
    const handleChangeEM = (event) => {
        setEmail(event.target.value);
    };
    const handleChangePW = (event) => {
        setPassword(event.target.value);
    };

    return(
        <Box paddingX="20px">
            <Box>
                <h1>Add New Employee</h1>
            </Box>

            <Box >
                <TextField
                    id="fName"
                    name="fName"
                    onChange={handleChangefNAME}
                    value={fName}

                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <Icon>
                                <MailOutlineIcon />
                            </Icon>
                        </InputAdornment>,
                    }}
                    label="First Name"
                />
            </Box>

            <Box paddingTop="10px">
                <TextField
                    id="lName"
                    name="lName"
                    onChange={handleChangelNAME}
                    value={lName}

                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <Icon>
                                <MailOutlineIcon />
                            </Icon>
                        </InputAdornment>,
                    }}
                    label="Last Name"
                />
            </Box>
            <Box paddingTop="10px">
                <TextField
                    id="email"
                    name="email"
                    onChange={handleChangeEM}
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
                    label="Password"
                />
            </Box>

            <Box>
                <Button variant="outlined"
                        onClick={() => {
                            if(fName !== "" &&
                                lName !== "" &&
                                email !== "" &&
                                password !== ""){

                                addEmployee(fName, lName, email, password);
                                navigate("/employees");
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

export default AddNewEmployee;