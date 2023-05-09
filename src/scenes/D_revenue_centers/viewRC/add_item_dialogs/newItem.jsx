import * as React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {collection, doc, getDoc, getDocs, query, setDoc, where} from "firebase/firestore";
import {db} from "../../../../fs/firebaseConfig";
import Box from "@mui/material/Box";
import {Button, Divider, Icon, InputAdornment, TextField, Typography} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FlexBetween from "../../../../components/FlexBetween";
import Dashboard from "../../../A_dashboard";


function addItem(name, p, t, itemArr, rc, pid) {

    setDoc(doc(db, "Items", pid), {
        name: name,
        price: parseFloat(p),
        type: t
    }).then(r => console.log("added"));

    setDoc(doc(db, "RevenueCenter", rc), {
        items: itemArr
    }).then(r => console.error("Added Item"));
}

export default function NewItem(rc, itemList) {


    const [active, setActive] = useState("");
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [itemArr, setItemArr] = useState([]);
    const [pid, setPid] = useState("");

    setItemArr(itemList);
    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');


    const [itemID, setItemID] = useState('');
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState(0.0);
    const [type, setType] = useState([]);

    const handleChangeID = (event) => {
        setItemID(event.target.value);
    };
    const handleChangeName = (event) => {
        setItemName(event.target.value);
    };
    const handleChangePrice = (event) => {
        setPrice(event.target.value);
    };
    const handleChangeType = (event) => {
        setType(event.target.value);
    };


    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);



    return (
        <Box >
            <Button onClick={handleClickOpen('paper')}>Add New Item</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Add New Item</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <Box paddingY="40px" paddingX="70px">
                            <Box>
                                <Box>
                                    <h1>Add New Item</h1>
                                </Box>


                                <Box paddingTop="10px">
                                    <TextField
                                        id="name"
                                        name="name"
                                        onChange={handleChangeName}
                                        value={itemName}

                                        sx={{ m: 1, width: '25ch' }}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">
                                                <Icon>
                                                    <MailOutlineIcon />
                                                </Icon>
                                            </InputAdornment>,
                                        }}
                                        label="Item Name"
                                    />
                                </Box>
                                <Box paddingTop="10px">
                                    <TextField
                                        id="price"
                                        name="price"
                                        onChange={handleChangePrice}
                                        value={price}

                                        sx={{ m: 1, width: '25ch' }}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">
                                                <Icon>
                                                    <MailOutlineIcon />
                                                </Icon>
                                            </InputAdornment>,
                                        }}
                                        label="Item Price"
                                    />
                                </Box>

                                <Box>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                        <Select
                                            labelId="select type"
                                            id="type"
                                            value={type}
                                            label="Type"
                                            onChange={handleChangeType}
                                            sx={{ m: 1, width: '25ch' }}
                                        >
                                            <MenuItem value={"Food"}>Food</MenuItem>
                                            <MenuItem value={"Non-Alcoholic Beverage" }>Non-Alcoholic Beverage</MenuItem>
                                            <MenuItem value={"Alcoholic Beverage"}>Alcoholic Beverage</MenuItem>
                                            <MenuItem value={"Test"}>Test</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                            <Box>

                                <Button
                                    onClick={ () => {
                                        if(type !== "" &&
                                            itemName !== "" &&
                                            price !== 0.00){
                                            setPid(itemName.toLowerCase().replace(/\s/g, ''));
                                            //itemArr.push(pid);
                                            addItem(itemName, price, type, itemArr, rc, pid);
                                            navigate("/revenuecenters");
                                            setActive(Dashboard);

                                        }
                                        else{
                                            alert("One or more Empty Entries")
                                        }
                                    }}
                                >
                                    Add Item
                                </Button>

                            </Box>
                        </Box>






                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Refund</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}