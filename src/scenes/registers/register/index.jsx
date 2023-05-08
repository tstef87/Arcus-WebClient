import {useLocation, useNavigate} from "react-router-dom";
import {doc, getDoc, getDocs, deleteDoc, collection, query, where} from "firebase/firestore";
import {db} from "../../../fs/firebaseConfig";
import {useEffect, useState} from "react";
import {
    Button,
    Divider,
    List, ListItem, ListItemText
} from "@mui/material";
import FlexBetween from "../../../components/FlexBetween";
import Dashboard from "../../dashboard";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

import PropTypes, {number} from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as React from "react";
import {Diversity1} from "@mui/icons-material";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}


async function del(id) {
    await deleteDoc(doc(db, "Registers", id));
}

const RegisterInfo = () =>{

    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const [active, setActive] = useState("");
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    const {state} = useLocation();
    const {id, rc} = state;

    const [registers, setRegisters] = useState([]);
    const [itemList, setItemList] = useState([]);
    const [sales, setSales] = useState([]);


    useEffect(() => {
        const getSales = async () => {
            try {
                const salesCollectionRef = collection(db, "Sales");
                const q = query(salesCollectionRef, where("rc", "==", rc));

                const querySnapshot = await getDocs(q);

                const filteredData = querySnapshot.docs.map((doc) => ({
                    Price: doc.get("Price"),
                    Tax: doc.get("Tax"),
                    Tip: doc.get("Tip"),
                    Time: doc.get("Time"),
                    Subtotal: doc.get("Subtotal"),
                    id: doc.id,
                }));

                setSales(filteredData);
                console.log(filteredData);
            }catch (e) {
                console.error(e);
            }
        };
        getSales().then(r => console.log("Got Sales"));
    }, []);


    const registersCollectionRef = doc(db, "Registers", id);

    useEffect(() => {
        const getRegistersList = async () => {
            try {
                const docSnap = await getDoc(registersCollectionRef);
                const filteredRegData = docSnap.data((doc) => ({
                    ...doc.get(),
                    id: doc.id,
                }));

                setRegisters(filteredRegData);
            }catch (e) {
                console.error(e);
            }
        };
        getRegistersList().then(r => console.log("Got Register List"));
    }, []);


    const itemsCollectionRef = doc(db, "RevenueCenter", rc);
    const itemListRef = collection(db, "Items");

    useEffect(() => {
        const getItemList = async () => {
            try {
                const docSnap = await getDoc(itemsCollectionRef)
                const itemArr = docSnap.get("items");

                const q = query(itemListRef, where('idCall', 'in', itemArr));
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



    return(
        <Box paddingY="40px" paddingX="70px">

            <Box sx={{ bgcolor: '#383838'}}>
                <AppBar position="static">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Register Info" {...a11yProps(0)} />
                        <Tab label="Register Items" {...a11yProps(1)} />
                        <Tab label="Register Sales" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <Box>
                            <Box paddingX="15px" paddingY="10px" sx={{ bgcolor: '#252525', borderRadius: '16px' }}>
                                <h3>Register Info:</h3>
                                <Divider/>
                                <nav aria-label="Register info">
                                    <List>
                                        <ListItem>
                                            <ListItemText secondary="ID" primary={id} />
                                        </ListItem>
                                        <Divider/>
                                        <ListItem>
                                            <ListItemText secondary="Revenue Center" primary={rc} />
                                        </ListItem>
                                        <Divider/>
                                        <ListItem>
                                            <ListItemText primary={registers.name} secondary="Stand Name"/>
                                        </ListItem>
                                        <Divider/>
                                        <ListItem>
                                            <ListItemText primary={registers.number} secondary="Stand Number"/>
                                        </ListItem>
                                        <Divider/>
                                        <ListItem>
                                            <ListItemText primary={registers.registerNumber} secondary="Register Number"/>
                                        </ListItem>
                                        <Divider/>
                                    </List>
                                </nav>
                            </Box>

                            <Box padding="5px" />

                            <Box paddingX="15px" paddingY="10px" sx={{ bgcolor: '#252525', borderRadius: '16px' }}>
                                <h3>Sales Info:</h3>
                                <Divider/>
                                <nav aria-label="Login info">
                                    <List>
                                        <ListItem>
                                            <ListItemText secondary="Number of Sales" primary={registers.salesTotal} />
                                        </ListItem>
                                        <Divider/>
                                        <ListItem>
                                            <ListItemText primary={registers.revenue} secondary="Total Revenue"/>
                                        </ListItem>
                                        <Divider/>

                                        <Button >
                                            View Sales
                                        </Button>
                                    </List>
                                </nav>
                            </Box>

                            <Box padding="5px" />


                            <Box paddingX="15px" paddingY="10px" sx={{ bgcolor: '#252525', borderRadius: '16px' }}>
                                <h3>Login Info:</h3>
                                <Divider/>
                                <nav aria-label="Login info">
                                    <List>
                                        <ListItem>
                                            <ListItemText secondary="Username" primary={id} />
                                        </ListItem>
                                        <Divider/>
                                        <ListItem>
                                            <ListItemText primary={registers.password} secondary="Password"/>
                                        </ListItem>
                                        <Divider/>
                                    </List>
                                </nav>
                            </Box>
                        </Box>
                        <Box>
                            <FlexBetween paddingTop="20px">
                                <Button variant="contained" align="center"
                                        onClick= { () => {
                                            del(id).then(r => alert("Deleted"))
                                            navigate("/registers");
                                            setActive(Dashboard);
                                        }}
                                >
                                    Delete
                                </Button>

                                <Button variant="contained" align="center"
                                >
                                    Edit
                                </Button>
                            </FlexBetween>

                        </Box>
                    </TabPanel>

                    <TabPanel value={value} index={1} dir={theme.direction}>

                        <h1>Register Items:</h1>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table" bgcolor="#252525">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell align="right">Item Name</TableCell>
                                        <TableCell align="right">Item Price</TableCell>
                                        <TableCell align="right">Item Type</TableCell>
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
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TabPanel>

                    <TabPanel value={value} index={2} dir={theme.direction}>

                        <h1>Sales:</h1>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table" bgcolor="#252525">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">Tax</TableCell>
                                        <TableCell align="right">gratuity</TableCell>
                                        <TableCell align="right">Subtotal</TableCell>
                                        <TableCell align="right">Time of Transaction</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {  sales.map((sale) => (
                                        <TableRow
                                            key={sale.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">{ sale.id}</TableCell>
                                            <TableCell align="right">{"$" + sale.Price}</TableCell>
                                            <TableCell align="right">{"$" + sale.Tax}</TableCell>
                                            <TableCell align="right">{"$" + sale.Tip}</TableCell>
                                            <TableCell align="right">{"$" + sale.Subtotal}</TableCell>
                                            <TableCell align="right">{sale.Time}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>



                    </TabPanel>
                </SwipeableViews>
            </Box>
            <Box paddingTop="10px">
                <Button variant="contained"
                        onClick={() => {
                            navigate("/registers");
                            setActive(Dashboard);
                        }}>
                    Back
                </Button>
            </Box>
        </Box>
    )
}

export default RegisterInfo;