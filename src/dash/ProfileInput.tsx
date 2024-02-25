import React, { useState } from 'react';
import { Input, Button, Space, Select, DatePicker, Card, Flex, Row, Col } from 'antd';
import moment from 'moment';
import styled from 'styled-components';

const { Option } = Select;

const StyledSpace = styled(Space)`
  width: 100%;
  flex-direction: column;
  margin-bottom: 10px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 35px;
  border-radius: 5px;
`;

const inputAndSelectStyle = `
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  height: 35px;
  width: 100%;
`;

const StyledLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: #07273A;
`;

const StyledInput = styled(Input)`
  ${inputAndSelectStyle}
  margin-bottom:10px;
`;

const StyledSelect = styled(Select)`
  .ant-select-selector {
    ${inputAndSelectStyle}
    height: 35px !important; 
  width: 100% !important;

  }
`;

const StyledDatePicker = styled(DatePicker)`
  ${inputAndSelectStyle}
  .ant-picker-input > input {
    height: 33px; // Adjust the height to match other input fields
  }
  margin-bottom:10px;

`;
const ProfitInput: React.FC = () => {
  const [profitInputs, setProfitInputs] = useState<{ amount: number; description: string; date: string; category: string }[]>([]);
  const [currentInput, setCurrentInput] = useState<string>('');
  const [currentDescription, setCurrentDescription] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<moment.Moment | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [totalIncome, setTotalIncome] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentDescription(event.target.value);
  };

  const handleDateChange = (date: moment.Moment | null, dateString: string) => {
    setCurrentDate(date);
  };

  const handleCategoryChange = (value: string) => {
    setCurrentCategory(value);
  };

  const handleAddIncome = () => {
    const income = parseFloat(currentInput);
    if (!isNaN(income) && currentDescription && currentDate && currentCategory) {
      setProfitInputs([...profitInputs, { amount: income, description: currentDescription, date: currentDate.format('YYYY-MM-DD'), category: currentCategory }]);
      setTotalIncome(totalIncome + income);
      setCurrentInput('');
      setCurrentDescription('');
      setCurrentDate(null);
      setCurrentCategory('');
    }
  };

  const formatCurrency = (value: number) => {
    return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  return (
    <Flex gap={30} style={{ display: 'flex', }}>
      <Card
        style={{ width: 330, height: 200, background: 'linear-gradient(145deg, #cfd9df, #e2ebf0)', borderRadius: '15px', marginBottom: '20px',marginLeft:'2%' }}
        bodyStyle={{ padding: '20px' }}
      >
        <div style={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '18px' }}>ATM Card</div>
        <div style={{ marginBottom: '10px', fontSize: '16px' }}>Card Number: **** **** **** 1234</div>
        <div style={{ fontSize: '16px' }}>Name: John Doe</div>
        <p style={{ fontWeight: 'bold' }}>Total income: {formatCurrency(totalIncome)}</p>
      </Card>
      <div>
        <StyledSpace>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={8}>
              <StyledLabel htmlFor="profitInput">Enter income:</StyledLabel>
              <StyledInput
                id="profitInput"
                type="number"
                value={currentInput}
                onChange={handleInputChange}
                placeholder="Enter income"
              />
              <StyledLabel htmlFor="descriptionInput">Description:</StyledLabel>
              <StyledInput
                id="descriptionInput"
                type="text"
                value={currentDescription}
                onChange={handleDescriptionChange}
                placeholder="Description"
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={8}>
              <StyledLabel htmlFor="dateInput">Select Date:</StyledLabel>
              <StyledDatePicker
                id="dateInput"
                value={currentDate}
                onChange={handleDateChange}
              />
              <StyledLabel htmlFor="categoryInput">Select Income Category:</StyledLabel>
              <br />
              <StyledSelect
                id="categoryInput"
                value={currentCategory}
                onChange={handleCategoryChange}
                style={{ width: '100%', marginBottom: '10px' }}
              >
                <Option value="salary">Salary</Option>
                <Option value="business">Business</Option>
                <Option value="investments">Investments</Option>
                <Option value="other">Other</Option>
              </StyledSelect>
            </Col>
            <Col md={16} xs={16} sm={16} lg={16}>
              <StyledButton type="primary" onClick={handleAddIncome}>
                Add
              </StyledButton>
            </Col>
          </Row>
        </StyledSpace>
      </div>
    </Flex>
  );
  
};

export default ProfitInput;
