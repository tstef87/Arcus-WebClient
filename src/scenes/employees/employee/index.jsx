import {useLocation, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import {Button, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {deleteDoc, doc, getDoc} from "firebase/firestore";
import {db} from "../../../fs/firebaseConfig";
import {useEffect, useState} from "react";
import Dashboard from "../../dashboard";
import * as React from "react";
import FlexBetween from "../../../components/FlexBetween";

async function del(id) {
    await deleteDoc(doc(db, "employee", id));
}


function InboxIcon() {
    return null;
}

function DraftsIcon() {
    return null;
}

const Employee = () =>{

    const {state} = useLocation();
    const id = state; // Read values passed on state

    const [emp, setEmp] = useState([]);

    const empCollectionRef = doc(db, "employee", id);

    const [active, setActive] = useState("");
    const { pathname } = useLocation();
    const navigate = useNavigate();

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



    return(
        <Box paddingY="40px" paddingX="70px"  >
            <h1>Account Information:</h1>
            <Box paddingX="15px" paddingY="10px" sx={{ bgcolor: 'background.paper', borderRadius: '16px' }}>
                <h3>General Info:</h3>
                <Divider/>
                <nav aria-label="personal info">
                    <List>
                        <ListItem>
                            <ListItemText primary={emp.fname + " " + emp.lname} secondary="Name"/>
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <ListItemText primary={emp.status} secondary="Status"/>
                        </ListItem>
                        <Divider />
                    </List>
                </nav>
            </Box>

            <Box padding="5px"/>

            <Box paddingX="15px" paddingY="10px" sx={{ bgcolor: 'background.paper', borderRadius: '16px' }}>
                <h3>Sales Info:</h3>
                <Divider/>
                <nav aria-label="Sales info">
                    <List>
                        <ListItem>
                            <ListItemText secondary="Total Sales" primary= "TODO" />
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <ListItemText primary="Gratuity" secondary="Gratuity"/>
                        </ListItem>
                        <Divider/>

                        <Button onClick={ () => {
                            // TODO
                        }
                        }>
                            View Sales
                        </Button>
                    </List>
                </nav>
            </Box>

            <Box padding="5px"/>

            <Box paddingX="15px" paddingY="10px" sx={{ bgcolor: 'background.paper', borderRadius: '16px' }}>
                <h3>Contact Info:</h3>
                <Divider/>
                <nav aria-label="Contact info">
                    <List>
                        <ListItem>
                            <ListItemText secondary="email" primary={emp.email} />
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <ListItemText primary={emp.phoneNumber} secondary="Phone Number"/>
                        </ListItem>
                        <Divider/>
                    </List>
                </nav>
            </Box>

            <Box padding="5px"/>

            <Box paddingX="15px" paddingY="10px" sx={{ bgcolor: 'background.paper', borderRadius: '16px' }}>
                <h3>Login Info:</h3>
                <Divider/>
                <nav aria-label="Login info">
                    <List>
                        <ListItem>
                            <ListItemText secondary="email" primary={emp.email} />
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <ListItemText primary={emp.password} secondary="Password"/>
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <ListItemText primary={id} secondary="Pin"/>
                        </ListItem>
                        <Divider/>
                    </List>
                </nav>
            </Box>

            <FlexBetween sx={{paddingTop: "20px"}}>
                <Box>
                    <Button variant="contained"
                            onClick={() => {
                                navigate("/employees");
                                setActive(Dashboard);
                            }}>
                        Back
                    </Button>
                </Box>

                <Box>
                    <Button  variant="contained"
                             onClick={ () =>{
                                 del(id);
                                 navigate("/employees");
                                 setActive(Dashboard);
                             }}
                    >
                        Delete
                    </Button>
                </Box>
            </FlexBetween>
        </Box>
    )

}

export default Employee;