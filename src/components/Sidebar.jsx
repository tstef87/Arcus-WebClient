import React from 'react'
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText, MenuItem,
    Typography,
    useTheme
} from "@mui/material";
import {
    HomeOutlined,
    PointOfSaleOutlined,
    CalendarMonthOutlined,
    TrendingUpOutlined,
    ChevronRightOutlined
} from "@mui/icons-material";

import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import FlexBetween from "./FlexBetween";

const navItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />,
    },

    {
        text: "Management",
        icon: null,
    },

    {
        text: "Employees",
        icon: <PersonOutlineOutlinedIcon />
    },

    {
        text:"Revenue Centers",
        icon: <PointOfSaleOutlined />
    },
    {
        text: "Items",
        icon: <FastfoodOutlinedIcon />,
    },
    {
        text: "Sales",
        icon: <TrendingUpOutlined />,
    }
];

const Sidebar = ({
                     drawerWidth,
                     isSidebarOpen,
                     setIsSidebarOpen,
                     isNonMobile,
                 }) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant="persistent"
                    anchor="left"
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary[300],
                            backgroundColor: theme.palette.background.alt,
                            boxSixing: "border-box",
                            borderWidth: isNonMobile ? 0 : "0px",
                            width: drawerWidth,
                        },

                    }}
                >
                    <Box width="100%">
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box display="flex" alignItems="center" gap="0.5rem">
                                    <Typography variant="h2" fontWeight="bold">
                                        ARCUS
                                    </Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {navItems.map(({ text, icon }) => {
                                if (!icon) {
                                    return (
                                        <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                                            {text}
                                        </Typography>
                                    );
                                }
                                const lcText = text.toLowerCase().replace(/ /g, '');

                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                navigate(`/${lcText}`);
                                                setActive(lcText);
                                            }}
                                            sx={{
                                                backgroundColor:
                                                    active === lcText
                                                        ? theme.palette.secondary[300]
                                                        : "transparent",
                                                color:
                                                    active === lcText
                                                        ? theme.palette.primary[600]
                                                        : theme.palette.grey[300],
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    ml: "2rem",
                                                    color:
                                                        active === lcText
                                                            ? theme.palette.primary[600]
                                                            : theme.palette.secondary[300],
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                            {active === lcText && (
                                                <ChevronRightOutlined sx={{ ml: "auto" }} />
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>

                </Drawer>
            )}
        </Box>
    );
};

export default Sidebar;