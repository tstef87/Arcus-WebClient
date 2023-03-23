import {useLocation, useNavigate} from "react-router-dom";
import {doc, getDoc, getDocs, deleteDoc, collection, where, query} from "firebase/firestore";
import {db} from "../../../firebase/firebaseConfig";
import {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import FlexBetween from "../../../components/FlexBetween";
import Dashboard from "../../dashboard";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as React from "react";

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
    await deleteDoc(doc(db, "registers", id));
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
    const id = state;

    const [registers, setRegisters] = useState([]);
    const [itemList, setItemList] = useState([]);

    const registersCollectionRef = doc(db, "registers", id);
    const itemsCollectionRef = collection(db, "registers/"+id+"/items")


    useEffect(() => {
        const getItemList = async () => {
            try {
                const data = await getDocs(itemsCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }));

                setItemList(filteredData);
                console.log("items");
                console.log(filteredData);
            }catch (e) {
                console.error(e);
            }
        };
        getItemList().then(r => console.log("Got Item List"));
    }, []);


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

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return(
        <Box paddingY="40px" paddingX="70px">

            <Box sx={{ bgcolor: 'background.paper'}}>
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
                        <FlexBetween>
                            <Box marginLeft="25%">
                                <h1>Register Info:</h1>
                                <Box paddingX="5px">
                                    <h3>ID: {id}</h3>
                                    <h3>Stand Name: {registers.name}</h3>
                                    <h3>Stand Number: {registers.number}</h3>
                                    <h3>Register Number: {registers.registerNumber}</h3>
                                </Box>
                            </Box>
                            <Box marginRight="25%">
                                <h1>Login Info</h1>
                                <Box paddingX="5px">
                                    <h3>Username: {registers.username}</h3>
                                    <h3>Password: {registers.password}</h3>
                                </Box>
                            </Box>
                        </FlexBetween>
                        <Box>
                            <FlexBetween paddingY="10px">
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
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                                            key={itemList.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">{ item.id}</TableCell>
                                            <TableCell align="right">{item.name}</TableCell>
                                            <TableCell align="right">{item.price}</TableCell>
                                            <TableCell align="right">{item.type}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Box paddingTop="20px">
                            <Button  variant="contained"
                                    onClick={ () =>{
                                        navigate("/registers/register/additem", {state: id});
                                        setActive(Dashboard);
                                    }}
                            >
                                Add Item
                            </Button>
                        </Box>
                    </TabPanel>

                    <TabPanel value={value} index={2} dir={theme.direction}>
                        Sales
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