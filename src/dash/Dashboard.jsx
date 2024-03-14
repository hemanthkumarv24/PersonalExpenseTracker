import ProfitInput from "./ProfileInput";
import ExpenseTracker from "./ExpenseTrack";
import { Button,Typography } from "antd";
import { useNavigate,  } from "react-router-dom";
import React, { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { light } from "@mui/material/styles/createPalette";
// import NavigationBar from "../common/NavBar";
import { ExpenseForm,RecentTransactions } from "../common/NavBar";
import StateDashboardLayout from "../dashboard/DashboardLayout";
import { useSelector, useDispatch } from 'react-redux';
import {  selectBank } from '../REdux/bankSlice';
const defaultTheme = createTheme();

const Dashboard = () =>{

    const bank = useSelector(selectBank);
    const navigate = useNavigate();

    const handleAddBank = () => {
      navigate('/bank');
    };    return(
        <StateDashboardLayout>
        <ThemeProvider theme={light}>
        
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

      {bank ? (
            <>
              <ProfitInput/>
              <div style={{marginTop:'20px'}}>
                <ExpenseForm/>
              </div>
              <RecentTransactions/>
            </>
          ) : (
            <p style={{fontSize:'17px', fontWeight:'700',color:'black'}}>Add Bank account to continue
              <Button type="primary" onClick={handleAddBank} htmlType="submit"
                style={{width:'30%', height:'40px', marginLeft:'20px', fontSize:'17px', fontWeight:'700'}}
              >
                Add Bank Account
              </Button>
            </p>
          )}

        
        {/* <ExpenseTracker/> */}
        </ThemeProvider>
        </StateDashboardLayout>

    );
}
export default Dashboard;