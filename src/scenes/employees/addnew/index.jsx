import {db} from "../../../fs/firebaseConfig";
import {doc, setDoc} from "firebase/firestore";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Icon,
    InputAdornment,
    InputLabel, MenuItem,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Dashboard from "../../dashboard";
import FormControlLabel from "@mui/material/FormControlLabel";
import dayjs from 'dayjs';
import { MuiTelInput } from 'mui-tel-input'
import FlexBetween from "../../../components/FlexBetween";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EnhancedEncryptionOutlinedIcon from '@mui/icons-material/EnhancedEncryptionOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';


function addEmployee(fname, lname, email, pword, ramp, phone, status, pin) {
    if(ramp)
        setDoc(doc(db, "Employee", pin), {
            fname: fname,
            lname: lname,
            email: email,
            password: pword,
            RAMP: true,
            //RAMPDate: rampDate,
            phoneNumber: phone,
            status: status,
            pin: pin,
            totalSales: 0,
            tips: 0.00
        }).then(() => alert("added"));
    else{
        setDoc(doc(db, "Employee", pin), {
            fname: fname,
            lname: lname,
            email: email,
            password: pword,
            RAMP: false,
            phoneNumber: phone,
            status: status,
            pin: pin,
            totalSales: 0,
            tips: 0.00
        }).then(() => alert("added"));
    }
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
    const [status, setStatus] = useState('');
    const [ramp, setRamp] = useState(false);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pin, setPin] = useState('');
    dayjs();
    const handleChangefNAME = (event) => { setfName(event.target.value); };
    const handleChangelNAME = (event) => { setlName(event.target.value); };
    const handleChangeStatus = (event) => { setStatus(event.target.value); };
    const handleChangeRAMPT = () => { setRamp(true); };
    const handleChangeRAMPF = () => { setRamp(false); };
    const handleChangePhoneNumber = (newPhone) => { setPhone(newPhone); };
    const handleChangePin = (event) => { setPin(event.target.value); };
    const handleChangeEM = (event) => { setEmail(event.target.value); };
    const handleChangePW = (event) => { setPassword(event.target.value); };

    return(
        <Box paddingY="30px" paddingX="70px">
            <Box>
                <h1 >Add New Employee:</h1>
            </Box>


            <Box sx={{background: "#181818", marginLeft: "12.5%",  marginRight:"12.5%"}}>
                <Typography sx={{marginLeft: "50px", paddingTop: "20px"}}>Name:</Typography>
                <FlexBetween sx={{marginLeft: "50px",  marginRight:"50px"}}>
                    <Box>
                        <TextField
                            id="fName"
                            name="fName"
                            onChange={handleChangefNAME}
                            value={fName}

                            sx={{ m: 1, width: '35ch' }}
                            label="First Name"
                        />
                    </Box>
                    <Box>
                        <TextField
                            id="lName"
                            name="lName"
                            onChange={handleChangelNAME}
                            value={lName}

                            sx={{ m: 1, width: '35ch' }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <Icon>
                                        <BadgeOutlinedIcon />
                                    </Icon>
                                </InputAdornment>,
                            }}
                            label="Last Name"
                        />
                    </Box>
                </FlexBetween>

                <Typography sx={{marginLeft: "50px"}}>Login Info:</Typography>
                <FlexBetween sx={{marginLeft: "50px",  marginRight:"50px"}}>
                    <Box>
                        <TextField
                            id="email"
                            name="email"
                            onChange={handleChangeEM}
                            value={email}

                            sx={{ m: 1, width: '35ch' }}
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

                            sx={{ m: 1, width: '35ch' }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <Icon>
                                        <EnhancedEncryptionOutlinedIcon />
                                    </Icon>
                                </InputAdornment>,
                            }}
                            label="Password"
                        />
                    </Box>
                </FlexBetween>
                <FlexBetween sx={{marginLeft: "50px",  marginRight:"50px"}}>
                    <Box>
                        <Typography>Status:</Typography>
                        <FormControl sx={{ m: 1, width: '35ch' }}>
                            <InputLabel id="select">Status</InputLabel>
                            <Select
                                labelId="status-select"
                                id="status-select"
                                value={status}
                                label="Status"
                                onChange={handleChangeStatus}
                            >
                                <MenuItem value={"Cashier"}>Cashier</MenuItem>
                                <MenuItem value={"Supervisor"}>Supervisor</MenuItem>
                                <MenuItem value={"Super User"}>Super User</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box>
                        <Typography>Pin:</Typography>
                        <TextField
                            id="pin"
                            name="pin"
                            onChange={handleChangePin}
                            value={pin}

                            sx={{ m: 1, width: '35ch' }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <Icon>
                                        <EnhancedEncryptionOutlinedIcon />
                                    </Icon>
                                </InputAdornment>,
                            }}
                            label="Pin"
                        />
                    </Box>


                </FlexBetween>

                <Box sx={{marginLeft: "50px"}}>
                    <Typography>Phone Number:</Typography>
                    <Box paddingTop="10px">
                        <FormControl>
                            <MuiTelInput
                                value={phone}
                                onChange={handleChangePhoneNumber}
                                defaultCountry="US"
                                sx={{ m: 1, width: '35ch' }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <Icon>
                                            <LocalPhoneOutlinedIcon />
                                        </Icon>
                                    </InputAdornment>,
                                }}
                                label="Phone Number"
                            />

                        </FormControl>
                    </Box>
                </Box>

                <Box sx={{marginLeft: "50px"}}>
                    <Typography>RAMP Certified:</Typography>
                    <Box>
                        <FormControl>
                            <FormLabel id="rampCert"  ></FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="rampCert"
                                defaultValue={false}
                                name="rampCert"
                            >
                                <FormControlLabel value= {true} control={<Radio />} label="Yes"  onChange={handleChangeRAMPT} sx={{ m: 1 }}/>
                                <FormControlLabel value= {false} control={<Radio />} label="No" onChange={handleChangeRAMPF} sx={{ m: 1 }}/>
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </Box>
            </Box>

            <FlexBetween sx={{ marginLeft: "17.5%",  marginRight:"17.5%", paddingTop: "20px"}}>
                <Box>
                    <Button variant="contained"
                            onClick={() => {
                                navigate("/employees");
                                setActive(Dashboard);
                            }}>
                        Back
                    </Button>
                </Box>

                <Box>
                    <Button variant="contained"
                            onClick={() => {
                                if(fName !== "" &&
                                    lName !== "" &&
                                    email !== "" &&
                                    password !== "" &&
                                    phone !== "" &&
                                    status !== "" &&
                                    pin !== "" &&
                                    pin.length < 5 &&
                                    pin.length >= 4){

                                    addEmployee(fName, lName, email, password, ramp, phone, status, pin);
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
            </FlexBetween>

        </Box>
    )
}

export default AddNewEmployee;