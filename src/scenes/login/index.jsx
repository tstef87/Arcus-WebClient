import React, {useEffect, useState} from 'react'
import AddNew from "../registers/addnew";
import {Button} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import Dashboard from "../dashboard";
const Login = () => {

    const [active, setActive] = useState("");

    const { pathname } = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);


    return (
        <Button variant="outlined"
                onClick={() => {
                    navigate("/dashboard");
                    setActive(Dashboard);
                }}>
            add new
        </Button>
    )
}

export default Login;