import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Dashboard from "../dashboard";
import Box from "@mui/material/Box";
import {Button} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../fs/firebaseConfig";
import Addnewitem from "../registers/register/addnewitem";
import AddNewItem from "./addNewItem";

const Items = () => {


    const [active, setActive] = useState("");
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    const [itemList, setItems] = useState([]);
    const itemCollectionRef = collection(db, "Items")
    useEffect(() => {
        const getItemList = async () => {
            try {
                const data = await getDocs(itemCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }));

                setItems(filteredData);
            }catch (e) {
                console.error(e);
            }
        };
        getItemList().then(r => console.log("done"));
    }, []);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <Box paddingY="40px" paddingX="70px">

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
                                key={item.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{ item.id}</TableCell>
                                <TableCell align="right">{item.name}</TableCell>
                                <TableCell align="right">{ formatter.format(parseFloat(item.price))}</TableCell>
                                <TableCell align="right">{item.type}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box>
                <AddNewItem />
            </Box>

        </Box>
    );
}
export default Items;