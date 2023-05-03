import * as React from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';
import {Button, useTheme} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {collection,getDocs} from "firebase/firestore";
import {db} from "../../fs/firebaseConfig";
import Dashboard from "../dashboard";
import state from "../../state";


const Register = () => {

    const [active, setActive] = useState("");
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    const [registers, setRegisters] = useState([]);
    const registersCollectionRef = collection(db, "Registers")
    useEffect(() => {
        const getRegistersList = async () => {
            try {
                const data = await getDocs(registersCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }));

                setRegisters(filteredData);
                console.log(filteredData);
            }catch (e) {
                console.error(e);
            }
        };
        getRegistersList().then(r => console.log("done"));
    }, []);


    return (
        <Box paddingY="40px" paddingX="70px">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" bgcolor="#252525">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Stand Name</TableCell>
                            <TableCell align="right">Stand Number</TableCell>
                            <TableCell align="right">Register Number</TableCell>
                            <TableCell align="right">RevenueCenter</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {registers.map((register) => (
                            <TableRow
                                onClick={ () => {
                                    navigate("/registers/register", {state: {
                                        id: register.id,
                                        rc: register.revenueCenter
                                    }});
                                    setActive(Dashboard);
                                }}
                                key={register.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{register.id}</TableCell>
                                <TableCell align="right">{register.name}</TableCell>
                                <TableCell align="right">{register.number}</TableCell>
                                <TableCell align="right">{register.registerNumber}</TableCell>
                                <TableCell align="right">{register.revenueCenter}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box paddingY="20px">
                <Button variant="contained"
                        onClick={() => {
                                navigate("/addnewregister");
                                setActive(Dashboard);

                            }}>
                    Add New</Button>
            </Box>
        </Box>
    );
}

export default Register;