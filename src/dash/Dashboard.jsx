import ProfitInput from "./ProfileInput";
import ExpenseTracker from "./ExpenseTrack";
import { Button } from "antd";
import { useNavigate,  } from "react-router-dom";
import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { light } from "@mui/material/styles/createPalette";
import NavigationBar from "../common/NavBar";
import { ExpenseForm,RecentTransactions } from "../common/NavBar";
import StateDashboardLayout from "../dashboard/DashboardLayout";
const defaultTheme = createTheme();

const Dashboard = () =>{


    const navigate = useNavigate()
    return(
        <StateDashboardLayout>
        <ThemeProvider theme={light}>
        {/* <Button
        onClick={()=> {navigate('/bank')}}
        >
            Add Bank Account
        </Button> */}
        {/* <NavigationBar/> */}
        <ExpenseForm/>
        <RecentTransactions/>
        {/* <ProfitInput/> */}
        {/* <ExpenseTracker/> */}
        </ThemeProvider>
        </StateDashboardLayout>

    );
}
export default Dashboard;