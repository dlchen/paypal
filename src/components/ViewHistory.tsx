import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import TransactionRow from './TransactionRow';
// import './SendMoney.css';

const mockTransactions = [
  {
    name: "John Smith",
    date: new Date(Date.UTC(2018, 2, 8)),
    amount: 123.45,
    currency: 'USD'
  },
  {
    name: "Toys R Us",
    date: new Date(Date.UTC(2012, 11, 31)),
    amount: 1123.45,
    currency: 'USD'
  }
];

class ViewHistory extends Component {
  render() {
    const transactionRows = mockTransactions.map((row, idx) => (
      <TransactionRow
        date={row.date}
        amount={row.amount}
        currency={row.currency}
        name={row.name}
        key={idx} />
    ));
    return (
      <div>
        <header>Transaction History</header>
        <div className="content">
          <table>
            <tbody>
              {transactionRows}
            </tbody>
          </table>
        </div>
        <footer>
          <Link to="/">Back</Link>
        </footer>
      </div>
    );
  }
}

export default ViewHistory;
