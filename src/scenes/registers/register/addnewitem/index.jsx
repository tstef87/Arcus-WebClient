import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Autocomplete, Box, Button, Icon, InputAdornment, TextField} from "@mui/material";
import Dashboard from "../../../dashboard";
import {addDoc, collection, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../../../../fs/firebaseConfig";
import FlexBetween from "../../../../components/FlexBetween";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BasicSelect from "../../../../components/select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";


function addItem(name, p, t, rc) {

    const pid = name.toLowerCase().replace(/\s/g, '');
    setDoc(doc(db, "Items", pid), {
        name: name,
        price: parseFloat(p),
        type: t
    }).then(r => console.log("added"));


    setDoc(doc(db, "RevenueCenter", rc+"/ItemList/"+pid), {
        name: name,
        price: parseFloat(p),
        type: t
    }).then(r => alert("added"));
}

const Addnewitem = () => {

    const [active, setActive] = useState("");
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    const {state} = useLocation();
    const {id, rc} = state;

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


    const [registers, setRegisters] = useState([]);
    const registersCollectionRef = doc(db, "registers", id);

    useEffect(() => {
        const getItemList = async () => {
            try {
                const docSnap = await getDoc(registersCollectionRef);
                const filteredData = docSnap.data((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }));
                setRegisters(filteredData);
                console.log(filteredData);
            }catch (e) {
                console.error(e);
            }
        };
        getItemList().then(r => console.log("done"));
    }, []);

    return(
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
                <FlexBetween >
                    <Button
                        onClick={ () => {
                            if(type !== "" &&
                                itemName !== "" &&
                                price !== 0.00){

                                addItem(itemName, price, type, rc);
                                navigate("/registers/register", {state: {id: id, rc: rc}});
                                setActive(Dashboard);

                            }
                            else{
                                alert("One or more Empty Entries")
                            }
                        }}
                    >
                        Add Item
                    </Button>
                    <Button
                        onClick={ () => {
                            navigate("/registers/register", {state: {id: id, rc: rc}});
                            setActive(Dashboard);
                        }}
                    >
                        Back
                    </Button>
                </FlexBetween>
            </Box>
        </Box>
    )

}

export default Addnewitem;