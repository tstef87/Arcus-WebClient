import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import { visuallyHidden } from '@mui/utils';
import {collection, getDocs, query, where} from "firebase/firestore";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Skeleton} from "@mui/material";
import {db} from "../../../../fs/firebaseConfig";
import {Dashboard} from "@mui/icons-material";


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'id',
        numeric: false,
        disablePadding: true,

        label: 'Sale ID ',
    },
    {
        id: 'Subtotal',
        numeric: true,
        disablePadding: false,
        label: 'Subtotal',
    },
    {
        id: 'Tip',
        numeric: true,
        disablePadding: false,
        label: 'Tip ',
    },
    {
        id: 'rc',
        numeric: false,
        disablePadding: false,
        label: 'Revenue Center ',
    },
    {
        id: 'Time',
        numeric: false,
        disablePadding: false,
        label: 'Transaction Time ',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };



    return (
        <TableHead>
            <TableRow>

                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.id === 'id' ? 'center' : "right"}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    //onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};


export default function EnhancedRCSalesTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('price');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([]);
    const [active, setActive] = useState("");
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    const [loaded, setLoaded] = React.useState(false);

    const {state} = useLocation();
    const {rc} = state;

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, rows],
    );


    useEffect(() => {
        const getSales = async () => {
            try {
                const salesCollectionRef = collection(db, "Sales");
                const q = query(salesCollectionRef, where("rc", "==", rc));

                const querySnapshot = await getDocs(q);

                const filteredData = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));

                setRows(filteredData);
                console.log(filteredData);
            }catch (e) {
                console.error(e);
            }
        };
        getSales().then(r => console.log("Got Sales"));
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            {visibleRows.length > 0 ?
                (<Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer>
                        <Typography
                            sx={{ flex: '1 1 100%', m: 1}}
                            paddingTop="10px"
                            paddingLeft="10px"
                            variant="h3"
                            id="tableTitle"
                        >
                            Sales:
                        </Typography>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            bgcolor={"#252525"}
                        >
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                                numSelected={0}/>
                            <TableBody>
                                {visibleRows.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (

                                        <TableRow
                                            key={row.id}
                                            onClick={ () => {
                                                navigate("/sales/viewsale", {state: {id: row.id, emp: row.emp}});

                                            }}>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                align="center"
                                            >
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="right">${row.Subtotal?.toFixed(2)}</TableCell>
                                            <TableCell align="right">${row.Tip?.toFixed(2)}</TableCell>
                                            <TableCell align="right">{row.rc}</TableCell>
                                            <TableCell align="right">{row.Time}</TableCell>

                                        </TableRow>
                                    );
                                })}

                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>):
                (
                    <Box width={"100"} >
                        <h1>No Sales Yet</h1>
                    </Box>
                )
            }
        </Box>
    );
}