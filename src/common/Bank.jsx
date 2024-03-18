import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card, Button, Select, Input, Row, Col,Typography } from 'antd';
import StateDashboardLayout from "../dashboard/DashboardLayout";
import { setBank } from '../REdux/bankSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: #07273A;
`;

const inputAndSelectStyle = `
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  height: 35px; /* Set the same height for both input and select */
`;

const StyledInput = styled(Input)`
  ${inputAndSelectStyle}
`;

const StyledSelect = styled(Select)`
  width: 100%;
  
  .ant-select-selector {
    ${inputAndSelectStyle}
  }
`;

const UserBankDetailsForm = () => {
  const [formValues, setFormValues] = useState({
    AccountNumber: '',
    ConfirmBankAccountNumber: '',
    bank_branch: '',
    IFSCCode: '',
    AccountHoldername: '',
    bank_name: '',
    Balance: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(formValues)
dispatch(setBank(true));
navigate('/dashboard');

    try {
      // Send a POST request to your API endpoint
      const response = await axios.post('http://localhost:3002/createbankaccounts', formValues);

      // Handle success response
      console.log(response.data);
      message.success('Bank account added successfully.');
      dispatch(setBank(true));

      
      // Reset form values after successful submission
      setFormValues({
        AccountNumber: '',
        ConfirmBankAccountNumber: '',
        bank_branch: '',
        IFSCCode: '',
        AccountHoldername: '',
        bank_name: '',
        Relationship: '',
      });
    } catch (error) {
      // Handle error response
      console.error('Error adding bank account:', error);
    }
  };


  

return (
    <StateDashboardLayout>
        <Typography
         style={{
            fontSize: 35,
            fontWeight: 'bolder',
            marginBottom: 10,
            fontFamily: 'Garamond, Serif', // Change to the desired font
            color: '#07273A', // Change to the desired color
        }}
        >
        Bank Account
      </Typography>
  <Card>
  <StyledForm onSubmit={handleSubmit}>
  <Row gutter={[16, 16]}>
    <Col xs={24} sm={12} md={8}>
      <StyledLabel htmlFor="AccountNumber">Bank Account Number:</StyledLabel>
      <StyledInput
        type="text"
        id="AccountNumber"
        name="AccountNumber"
        value={formValues.AccountNumber}
        onChange={handleChange}
        required
      />
    </Col>
    <Col xs={24} sm={12} md={8}>
      <StyledLabel htmlFor="ConfirmBankAccountNumber">Confirm Bank Account Number:</StyledLabel>
      <StyledInput
        type="text"
        id="ConfirmBankAccountNumber"
        name="ConfirmBankAccountNumber"
        value={formValues.ConfirmBankAccountNumber}
        onChange={handleChange}
        required
      />
    </Col>
    <Col xs={24} sm={12} md={8}>
      <StyledLabel htmlFor="bank_name">Name of Bank:</StyledLabel>
      <br />
      <StyledSelect
            id="bank_name"
            name="bank_name"
            // value={bank}
            required
          >
            <option value=""> Name of Bank</option>
            <option value="Food">Bank of Baroda</option>
            <option value="Transportation">HDFC</option>
            <option value="Entertainment">SBI</option>
            <option value="Utilities">CANARA</option>
          </StyledSelect>
    </Col>
    <Col xs={24} sm={12} md={8}>
      <StyledLabel htmlFor="AccountHoldername">Name:</StyledLabel>
      <StyledInput
        type="text"
        id="AccountHoldername"
        name="AccountHoldername"
        value={formValues.AccountHoldername}
        onChange={handleChange}
        required
      />
    </Col>
    <Col xs={24} sm={12} md={8}>
      <StyledLabel htmlFor="Balance">Balance:</StyledLabel>
      <StyledInput
        type="text"
        id="Balance"
        name="Balance"
        value={formValues.Balance}
        onChange={handleChange}
        required
      />
    </Col>
    <Col xs={24} sm={12} md={8}>
      <StyledLabel htmlFor="bank_branch">Bank Branch:</StyledLabel>
      <StyledInput
        type="text"
        id="bank_branch"
        name="bank_branch"
        value={formValues.bank_branch}
        onChange={handleChange}
        required
      />
    </Col>
  </Row>
  <Button type="primary" htmlType="submit">Add Bank Account</Button>
</StyledForm>

  </Card>
  </StateDashboardLayout>
);

};

export default UserBankDetailsForm;
