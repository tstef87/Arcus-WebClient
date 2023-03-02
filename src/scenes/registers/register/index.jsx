import {useLocation, useNavigate} from "react-router-dom";
import {collection, doc, getDoc, getDocs, deleteDoc} from "firebase/firestore";
import {db} from "../../../firebase/firebaseConfig";
import {useEffect, useState} from "react";
import {Box, Button} from "@mui/material";
import FlexBetween from "../../../components/FlexBetween";
import Dashboard from "../../dashboard";

async function del(id) {
    await deleteDoc(doc(db, "registers", id));
}


const Register = () =>{

    const [active, setActive] = useState("");
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    const {state} = useLocation();
    const id = state;

    const [registers, setRegisters] = useState([]);
    const registersCollectionRef = doc(db, "registers", id)


    useEffect(() => {
        const getRegistersList = async () => {
            try {
                const docSnap = await getDoc(registersCollectionRef);
                const filteredData = docSnap.data((doc) => ({
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


     // Read values passed on state

    return(
        <Box padding="20px">
            <FlexBetween>
                <Box>
                    <h1>Register Info:</h1>
                    <h3>ID: {id}</h3>
                    <h3>Stand Name: {registers.name}</h3>
                    <h3>Stand Number: {registers.number}</h3>
                    <h3>Register Number: {registers.registerNumber}</h3>
                    <h1>Login Info</h1>
                    <h3>Username: {registers.username}</h3>
                    <h3>Password: {registers.password}</h3>
                </Box>
                <Box>
                    <h1>Items</h1>
                </Box>
            </FlexBetween>
            <Box>
                <FlexBetween>
                    <Button variant="contained"
                        onClick= { () => {
                            del(id).then(r => alert("Deleted"))
                            navigate("/registers");
                            setActive(Dashboard);
                        }}
                    >
                        Delete
                    </Button>

                    <Button variant="contained"
                            onClick={ () =>{
                                navigate("/registers/register/additem", {state: id});
                                setActive(Dashboard);
                            }}
                    >
                        Add Item
                    </Button>

                    <Button variant="contained"
                    >
                        edit
                    </Button>
                </FlexBetween>
            </Box>
        </Box>
    )
}

export default Register;