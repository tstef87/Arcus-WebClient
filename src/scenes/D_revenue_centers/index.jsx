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
            <TableContainer component={Paper}>
                <Typography
                    sx={{ flex: '1 1 100%'}}
                    paddingTop="10px"
                    paddingLeft="10px"
                    variant="h3"
                    id="tableTitle"
                >
                    Revenue Centers:
                </Typography>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" bgcolor="#252525">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>IddD</TableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rc.map((revcen) => (
                            <TableRow
                                onClick={ () => {
                                    navigate("/revenuecenters/revenuecenter", {state: {
                                            rc: revcen.id,
                                        }});
                                    setActive(Dashboard);
                                }}
                                key={revcen.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{revcen.id}</TableCell>
                                <TableCell align="right">{revcen.id}</TableCell>


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
export default RevenueCenter;