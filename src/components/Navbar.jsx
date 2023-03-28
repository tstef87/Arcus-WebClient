import React, {useEffect, useState} from "react";
import {LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, Search, SettingsOutlined} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import {useDispatch} from "react-redux";
import {setMode} from "../state";
import {
    AppBar,
    Box,
    Button,
    IconButton,
    InputBase,
    Menu, MenuItem,
    Toolbar,
    useTheme
} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import Dashboard from "../scenes/dashboard";
import Login from "../scenes/login";

const Navbar = ({
                    isSidebarOpen,
                    setIsSidebarOpen,
                }) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const [active, setActive] = useState("");
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            sx={{
                position: "static",
                background: "none",
                boxShadow: "none",
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between"}}>
                {/* Left Side */}
                <FlexBetween gap=".4rem">
                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <MenuIcon />
                    </IconButton>
                    <FlexBetween
                        backgroundColor={theme.palette.background.alt}
                        borderRadius="20px"
                        gap="2rem"
                        p="0.1rem 0.5rem"
                    >
                        <InputBase placeholder="Search..." />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                </FlexBetween>


                <FlexBetween gap="1.5rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === 'dark' ? (
                            <DarkModeOutlined sx={{ fontSize: "25px"}} />
                        ) : (
                            <LightModeOutlined sx={{ fontSize: "25px"}} />
                        )}
                    </IconButton>


                    <Box >
                        <Button
                            id="settings"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            sx={{color: theme.palette.grey[200]}}
                        >
                            <SettingsOutlined sx={{ fontSize: "25px" }} />
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={ () =>{
                                navigate("/")
                                setActive(Login)
                            }}>
                                Logout
                            </MenuItem>
                        </Menu>

                    </Box>


                </FlexBetween>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;