import React, {useEffect, useRef, useState} from 'react';
import MyResponsivePie from "./pie";
import Box from "@mui/material/Box";
import FlexBetween from "../../components/FlexBetween";
import MyResponsiveCalendar from "./cal";
import DataTable from "../revenue centers/table";
import EnhancedTable from "../revenue centers/table";



const Dashboard = () => {



    return (
        <Box padding="30px">
            <EnhancedTable />
        </Box>
    );
}

export default Dashboard;