import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import TransactionRow from './TransactionRow';

import mockTransactions from './mockTransactions.json';

type Transaction = {
  name: string,
  date: string,
  amount: number,
  currency: string
};

type State = {
  transactions: Array<Transaction>
};

class ViewHistory extends Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      transactions: []
    };
  }
  async componentDidMount() {
    try {
      const response = await fetch('/v1/transactions');
      const data = await response.json();
      this.setState(data);
    }
    catch (error) {
      console.error(error);
    }
  }
  render() {
    const transactionRows = this.state.transactions.map((row, idx) => (
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
