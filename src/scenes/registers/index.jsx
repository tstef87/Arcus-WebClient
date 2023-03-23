import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import {themeSettings} from "../../theme";
import {Button, useTheme} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import AddNew from "scenes/registers/addnew"
import {collection, query, where, getDocs, getFirestore, doc, setDoc, getDoc} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {db, firebaseConfig} from "../../../firebaseConfig";
import Dashboard from "../dashboard";


const Register = () => {

    const [active, setActive] = useState("");
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    const [registers, setRegisters] = useState([]);
    const registersCollectionRef = collection(db, "registers")
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
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Stand Name</TableCell>
                            <TableCell align="right">Stand Number</TableCell>
                            <TableCell align="right">Register Number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {registers.map((register) => (
                            <TableRow
                                onClick={ () => {
                                    navigate("/registers/register", {state: register.id});
                                    setActive(Dashboard);
                                }}
                                key={register.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{register.id}</TableCell>
                                <TableCell align="right">{register.name}</TableCell>
                                <TableCell align="right">{register.number}</TableCell>
                                <TableCell align="right">{register.registerNumber}</TableCell>
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