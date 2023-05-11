import {useLocation, useNavigate} from "react-router-dom";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../fs/firebaseConfig";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import {Button, Typography} from "@mui/material";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Dashboard from "../A_dashboard";
import {useEffect, useState} from "react";
import EnhancedRCTable from "./etable";
import CreateNewRc from "./newRC";


const RevenueCenter = () => {
    const [active, setActive] = useState("");
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    const [rc, setRC] = useState([]);
    const rcCollectionRef = collection(db, "RevenueCenter")
    useEffect(() => {
        const getRCList = async () => {
            try {
                const data = await getDocs(rcCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }));

                setRC(filteredData);
                console.log(filteredData);
            }catch (e) {
                console.error(e);
            }
        };
        getRCList().then(r => console.log("done"));
    }, []);


    return (
        <Box paddingY="40px" paddingX="70px">
            <EnhancedRCTable />
            <CreateNewRc />
        </Box>
    );
}
export default RevenueCenter;