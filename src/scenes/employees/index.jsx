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


const Employees = () => {

    const [active, setActive] = useState("");
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    const [users, setUsers] = useState([]);
    const userCollectionRef = collection(db, "employee")
    useEffect(() => {
        const getUserList = async () => {
            try {
                const data = await getDocs(userCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }));
                setUsers(filteredData);
                console.log(filteredData);
            }catch (e) {
                console.error(e);
            }
        };
        getUserList().then(r => console.log("done"));
    }, []);




    return (
        <Box paddingY="40px" paddingX="70px">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell>ID</TableCell>
                            <TableCell align="right">First Name</TableCell>
                            <TableCell align="right">Last Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                onClick={ () => {
                                    navigate("/employees/employee", { state: user.id });
                                    setActive(Dashboard);
                                }}
                                key={user.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{user.id}</TableCell>
                                <TableCell align="right">{user.fname}</TableCell>
                                <TableCell align="right">{user.lname}</TableCell>
                                <TableCell align="right">{user.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box paddingY="20px">
                <Button variant="contained"
                        onClick={() => {
                            navigate("/newemployee");
                            setActive(Dashboard);

                        }}>
                    Add New</Button>
            </Box>

        </Box>
    );
}

export default Employees;