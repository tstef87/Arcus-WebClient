import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {collection, getDocs, query, where} from "firebase/firestore";
import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {db} from "../../../../fs/firebaseConfig";


export default function SalesTab(){


    const [active, setActive] = useState("");
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    const {state} = useLocation();
    const {rc} = state;

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


    return (

        <Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" bgcolor="#252525">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Tax</TableCell>
                            <TableCell align="right">Gratuity</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                            <TableCell align="right">Time of Transaction</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sales.map((sale) => (
                            <TableRow
                                key={sale.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{sale.id}</TableCell>
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
        </Box>
    )


}