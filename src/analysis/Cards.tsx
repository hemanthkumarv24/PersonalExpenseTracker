import { Card, Col,  Row } from "antd"
import IncomeBased from "./IncomeBased";
import ExpenseBased from "./ExpenseBased";
import CasteCategory from "./CasteCategory";
import BplBased from "./BplBased";
import React from "react";

const Cards = (report: any) => {
  const data =report.report
  return (
    <>
          <Row gutter={[5,5]}>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <Card style={{ width: '100%', textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', background: '#fff', }}>
          <h1 style={{ margin: 0,fontWeight: 600,  color: '#38a6e7' }}>20000</h1>

          <p style={{ color: "#07273a",  fontWeight: 600, fontSize:'18px', margin: 0 }}> Total Income </p>
        </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <Card 
          style={{ width: '100%',  textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', background: '#fff', }}>
          <h1 style={{ margin: 0,fontWeight: 600, color: '#38a6e7' }}>5000</h1>
          <p style={{ color: "#07273a",  fontWeight: 600,fontSize:'18px', margin: 0 }}> Total Expenditure</p>
        </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <Card style={{ width: '100%',  textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', background: '#fff', }}>
          <h1 style={{ margin: 0, fontWeight: 600, color: '#38a6e7' }}>15000</h1>
          <p style={{ color: "#07273a", fontWeight: 600,fontSize:'18px', margin: 0 }}> Remaining Balance </p>
        </Card>
            </Col>
          </Row>
        
        
        
      
        {data !== null &&(
        <>
              <Row gutter={[5,5]} style={{marginTop:'5px'}}>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <IncomeBased/>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <ExpenseBased /> 
                  </Col>
                  {/* <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <BplBased  data = {undefined}/>
                  </Col> */}
            </Row>
        </>
        )}
        
    </>
  );
};


export default Cards;