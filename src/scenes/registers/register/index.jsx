import {useLocation, useNavigate} from "react-router-dom";
import { doc, getDoc, getDocs, deleteDoc} from "firebase/firestore";
import {db} from "../../../firebase/firebaseConfig";
import {useEffect, useState} from "react";
import {Box, Button} from "@mui/material";
import FlexBetween from "../../../components/FlexBetween";
import Dashboard from "../../dashboard";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

async function del(id) {
    await deleteDoc(doc(db, "registers", id));
}

const Register = () =>{

    const [active, setActive] = useState("");
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    const {state} = useLocation();
    const id = state;

    const [registers, setRegisters] = useState([]);
    const [items, setItems] = useState([]);

    const registersCollectionRef = doc(db, "registers", id)


    useEffect(() => {
        const getRegistersList = async () => {
            try {
                const docSnap = await getDoc(registersCollectionRef);
                const filteredData = docSnap.data((doc) => ({
                    ...doc.get(),
                    id: doc.id,

                }));

                setRegisters(filteredData);
                setItems(docSnap.data().item);


            }catch (e) {
                console.error(e);
            }
        };
        getRegistersList().then(r => console.log("Loaded"));

    }, []);




        // Read values passed on state

    return(
        <Box padding="20px">
            <FlexBetween>
                <Box>
                    <h1>Register Info:</h1>
                    <h3>ID: {id}</h3>
                    <h3>Stand Name: {registers.name}</h3>
                    <h3>Stand Number: {registers.number}</h3>
                    <h3>Register Number: {registers.registerNumber}</h3>
                    <h1>Login Info</h1>
                    <h3>Username: {registers.username}</h3>
                    <h3>Password: {registers.password}</h3>
                    <h3>path: {items[1]}</h3>
                </Box>
                <Box>

                    {/*<TableContainer component={Paper}>*/}
                    {/*    <Table sx={{ minWidth: 650 }} aria-label="simple table">*/}
                    {/*        <TableHead>*/}
                    {/*            <TableRow>*/}
                    {/*                <TableCell>ID</TableCell>*/}
                    {/*                <TableCell align="right">Item Name</TableCell>*/}
                    {/*                <TableCell align="right">Item Price</TableCell>*/}
                    {/*                <TableCell align="right">Item Type</TableCell>*/}
                    {/*            </TableRow>*/}
                    {/*        </TableHead>*/}
                    {/*        <TableBody>*/}
                    {/*            {items.map((item) => (*/}
                    {/*                <TableRow*/}
                    {/*                    onClick={ () => {*/}
                    {/*                        navigate("/registers/register", {state: item.id});*/}
                    {/*                        setActive(Dashboard);*/}
                    {/*                    }}*/}
                    {/*                    key={item.id}*/}
                    {/*                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}*/}
                    {/*                >*/}
                    {/*                    <TableCell component="th" scope="row">{item.id}</TableCell>*/}
                    {/*                    <TableCell align="right">{item.name}</TableCell>*/}
                    {/*                    <TableCell align="right">{item.price}</TableCell>*/}
                    {/*                    <TableCell align="right">{item.type}</TableCell>*/}
                    {/*                </TableRow>*/}
                    {/*            ))}*/}
                    {/*        </TableBody>*/}
                    {/*    </Table>*/}
                    {/*</TableContainer>*/}




                </Box>
            </FlexBetween>
            <Box>
                <FlexBetween>
                    <Button variant="contained"
                        onClick= { () => {
                            del(id).then(r => alert("Deleted"))
                            navigate("/registers");
                            setActive(Dashboard);
                        }}
                    >
                        Delete
                    </Button>

                    <Button variant="contained"
                            onClick={ () =>{
                                navigate("/registers/register/additem", {state: id});
                                setActive(Dashboard);
                            }}
                    >
                        Add Item
                    </Button>

                    <Button variant="contained"
                    >
                        edit
                    </Button>
                </FlexBetween>
            </Box>
        </Box>
    )
}

export default Register;