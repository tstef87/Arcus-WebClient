import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button, Typography, useTheme} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../fs/firebaseConfig";
import Dashboard from "../A_dashboard";
import AddNewEmployee from "./addnew";
import EnhancedSalesTable from "../F_sales/etable";
import EnhancedEmployeeTable from "./etable";


const Employees = () => {

    const [active, setActive] = useState("");
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    const [users, setUsers] = useState([]);
    const userCollectionRef = collection(db, "Employee")
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
            <EnhancedEmployeeTable />
            <AddNewEmployee />
        </Box>
    );
}

export default Employees;