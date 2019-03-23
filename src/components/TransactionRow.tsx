import React from 'react';

type Currency = {
  [key: string]: string;
}

const symbol: Currency = {
  USD: '$',
  EUR: '€',
  JPY: '¥'
};

type TransactionProps = {
  date: string,
  amount: number,
  currency: string,
  name: string
}

const TransactionRow = ({ date, name, currency, amount }: TransactionProps) => {

  return (
    <tr>
      <td>{new Date(date).toLocaleDateString("en-US")}</td>
      <td>{name}</td>
      <td>{symbol[currency]}{amount}</td>
    </tr>
  );
}

export default TransactionRow;
