import Box from "@mui/material/Box";
import {Button, Collapse, Divider, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {deleteDoc, doc, getDoc} from "firebase/firestore";
import {db} from "../../../fs/firebaseConfig";
import FlexBetween from "../../../components/FlexBetween";
import Dashboard from "../../A_dashboard";
import * as React from "react";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import sales from "../index";

async function del(id) {
    await deleteDoc(doc(db, "Sales", id));
}


function ScrollDialog() {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const {state} = useLocation();
    const {id, emp} = state;

    const [sales, setSales] = useState([]);
    const [items, setItems] = useState([]);


    const saleCollectionRef = doc(db, "Sales", id);

    useEffect(() => {
        const getSale = async () => {
            try {
                const docSnap = await getDoc(saleCollectionRef);
                const filteredSaleData = docSnap.data((doc) => ({
                    ...doc.get(),
                    id: doc.id,

                }));

                const arr = docSnap.get("Items");
                setItems(arr);

                setSales(filteredSaleData);
            }catch (e) {
                console.error(e);
            }
        };
        getSale().then(r => console.log("Got Sale"));
    }, []);

    const [empl, setEmp] = useState([]);

    const empCollectionRef = doc(db, "Employee", emp);

    useEffect(() => {
        const getEmpList = async () => {
            try {
                const docSnap = await getDoc(empCollectionRef);
                const filteredEmpData = docSnap.data((doc) => ({
                    ...doc.get(),
                    id: doc.id,

                }));
                setEmp(filteredEmpData);
            }catch (e) {
                console.error(e);
            }
        };
        getEmpList().then(r => console.log("Got Emp List"));
    }, []);

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
            <Button onClick={handleClickOpen('paper')}>View Receipt</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Recipt</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <Typography textAlign='center' fontSize='48px'>Arcus</Typography>
                        <Typography textAlign='center' fontSize='12'>Cashier: {empl.fname + " " + empl.lname}</Typography>
                        <Typography textAlign='center' fontSize='12px'>Address: 128 Jamestown Ave.</Typography>
                        <Typography textAlign='center' fontSize='12px'>Tel: +1 (610) 555-5555</Typography>
                        <br/>
                        <Divider/>
                        <br/>
                        <Typography textAlign='center' fontSize='18px'>{sales.Time}</Typography>
                        <br/>
                        <Divider/>
                        <br/>
                        <Typography fontSize='24px'>Items</Typography>
                        <Divider/>
                        <br/>
                        <Typography>
                            {items.map( element => (
                                <Typography fontSize={'12px'}>
                                    {element}
                                </Typography>
                            ))}
                        </Typography>
                        <br/>
                        <Divider/>
                        <br/>
                        <Typography fontSize='18px'>Total: {"$"+sales.Price?.toFixed(2)}</Typography>
                        <Typography fontSize='18px'>Tax: {"$"+sales.Tax?.toFixed(2)}</Typography>
                        <Typography fontSize='18px'>Tip: {"$"+sales.Tip?.toFixed(2)}</Typography>
                        <br/>
                        <Divider/>
                        <Typography fontSize='24px'>SubTotal: {"$"+sales.Subtotal?.toFixed(2)}</Typography>
                        <Divider/>

                        <br/>
                        <Typography fontSize='18px' textAlign='center'>Thank you!</Typography>
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

const ViewSale = () =>{

    const [active, setActive] = useState("");
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    const {state} = useLocation();
    const {id, emp} = state;

    const [sales, setSales] = useState([]);
    const [items, setItems] = useState([]);



    const saleCollectionRef = doc(db, "Sales", id);

    useEffect(() => {
        const getSale = async () => {
            try {
                const docSnap = await getDoc(saleCollectionRef);
                const filteredSaleData = docSnap.data((doc) => ({
                    ...doc.get(),
                    id: doc.id,

                }));

                const arr = docSnap.get("Items");
                setItems(arr);

                setSales(filteredSaleData);
            }catch (e) {
                console.error(e);
            }
        };
        getSale().then(r => console.log("Got Sale"));
    }, []);

    const [empl, setEmp] = useState([]);

    const empCollectionRef = doc(db, "Employee", emp);

    useEffect(() => {
        const getEmpList = async () => {
            try {
                const docSnap = await getDoc(empCollectionRef);
                const filteredEmpData = docSnap.data((doc) => ({
                    ...doc.get(),
                    id: doc.id,

                }));
                setEmp(filteredEmpData);
            }catch (e) {
                console.error(e);
            }
        };
        getEmpList().then(r => console.log("Got Emp List"));
    }, []);

    const [open, setOpen] = React.useState(true);
    const handleClick = () => {
        setOpen(!open);
    };

    return(
        <Box paddingY="40px" paddingX="70px"  >
            <h1>Sale Information:</h1>
            <Box paddingX="15px" paddingY="10px" sx={{ bgcolor: '#252525', borderRadius: '16px' }}>
                <h3>Sale Info:</h3>
                <Divider/>
                <nav aria-label="sale info">
                    <List>
                        <ListItem>
                            <ListItemText primary={sales.Subtotal} secondary="Subtotal"/>
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <ListItemText primary={sales.Price} secondary="Total Before Tax and Tip"/>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary={sales.Tip} secondary="Tip"/>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary={sales.Tax} secondary="Tax"/>
                        </ListItem>
                        <Divider />

                        <ListItem>
                            <ListItemText primary={sales.Time} secondary="Time"/>
                        </ListItem>
                        <Divider/>

                        <ListItemButton onClick={handleClick}>
                            <ListItemText primary="Items" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={!open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {items.map( element => (
                                    <ListItem sx={{pl: 4}}>
                                        <ListItemText primary={element}/>
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                        <Divider />
                    </List>
                </nav>
            </Box>

            <Box padding="5px"/>

            <Box paddingX="15px" paddingY="10px" sx={{ bgcolor: '#252525', borderRadius: '16px' }}>
                <h3>Other Info:</h3>
                <Divider/>
                <nav aria-label="Other info">
                    <List>
                        <ListItemButton onClick={ () => {
                            navigate("/B_employees/employee", { state: empl.pin });
                            setActive(Dashboard);
                        }}>
                            <ListItemText primary= {empl.fname + " " + empl.lname} secondary="Cashier"/>
                        </ListItemButton>

                        <Divider />


                        <ListItemButton>
                            <ListItemText primary={sales.rc} secondary="Revenue Center"/>
                        </ListItemButton>
                        <Divider/>

                        <ListItemButton onClick={ () => {
                            navigate("/C_registers/register", {
                                state: {
                                    id: sales.reg,
                                    rc: sales.rc
                                }
                            });
                            setActive(Dashboard);
                        }
                        }>
                            <ListItemText primary={sales.reg} secondary="Register"/>
                        </ListItemButton>
                        <Divider/>
                        <ScrollDialog />
                        <Divider />
                    </List>
                </nav>
            </Box>

            <Box padding="5px"/>

            <FlexBetween sx={{paddingTop: "20px"}}>
                <Box>
                    <Button variant="contained"
                            onClick={() => {
                                navigate("/F_sales");
                                setActive(Dashboard);
                            }}>
                        Back
                    </Button>
                </Box>

                <Box>
                    <Button  variant="contained"
                             onClick={ () =>{
                                 del(id);
                                 navigate("/F_sales");
                                 setActive(Dashboard);
                             }}
                    >
                        Refund Purchase
                    </Button>
                </Box>
            </FlexBetween>
        </Box>
    );

}

export default ViewSale;