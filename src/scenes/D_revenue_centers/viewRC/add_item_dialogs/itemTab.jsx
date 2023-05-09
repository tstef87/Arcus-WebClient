import {collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where} from "firebase/firestore";
import {db} from "../../../../fs/firebaseConfig";
import {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import Box from "@mui/material/Box";
import {Button, Icon, InputAdornment, TextField} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Dashboard from "../../../A_dashboard";
import DialogActions from "@mui/material/DialogActions";
import SwipeableViews from 'react-swipeable-views';
import ExistingItems from "./existingItem";
import FlexBetween from "../../../../components/FlexBetween";


async function del(id, rc, itemArr) {

    const filteredArray = itemArr.filter(item => item !== id);
    await updateDoc(doc(db, "RevenueCenter", rc), {
        items: [...filteredArray]
    });
}



async function addItem(name, p, t, itemArr, rc, pid) {
    const ph = pid;
    const itemColectionref = doc(db, "Items", ph)


    setDoc(itemColectionref, {
        idCall: pid,
        name: name,
        price: parseFloat(p),
        type: t
    }).then(r => console.log("added"));

    await updateDoc(doc(db, "RevenueCenter", rc), {
        items: [...itemArr, pid]
    });

}

function Existing() {
    return null;
}

export default function ItemList(){

    const [active, setActive] = useState("");
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);


    const {state} = useLocation();
    const {rc} = state;

    const [itemList, setItemList] = useState([]);
    const [sales, setSales] = useState([]);


    const [pid, setPid] = useState("");
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


    const itemsCollectionRef = doc(db, "RevenueCenter", rc);
    const itemListRef = collection(db, "Items");

    const [itemArr, setItemArr] = useState([]);

    useEffect(() => {
        const getItemList = async () => {
            try {

                const docSnap = await getDoc(itemsCollectionRef)
                const itemArrTemp = docSnap.get("items");
                setItemArr(itemArrTemp);

                const q = query(itemListRef, where('idCall', 'in', itemArrTemp));
                const querySnapshot = await getDocs(q);
                const filteredData = querySnapshot.docs.map((doc) => ({
                    idCall: doc.get("idCall"),
                    name: doc.get("name"),
                    price: doc.get("price"),
                    type: doc.get("type"),
                    id: doc.id,
                }));

                setItemList(filteredData);
                console.log(filteredData);


            }catch (e) {
                console.error(e);
            }
        };
        getItemList().then(r => console.log("Got Item List"));
    }, []);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleRefresh() {
        window.location.reload();
    }


    return (
        <Box>
            <h1>Items</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" bgcolor="#252525">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Item Name</TableCell>
                            <TableCell align="right">Item Price</TableCell>
                            <TableCell align="right">Item Type</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { itemList.map((item) => (
                            <TableRow
                                key={item.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{ item.id}</TableCell>
                                <TableCell align="right">{item.name}</TableCell>
                                <TableCell align="right">{"$ "+item.price?.toFixed(2)}</TableCell>
                                <TableCell align="right">{item.type}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={ () => {
                                        del(item.id, rc, itemArr).then(r => handleRefresh());
                                    }
                                    }>
                                        X
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box paddingTop="20px">
                <FlexBetween>
                    <Box>
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
                                        price !== 0.00){
                                        addItem(itemName, price, type, itemArr, rc, itemName.toLowerCase().replace(/\s/g, '')).then(r => console.error("Done"));
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
                        </Dialog>
                    </Box>
                    <Box>
                        <ExistingItems />
                    </Box>
                </FlexBetween>
            </Box>
        </Box>
    );
}

