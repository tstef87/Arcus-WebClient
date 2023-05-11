import React, {useEffect, useState} from 'react'
import {Box, Button, CircularProgress, Icon, InputAdornment, TextField} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {useLocation, useNavigate} from "react-router-dom";
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import EnhancedEncryptionOutlinedIcon from '@mui/icons-material/EnhancedEncryptionOutlined';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {db} from "../../../../../fs/firebaseConfig";



async function addRegister(name,  pword, rnum, rc) {
    const pid = rc +""+ rnum;

    const handleRefresh = () => {
        window.location.reload();
    }

    try {
        const docRef = doc(db, "RevenueCenter", rc);
        const docSnap = await getDoc(docRef);


        if(docSnap.exists()){


            setDoc(doc(db, "Registers", pid.toLowerCase()), {
                name: name,
                registerNumber: rnum,
                username: pid.toLowerCase(),
                password: pword,
                revenueCenter: rc,
                revenue: 0,
                salesTotal: 0

            }).then(r => {
                console.log("Added chechc");
                handleRefresh();
            });


        }
        else{
            setDoc(doc(db, "Registers", pid.toLowerCase()), {
                name: name,
                registerNumber: rnum,
                username: pid.toLowerCase(),
                password: pword,
                revenueCenter: rc,
                revenue: 0,
                salesTotal: 0
            }).then(r => console.log("added"));

            setDoc(doc(db, "RevenueCenter", rc), {
                sales: 0,
                revenue: 0.00,
                registers: 1,
                name: name,
                items: []
            }).then(r => handleRefresh())
        }
    } catch (error) {
        console.error('Error checking document existence:', error);
        return false;
    }
}

export default function AddNewRegisterRC(){

    const {state} = useLocation();
    const {rc, name} = state;

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

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [progress, setProgress] = useState(false);



    return (
        <Box>
            <Button variant={"contained"} onClick={handleClickOpen}>
                Add New Register
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{fontSize: "24px", textAlign: 'center'}}>Add New Register</DialogTitle>
                <DialogContent>


                    <Box >
                        <TextField
                            id="registerNum"
                            name="registerNum"
                            onChange={handleChangeRN}
                            value={registerNum}

                            sx={{ m: 1, width: '25ch' }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <Icon>
                                        <PointOfSaleOutlinedIcon />
                                    </Icon>
                                </InputAdornment>,
                            }}
                            label="Register number"
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
                                        <EnhancedEncryptionOutlinedIcon />
                                    </Icon>
                                </InputAdornment>,
                            }}
                            label="Login Password"
                        />
                    </Box>

                    <Box marginTop="10px">
                        <Button variant="contained"
                                onClick={() => {
                                    if(registerNum !== "" &&
                                        password !== ""){
                                        setProgress(true);
                                        handleClose();
                                        addRegister(name, password, registerNum, rc).then(r => console.log("added Register"));
                                    }
                                    else{
                                        alert("One or more Empty Entries")
                                    }
                                }}>
                            Add New
                        </Button>
                        {
                            progress ?
                                (<Box sx={{display: 'flex'}}>
                                    <CircularProgress/>
                                </Box>) : <Box> </Box>

                        }
                    </Box>
                </DialogContent>
            </Dialog>

        </Box>
    )
}
