import ProfitInput from "./ProfileInput";
import ExpenseTracker from "./ExpenseTrack";
import { Button,Typography } from "antd";
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
        <Typography
         style={{
            fontSize: 35,
            fontWeight: 'bolder',
            marginBottom: 10,
            fontFamily: 'Garamond, Serif', // Change to the desired font
            color: '#07273A', // Change to the desired color
        }}
        >
        Dashboard
      </Typography>
      <ProfitInput/>
<div style={{marginTop:'20px'}}>
<ExpenseForm/>

</div>
        <RecentTransactions/>
        {/* <ExpenseTracker/> */}
        </ThemeProvider>
        </StateDashboardLayout>

    );
}
export default Dashboard;