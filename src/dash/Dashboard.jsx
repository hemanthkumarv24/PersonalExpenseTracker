import ProfitInput from "./ProfileInput";
import ExpenseTracker from "./ExpenseTrack";
import { Button,Typography } from "antd";
import { useNavigate,  } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { light } from "@mui/material/styles/createPalette";
// import NavigationBar from "../common/NavBar";
import { ExpenseForm,RecentTransactions } from "../common/NavBar";
import StateDashboardLayout from "../dashboard/DashboardLayout";
import { useSelector, useDispatch } from 'react-redux';
import {  loginSuccess } from '../REdux/authSlice';
import axios from 'axios';
const defaultTheme = createTheme();

const Dashboard = () =>  {

  const [condition,setcondition]=useState(false);
  const [balance,setbalance]=useState(0);
  const [accountnumber,setaccountnumber]=useState(0);
  const [username,setusername]=useState('');
  const dispatch = useDispatch();
  
  useEffect(() => {

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3002/check-account');
      
      setcondition(response.data.exists)
      setbalance(response.data.accountDetails.Balance);
      setaccountnumber(response.data.accountDetails.AccountNumber);
      setusername(response.data.accountDetails.username.Username)
      console.log(condition,balance,accountnumber);
      dispatch(loginSuccess({userId:'',  userName:username }));


      console.log(response) // Change the URL to your Express route
      // setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  fetchData();
}, []);
  

    const bank =condition;
    console.log("Bank",bank)
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
              <ProfitInput accountnumber={accountnumber}balance={balance} username={username}/>
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