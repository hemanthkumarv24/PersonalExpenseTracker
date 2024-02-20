import ProfitInput from "./ProfileInput";
import ExpenseTracker from "./ExpenseTrack";
import { Button } from "antd";
import { useNavigate,  } from "react-router-dom";
import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { light } from "@mui/material/styles/createPalette";

const defaultTheme = createTheme();

const Dashboard = () =>{


    const navigate = useNavigate()
    return(
        <ThemeProvider theme={light}>
        {/* <Button
        onClick={()=> {navigate('/bank')}}
        >
            Add Bank Account
        </Button> */}
        <ProfitInput/>
        <ExpenseTracker/>
        </ThemeProvider>

    );
}
export default Dashboard;