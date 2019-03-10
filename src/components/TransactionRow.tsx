import React from 'react';

interface Currency {
  [key: string]: string;
}

const symbol: Currency = {
  'USD': '$'
};

interface TransactionProps {
  date: string,
  amount: number,
  currency: string,
  name: string
}

const TransactionRow = ({ date, name, currency, amount } : TransactionProps) => {

  return (
    <tr>
      <td>{new Date(date).toLocaleDateString("en-US")}</td>
      <td>{name}</td>
      <td>{symbol[currency]}{amount}</td>
    </tr>
  );
}

export default TransactionRow;
