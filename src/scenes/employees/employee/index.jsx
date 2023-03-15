import {useLocation} from "react-router-dom";
import Box from "@mui/material/Box";


const Employee = () =>{

    const {state} = useLocation();
    const id = state; // Read values passed on state

    return(
        <Box paddingY="40px" paddingX="70px">
            <h1>{id}</h1>
        </Box>
    )

}

export default Employee;