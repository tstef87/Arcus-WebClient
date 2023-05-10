import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import {collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where} from "firebase/firestore";
import {db} from "../../../fs/firebaseConfig";
import {useTheme} from "@mui/material/styles";
import * as React from "react";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {Button, Divider, Icon, InputAdornment, List, ListItem, ListItemText, TextField} from "@mui/material";
import FlexBetween from "../../../components/FlexBetween";
import Dashboard from "../../A_dashboard";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import SwipeableViews from 'react-swipeable-views';

import ItemList from "./add_item_dialogs/itemTab";
import SalesTab from "./add_item_dialogs/salesTab";
import ExistingItems from "./add_item_dialogs/existingItem";
import EnhancedRegisterRCTable from "./etable/registers";
import EnhancedRCSalesTable from "./etable/sales";
import ItemETable from "./etable/items";


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


// async function del(id) {
//     await deleteDoc(doc(db, "Registers", id));
// }

const ViewRC = () =>{

    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };


    const {state} = useLocation();
    const {rc} = state;

    const [active, setActive] = useState("");
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

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
                        <EnhancedRegisterRCTable />
                    </TabPanel>

                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <ItemETable />
                        <ItemList />
                    </TabPanel>

                    <TabPanel value={value} index={2} dir={theme.direction}>
                        <EnhancedRCSalesTable />
                    </TabPanel>
                </SwipeableViews>
            </Box>
            <Box paddingTop="10px">
                <Button variant="contained"
                        onClick={() => {
                            navigate("/revenuecenters");
                            setActive(Dashboard);
                        }}>
                    Back
                </Button>
            </Box>
        </Box>
    )
}

export default ViewRC;