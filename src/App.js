import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import {themeSettings} from "./theme";
import { useSelector } from "react-redux";
import {useMemo} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Dashboard from "scenes/A_dashboard";
import Layout from "scenes/layout"
import Registers from "scenes/C_registers";
import Login from "./scenes/login";
import AddNewRegister from "./scenes/C_registers/addnew";
import AddNewEmployee from "./scenes/B_employees/addnew";
import Employees from "./scenes/B_employees";
import RegisterInfo from "./scenes/C_registers/register";
import Employee from "./scenes/B_employees/employee";
import Items from "./scenes/E_items";
import Sales from "./scenes/F_sales";
import Viewsale from "./scenes/F_sales/viewsale";
import ViewSale from "./scenes/F_sales/viewsale";
import RevenueCenter from "./scenes/D_revenue_centers";
import ViewRC from "./scenes/D_revenue_centers/viewRC";
import ViewRCNew from "./scenes/D_revenue_centers/viewRC/tabs/items/dialogs/itemTab";


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

                        {/*<Route path="/registers" element={<Registers />}/>*/}
                        <Route path="/registers/register" element={<RegisterInfo />}/>
                        {/*<Route path="/addnewregister" element={<AddNewRegister />} />*/}

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
