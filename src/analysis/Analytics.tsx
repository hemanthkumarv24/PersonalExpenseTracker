import {
  Breadcrumb,
  Card,
  Col,
  Flex,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import { useNavigate } from "react-router";
import React, {
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Cards from "./Cards";

import { useLocation } from "react-router-dom";
import axios from "axios";
import StateDashboardLayout from "../dashboard/DashboardLayout";
import ExpensesByMonthChart from "./MonthlyExpense";
// import { report } from "process";



interface Scheme {
  scheme_name: string;
}

const { Option } = Select;

const Analytics = () => {
  const navigate = useNavigate();
  
  

  return (
    <StateDashboardLayout>
      {/* <Typography
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          marginBottom: 10,
          fontFamily: 'Garamond, Serif', // Change to the desired font
          color: '#163D20', // Change to the desired color
        }}
      > */}
      {/* <p
        className="dark-label"
        style={{ textAlign: "left", marginBottom: "1%" }}
      >
        Analytics
      </p> */}
      {/* </Typography> */}

      <Breadcrumb
        items={[
          {
            title: "Dashboard",
            // onClick: () => navigate("/dept-dashboard", { state: { data } }),
          },
          { title: "Analytics & Reporting" },
        ]}
        style={{ marginBottom: 20 }}
      />
      <Card style={{ background: 'rgba(255, 255, 255, 0)', boxShadow: "0 4px 8px rgba(0, 0, 0, 0)" }}>
       
        
            <Cards/>
            <ExpensesByMonthChart/>
       </Card>
    </StateDashboardLayout>
  );
};

export default Analytics;
