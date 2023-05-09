import {db} from "../../../fs/firebaseConfig";
import {doc, setDoc} from "firebase/firestore";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {
    Box,
    Button,
    FormControl,
    FormLabel, Grid,
    Icon,
    InputAdornment,
    InputLabel, MenuItem,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Dashboard from "../../A_dashboard";
import FormControlLabel from "@mui/material/FormControlLabel";
import { MuiTelInput } from 'mui-tel-input'
import FlexBetween from "../../../components/FlexBetween";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EnhancedEncryptionOutlinedIcon from '@mui/icons-material/EnhancedEncryptionOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";


const handleRefresh = () => {
    window.location.reload();
}

//Adding new employee to database
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
        }).then(() => {
            alert("added");
            handleRefresh();
        });
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
        }).then(() => {
            alert("added");
            handleRefresh();
        });
    }
}


const AddNewEmployee = () => {

    //initialising my constants
    const [active, setActive] = useState("");
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [fName, setfName] = useState('');
    const [lName, setlName] = useState('');
    const [status, setStatus] = useState('');
    const [ramp, setRamp] = useState(false);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pin, setPin] = useState('');
    const [open, setOpen] = React.useState(false);

    //handling changes in text-fields
    const handleChangefNAME = (event) => { setfName(event.target.value); };
    const handleChangelNAME = (event) => { setlName(event.target.value); };
    const handleChangeStatus = (event) => { setStatus(event.target.value); };
    const handleChangeRAMPT = () => { setRamp(true); };
    const handleChangeRAMPF = () => { setRamp(false); };
    const handleChangePhoneNumber = (newPhone) => { setPhone(newPhone); };
    const handleChangePin = (event) => { setPin(event.target.value); };
    const handleChangeEM = (event) => { setEmail(event.target.value); };
    const handleChangePW = (event) => { setPassword(event.target.value); };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    return(

        <Box >
            <Button variant="contained" onClick={handleClickOpen}>
                Add New Employee
            </Button>
            <Dialog
                maxWidth={true}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Add New Employee"}
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{marginBottom: 1.5}}>Name: </Typography>
                    <Grid container={true} spacing={2} >
                        <Grid item xs={6}>
                            <item>
                                <TextField
                                    id="fName"
                                    name="fName"
                                    onChange={handleChangefNAME}
                                    value={fName}

                                    sx={{ width: '35ch' }}
                                    label="First Name"
                                />
                            </item>
                        </Grid>
                        <Grid item xs={6}>
                            <item>
                                <TextField
                                    id="lName"
                                    name="lName"
                                    onChange={handleChangelNAME}
                                    value={lName}

                                    sx={{ width: '35ch' }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <Icon>
                                                <BadgeOutlinedIcon />
                                            </Icon>
                                        </InputAdornment>,
                                    }}
                                    label="Last Name"
                                />
                            </item>
                        </Grid>
                    </Grid>

                    <Typography sx={{marginTop: 1.5, marginBottom: 1.5}}>Login info:</Typography>
                    <Grid container={true} spacing={2}>
                        <Grid item xs={6}>
                            <item>
                                <TextField
                                    id="email"
                                    name="email"
                                    onChange={handleChangeEM}
                                    value={email}
                                    sx={{width: '35ch' }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <Icon>
                                                <MailOutlineIcon />
                                            </Icon>
                                        </InputAdornment>,
                                    }}
                                    label="Email"
                                />
                            </item>
                        </Grid>

                        <Grid item xs={6}>
                            <item>
                                <TextField
                                    id="password"
                                    name="password"
                                    onChange={handleChangePW}
                                    value={password}

                                    sx={{width: '35ch' }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <Icon>
                                                <EnhancedEncryptionOutlinedIcon />
                                            </Icon>
                                        </InputAdornment>,
                                    }}
                                    label="Password"
                                />
                            </item>
                        </Grid>
                    </Grid>

                    <Typography marginTop={1.5} marginBottom={1.5}>Other Info:</Typography>
                    <Grid container={true} spacing={2}>
                        <Grid item xs={6}>
                            <item>
                                <FormControl >
                                    <InputLabel id="select">Status</InputLabel>
                                    <Select
                                        sx={{ width: '35ch' }}
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
                            </item>
                        </Grid>
                        <Grid item xs={6}>
                            <item>
                                <TextField
                                    id="pin"
                                    name="pin"
                                    onChange={handleChangePin}
                                    value={pin}

                                    sx={{ width: '35ch' }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <Icon>
                                                <EnhancedEncryptionOutlinedIcon />
                                            </Icon>
                                        </InputAdornment>,
                                    }}
                                    label="Pin"
                                />
                            </item>
                        </Grid >
                    </Grid>
                    <Box marginTop={1.5} marginBottom={1.5}>
                        <FormControl>
                            <MuiTelInput
                                value={phone}
                                onChange={handleChangePhoneNumber}
                                defaultCountry="US"
                                sx={{  width: '35ch' }}
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
                    <Typography marginTop={1.5}> RAMP Certification:</Typography>
                    <Box >
                        <FormControl sx={{  width: '35ch' }}>
                            <FormLabel id="rampCert"  ></FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="rampCert"
                                defaultValue={false}
                                name="rampCert"
                            >
                                <FormControlLabel value= {true} control={<Radio />} label="Yes"  onChange={handleChangeRAMPT} />
                                <FormControlLabel value= {false} control={<Radio />} label="No" onChange={handleChangeRAMPF} />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button variant={'contained'} onClick={handleClose}>Cancel</Button>
                    <Button variant={'contained'} onClick={() => {
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
                        }
                        else{
                            alert("One or more Empty Entries")
                        }
                        handleClose();
                    }} autoFocus>
                        Add Employee
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default AddNewEmployee;