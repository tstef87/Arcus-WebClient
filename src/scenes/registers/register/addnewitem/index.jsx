import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Autocomplete, Box, Button, Icon, InputAdornment, TextField} from "@mui/material";
import Dashboard from "../../../dashboard";
import {addDoc, collection, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../../../../firebase/firebaseConfig";
import FlexBetween from "../../../../components/FlexBetween";
import MailOutlineIcon from "@mui/icons-material/MailOutline";


function addItem(id, name, p, t, rid, items) {

    const pid = name.toLowerCase().replace(/\s/g, '');
    setDoc(doc(db, "Items", pid), {
        name: name,
        price: p,
        type: t
    }).then(r => console.log("added"));

    items.push("Items/" + pid)

    updateDoc(doc(db, "registers", rid), {
        item: items
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
    const id = state;

    const [itemID, setItemID] = useState('');
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
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
        <Box>
            <Box padding="20px">
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
                    <TextField
                        id="type"
                        name="type"
                        onChange={handleChangeType}
                        value={type}

                        sx={{ m: 1, width: '25ch' }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <Icon>
                                    <MailOutlineIcon />
                                </Icon>
                            </InputAdornment>,
                        }}
                        label="Type"
                    />
                </Box>
            </Box>
            <Box>
                <FlexBetween >
                    <Button
                        onClick={ () => {
                            if(itemID !== "" &&
                                itemName !== "" &&
                                price !== ""){

                                addItem(itemID, itemName, price, type, id, registers.item);
                                navigate("/registers/register", {state: id});
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
                            navigate("/registers/register", {state: id});
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