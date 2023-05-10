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
import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
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
        label: 'Item ID',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Item Name',
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: 'Item Price',
    },
    {
        id: 'type',
        numeric: false,
        disablePadding: false,
        label: 'Item Type:',
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


export default function EnhancedRegisterItemsTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('price');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([]);
    const salesCollectionRef = collection(db, "Sales");
    const [active, setActive] = useState("");
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    const [loaded, setLoaded] = React.useState(false);

    const {state} = useLocation();
    const {id, rc} = state;

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


    const itemsCollectionRef = doc(db, "RevenueCenter", rc);
    const itemListRef = collection(db, "Items");


    useEffect(() => {
        const getItemList = async () => {
            try {
                const docSnap = await getDoc(itemsCollectionRef)
                const itemArr = docSnap.get("items");

                // Chunk the itemArr into arrays of 10 or less items
                const chunks = [];
                for (let i = 0; i < itemArr.length; i += 10) {
                    chunks.push(itemArr.slice(i, i + 10));
                }

                // Query each chunk separately and merge the results
                const promises = chunks.map(async (chunk) => {
                    const q = query(itemListRef, where('idCall', 'in', chunk));
                    const querySnapshot = await getDocs(q);
                    return querySnapshot.docs.map((doc) => ({
                        idCall: doc.get("idCall"),
                        name: doc.get("name"),
                        price: doc.get("price"),
                        type: doc.get("type"),
                        id: doc.id,
                    }));
                });

                const results = await Promise.all(promises);
                const mergedResults = results.flat();

                setRows(mergedResults);
                console.log(mergedResults);

            } catch (e) {
                console.error(e);
            }
        };
        getItemList().then(r => console.log("Got Item List"));
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            {visibleRows.length > 0 ?
                (<Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer>
                        <Typography
                            sx={{ flex: '1 1 100%'}}
                            paddingTop="10px"
                            paddingLeft="10px"
                            variant="h3"
                            id="tableTitle"
                        >
                            Items:
                        </Typography>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
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
                                            >
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                align="center"
                                            >
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="right">{row.name}</TableCell>
                                            <TableCell align="right">${row.price?.toFixed(2)}</TableCell>
                                            <TableCell align="right">{row.type}</TableCell>
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
                        <Skeleton variant="rectangular"  height={500} />
                    </Box>
                )
            }
        </Box>
    );
}