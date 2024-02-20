import React, { useState } from 'react';
import { Input, Button } from 'antd';

const ProfitInput: React.FC = () => {
  const [profit, setProfit] = useState<any>('');
  const [addedProfit, setAddedProfit] = useState<number | null>(null);

  const handleProfitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    // Ensure input is a valid number or empty string
    if (!isNaN(Number(input)) || input === '') {
      setProfit(input === '' ? '' : Number(input));
    }
  };

  const handleAddProfit = () => {
    setAddedProfit(profit);
    // Reset profit input field after adding
    setProfit('');
  };

  return (
    <div style={{ maxWidth: '300px', margin: '0 auto' }}>
      <label htmlFor="profitInput" style={{ display: 'block', marginBottom: '10px' }}>
        Enter your profit/salary:
      </label>
      <Input
        id="profitInput"
        type="text"
        value={profit === '' ? '' : profit.toFixed(2)}
        onChange={handleProfitChange}
        placeholder="Enter profit/salary"
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <Button type="primary" onClick={handleAddProfit} disabled={!profit}>
        Add
      </Button>
      {addedProfit !== null && (
        <p style={{ marginTop: '10px' }}>Added profit/salary: {addedProfit.toFixed(2)}</p>
      )}
    </div>
  );
};

export default ProfitInput;
