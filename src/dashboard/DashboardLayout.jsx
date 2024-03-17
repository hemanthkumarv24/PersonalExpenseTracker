import React, { useState, useEffect, useCallback } from "react";
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { useSelector } from 'react-redux';
import {
  Button,
  Space,
  Layout,
  Avatar,
  Dropdown,
  Drawer,
  Menu,
} from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  PoweroffOutlined,
  StarFilled,
  UsergroupAddOutlined,
  UnorderedListOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  BookOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


const { Sider, Content } = Layout;

const StateDashboardLayout = ({ children }) => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const stateValue = 'dashboard';
  const username = useSelector(state => state.auth.username);
  const showDrawer = () => {
    setVisible((prev) => !prev);
  };

  useEffect(() => {
    const checkMobile = () => {
      const currentWidth = window.innerWidth;
      const mobile = currentWidth < 767;
      const tab = currentWidth < 1023;
      setVisible(!mobile);
      setVisible(!tab);
    };

    window.addEventListener("resize", checkMobile);
    checkMobile();

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const signout = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleCall = (path, page) => {
    // dispatch(setStateValue(page));
    navigate(path);
  };

  const getButtonStyle = (page) => ({
    height: "50px",
    textAlign: "left",
    width: "100%",
    backgroundColor: "transparent",
  });

  const navItems = (color) => (
    <>
      <Button
        type="text"
        style={getButtonStyle("dashboard")}
        onClick={() => handleCall("/dashboard", "dashboard")}
      >
        <StarFilled
          style={{
            color:  color,
          }}
        />
        <span
          style={{
            fontSize: "15px",
            fontWeight: stateValue === "dashboard" ? "800" : "650",
            color:  color,
          }}
        >
          Dashboard
        </span>
      </Button>
      
      <Button
        type="text"
        style={getButtonStyle("bank")}
        onClick={() =>
          handleCall("/bank", "bank")
        }
      >
        <UnorderedListOutlined
          style={{
            color: stateValue === "bank" ? "#07273A" : color,
          }}
        />
        <span
          style={{
            fontSize: "15px",
            fontWeight: stateValue === "bank" ? "800" : "650",
            color: stateValue === "bank" ? "#07273A" : color,
          }}
        >
          <div> Bank Account </div>
        </span>
      </Button>
      <Button
        type="text"
        style={getButtonStyle("analytics")}
        onClick={() => handleCall("/analytics", "analytics")}
      >
        <BookOutlined
          style={{
            color: stateValue === "analytics" ? "#07273A" : color,
          }}
        />
        <span
          style={{
            fontSize: "15px",
            fontWeight: stateValue === "analytics" ? "800" : "650",
            color: stateValue === "analytics" ? "#07273A" : color,
          }}
        >
          Analytics & Reporting
        </span>
      </Button>
    </>
  );

  const slideDrawer = useCallback(() => {
    setDrawerOpen((prev) => !prev);
  }, []);
  const styles = {
    // nav: {
    //   position: 'fixed',
    //   top: 0,
    //   width: '100%',
    //   backgroundColor: '#f8f9fa',
    //   zIndex: 1000, // Ensure the navigation bar appears above other elements
    // },
    container: {
      maxWidth: '1200px',
    //   margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    //   padding: '0 20px',
    },
    brand: {
      textDecoration: 'none',
      color: '#fff',
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    navLinks: {
      listStyle: 'none',
      display: 'flex',
      margin: 0,
      padding: 0,
    },
    navItem: {
      marginLeft: '20px',
    },
    link: {
      textDecoration: 'none',
      color: '#333',
      fontSize: '1rem',
      fontWeight: 'normal',
    },
    formContainer: {
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#f8f9fa',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    formGroup: {
      marginBottom: '15px',
    },
  
    // RecentTransactions styles
    transactionsContainer: {
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#f8f9fa',
    },
    transactionsList: {
      listStyle: 'none',
      padding: 0,
    },
    transactionItem: {
      marginBottom: '10px',
    },
  };

  return (
    <>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "5px",
          background: "#07273a",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            type="text"
            icon={
              visible ? (
                <MenuUnfoldOutlined style={{ fontSize: "25px", color: "whitesmoke" }} />
              ) : (
                <MenuFoldOutlined style={{ fontSize: "25px", color: "whitesmoke" }} />
              )
            }
            onClick={showDrawer}
            style={{
              border: "none",
              marginRight: "20px",
            }}
          />
        <Link to="/" style={styles.brand}>Personal Expense Tracker</Link>

          {/* <a className="logo">
            <Space>
              <img
                src={statelogo}
                alt="State Logo"
                className={styles.logo}
                style={{ height: "2.8vw", width: "3vw" }}
              />
              <div className={styles.separator}></div>
              <img
                src={choiceLogo}
                alt="Choice Logo"
                className={styles.logo}
                style={{ height: "2.5vw", width: "4.5vw" }}
              />
            </Space>
          </a> */}
        </div>
        <div style={{ display: "flex", color: "#1c5335" }}>
          <Space wrap size={16}>
            <Avatar style={{ background: "#38a6e7" }} size={40} icon={<UserOutlined />} />
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="1">
                    <div style={{ border: "2px dotted #ccc", borderRadius: "50%", width: "100px", height: "100px", borderColor: "#1c5335", justifyContent: "center", padding: "20px", display: "flex", justifyItems: "center" }}>
                      <UserOutlined size={70} />
                    </div>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Button
                      type="text"
                      style={{ height: "50px", textAlign: "left", width: "100%" }}
                      onClick={() => handleCall("/state-user-profile", 'state-user-profile')}
                    >
                      <UserOutlined /> User Profile
                    </Button>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Button
                      type="text"
                      style={{ height: "50px", textAlign: "left", width: "100%" }}
                      onClick={signout}
                    >
                      <PoweroffOutlined /> Sign Out
                    </Button>
                  </Menu.Item>
                </Menu>
              }
              placement="bottomRight"
              arrow
            >
              <p
                style={{
                  color: "whitesmoke",
                  fontWeight: 700,
                  marginRight: "3vw",
                }}
              >
                 {username} 
                <CaretDownOutlined />
              </p>
            </Dropdown>
          </Space>
        </div>
      </nav>
      <Layout style={{ backgroundColor: "whitesmoke" }}>
        {visible &&  (
          <Sider
            // className="hideOnMobile"
            style={{ backgroundColor: "#07273a" }}
          >
            {navItems("white")}
          </Sider>
        )}
        {/* {isMobile && ( */}
          <Drawer
            placement="left"
            closable={true}
            onClose={slideDrawer}
            visible={drawerOpen}
          >
            <div>{navItems("black")}</div>
          </Drawer>
        {/* // )} */}
        <Content style={{ minHeight: "100vh", padding: 30 }}>
          {children}
        </Content>
      </Layout>
    </>
  );
};

export default StateDashboardLayout;
