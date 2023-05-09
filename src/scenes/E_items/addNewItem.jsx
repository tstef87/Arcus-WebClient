import {collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where} from "firebase/firestore";
import {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import * as React from "react";
import Box from "@mui/material/Box";
import {Button, Icon, InputAdornment, TextField} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import {db} from "../../fs/firebaseConfig";
import Dashboard from "../A_dashboard";



async function addItem(name, p, t, pid) {
    const ph = pid;
    const itemColectionref = doc(db, "Items", ph)

    function handleRefresh() {
        window.location.reload();
    }


    setDoc(itemColectionref, {
        idCall: pid,
        name: name,
        price: parseFloat(p),
        type: t
    }).then(r => handleRefresh());

}


export default function AddNewItem(){

    const [active, setActive] = useState("");
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);



    const [itemList, setItemList] = useState([]);


    const [pid, setPid] = useState("");
    const [itemID, setItemID] = useState('');
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState();
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


    const itemListRef = collection(db, "Items");




    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Box>
            <Box paddingTop="20px">
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add New Item
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add new Item</DialogTitle>
                    <DialogContent>

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
                    </DialogContent>
                    <Button
                        onClick={ () => {
                            if(type !== "" &&
                                itemName !== "" &&
                                price >= 0.01){
                                addItem(itemName, price, type, itemName.toLowerCase().replace(/\s/g, '')).then(r => console.error("Done"));
                            }
                            else{
                                alert("One or more Empty Entries")
                            }
                        }}
                    >
                        Add Item
                    </Button>
                </Dialog>
            </Box>
        </Box>
    );
}

