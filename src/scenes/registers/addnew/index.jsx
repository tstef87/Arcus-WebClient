import React, {useEffect, useState} from 'react'
import {Box, Button, CircularProgress, Icon, InputAdornment, TextField} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Dashboard from "../../dashboard";
import {collection, doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../../fs/firebaseConfig";
import {useLocation, useNavigate} from "react-router-dom";
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import EnhancedEncryptionOutlinedIcon from '@mui/icons-material/EnhancedEncryptionOutlined';
import FlexBetween from "../../../components/FlexBetween";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";



async function addRegister(name, num, rnum, uname, pword, rc) {
    const pid = uname +""+ num +""+ rnum;

    const handleRefresh = () => {
        window.location.reload();
    }

    try {
        const docRef = doc(db, "RevenueCenter", rc);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            setDoc(doc(db, "Registers", pid.toLowerCase()), {
                name: name,
                number: num,
                registerNumber: rnum,
                username: uname,
                password: pword,
                revenueCenter: rc,
                revenue: 0,
                salesTotal: 0

            }).then(r => {
                console.log("Added chechc")
                handleRefresh()
            });
        }
        else{
            setDoc(doc(db, "Registers", pid.toLowerCase()), {
                name: name,
                number: num,
                registerNumber: rnum,
                username: uname,
                password: pword,
                revenueCenter: rc,
                revenue: 0,
                salesTotal: 0
            }).then(r => console.log("added"));

            setDoc(doc(db, "RevenueCenter", rc), {
                sales: 0,
                revenue: 0.00,
                items: ['testpenny']
            }).then(r => handleRefresh())
        }
    } catch (error) {
        console.error('Error checking document existence:', error);
        return false;
    }
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
                <DialogTitle sx={{fontSize: "24px"}}>Add New Register</DialogTitle>
                <DialogContent>
                    <Box>
                        <TextField
                            id="standName"
                            name="standName"
                            onChange={handleChangeSNAME}
                            value={standName}

                            sx={{ m: 1, width: '25ch' }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <Icon>
                                        <StoreOutlinedIcon />
                                    </Icon>
                                </InputAdornment>,
                            }}
                            label="Stand Name"
                        />
                    </Box>

                    <Box>
                        <TextField
                            id="standNum"
                            name="standNum"
                            onChange={handleChangeSNUM}
                            value={standNum}

                            sx={{ m: 1, width: '25ch' }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <Icon>
                                        <NumbersOutlinedIcon />
                                    </Icon>
                                </InputAdornment>,
                            }}
                            label="Stand Number"
                        />
                    </Box>
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
                            label="Login Username"
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
                                    let rc = userName + "" + standNum;
                                    if(standName !== "" &&
                                        standNum !== "" &&
                                        registerNum !== "" &&
                                        userName !== "" &&
                                        password !== ""){
                                        setProgress(true);
                                        handleClose();
                                        addRegister(standName, standNum, registerNum, userName, password, rc).then(r => setProgress(false));
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

export default AddNewRegister;