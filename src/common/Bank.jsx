import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card, Button, Select, Input, Row, Col,Typography } from 'antd';
import StateDashboardLayout from "../dashboard/DashboardLayout";
import { setBank } from '../REdux/bankSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


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
    BankAccountNumber: '',
    ConfirmBankAccountNumber: '',
    BankBranchName: '',
    IFSCCode: '',
    AccountHoldername: '',
    NameOfBank: '',
    Card: '',
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
      const response = await axios.post('/api/addBankAccount', formValues);

      // Handle success response
      console.log(response.data);
      message.success('Bank account added successfully.');
      dispatch(setBank(true));

      
      // Reset form values after successful submission
      setFormValues({
        BankAccountNumber: '',
        ConfirmBankAccountNumber: '',
        BankBranchName: '',
        IFSCCode: '',
        AccountHoldername: '',
        NameOfBank: '',
        Relationship: '',
      });
    } catch (error) {
      // Handle error response
      console.error('Error adding bank account:', error);
      message.error('An error occurred while adding the bank account. Please try again later.');
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
      <StyledLabel htmlFor="BankAccountNumber">Bank Account Number:</StyledLabel>
      <StyledInput
        type="text"
        id="BankAccountNumber"
        name="BankAccountNumber"
        value={formValues.BankAccountNumber}
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
      <StyledLabel htmlFor="NameOfBank">Name of Bank:</StyledLabel>
      <br />
      <StyledSelect
            id="NameOfBank"
            name="NameOfBank"
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
      <StyledLabel htmlFor="Card">Card Number:</StyledLabel>
      <StyledInput
        type="text"
        id="Card"
        name="Card"
        value={formValues.Card}
        onChange={handleChange}
        required
      />
    </Col>
    <Col xs={24} sm={12} md={8}>
      <StyledLabel htmlFor="BankBranch">Bank Branch:</StyledLabel>
      <StyledInput
        type="text"
        id="BankBranch"
        name="BankBranch"
        value={formValues.BankBranch}
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
