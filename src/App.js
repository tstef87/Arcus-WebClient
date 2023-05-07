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
import RegisterInfo from "./scenes/registers/register";
import Employee from "./scenes/employees/employee";
import Addnewitem from "./scenes/registers/register/addnewitem";
import Items from "./scenes/items";
import Sales from "./scenes/sales";
import Viewsale from "./scenes/sales/viewsale";
import ViewSale from "./scenes/sales/viewsale";
import RevenueCenter from "./scenes/revenue_centers";
import ViewRC from "./scenes/revenue_centers/viewRC";
import ViewRCNew from "./scenes/revenue_centers/viewRC/add_item_dialogs/itemTab";


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
                        <Route path="/registers/register" element={<RegisterInfo />}/>
                        <Route path="/registers/register/additem" element={<Addnewitem />} />
                        <Route path="/addnewregister" element={<AddNewRegister />} />

                        <Route path="/employees" element={<Employees />}/>
                        <Route path="/employees/employee" element={<Employee />}/>
                        <Route path="/newemployee" element={<AddNewEmployee />} />

                        <Route path="/items" element={<Items />}/>

                        <Route path="/sales" element={<Sales />}/>
                        <Route path="/sales/viewsale" element={<ViewSale />}/>

                        <Route path="/revenuecenters" element={<RevenueCenter/>}/>
                        <Route path="/revenuecenters/revenuecenter" element={<ViewRC/>}/>






                    </Route>

                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    </div>
    );
}

export default App;
