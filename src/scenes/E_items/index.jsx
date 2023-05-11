import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Dashboard from "../A_dashboard";
import Box from "@mui/material/Box";
import {Button} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../fs/firebaseConfig";
import AddNewItem from "./addNewItem";
import EnhancedItemsTable from "./etable";

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
            <EnhancedItemsTable />
        </Box>
    );
}
export default Items;