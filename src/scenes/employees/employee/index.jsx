import {useLocation} from "react-router-dom";


const Employee = () =>{

    const {state} = useLocation();
    const id = state; // Read values passed on state

    return(
        <h1>{id}</h1>
    )

}

export default Employee;