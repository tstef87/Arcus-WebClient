import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import {themeSettings} from "./theme";
import { useSelector } from "react-redux";
import {useMemo} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout"
import Registers from "scenes/registers";
import AddNew from "./scenes/registers/addnew";
import Login from "./scenes/login";
import AddNewRegister from "./scenes/registers/addnew";
import AddNewEmployee from "./scenes/employees/addnew";
import Employees from "./scenes/employees";
import Register from "./scenes/registers/register";
import Employee from "./scenes/employees/employee";
import Addnewitem from "./scenes/registers/register/addnewitem";


function App() {
    const mode = useSelector((state) => state.global.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return (
    <div className="app">
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Routes>
                    <Route element={<Login />}>
                        <Route path="/" element={<Navigate to="/login" replace />} />
                    </Route>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="/dashboard" element={<Dashboard />} />

                        <Route path="/registers" element={<Registers />}/>
                        <Route path="/registers/register" element={<Register />}/>
                        <Route path="/registers/register/additem" element={<Addnewitem />} />
                        <Route path="/addnewregister" element={<AddNewRegister />} />

                        <Route path="/employees" element={<Employees />}/>
                        <Route path="/employees/employee" element={<Employee />}/>
                        <Route path="/newemployee" element={<AddNewEmployee />} />
                    </Route>

                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    </div>
    );
}

export default App;
