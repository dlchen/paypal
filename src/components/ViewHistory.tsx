import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TransactionRow from './TransactionRow';

import './ViewHistory.css';

type Transaction = {
  name: string,
  date: string,
  amount: number,
  currency: string
};

type State = {
  transactions: Array<Transaction>,
  page: number
};

class ViewHistory extends Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      transactions: [],
      page: 0
    };

    this.handleOnScroll = this.handleOnScroll.bind(this);
  }
  async getTransaction() {
    try {
      const response = await fetch(`/v1/transactions?page=${this.state.page}`);
      const data = await response.json();
      if (data.transactions.length) {
        this.setState({
          transactions: this.state.transactions.concat(data.transactions),
          page: this.state.page + 1
        });
      }
    }
    catch (error) {
      console.error(error);
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleOnScroll);
    this.getTransaction();
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll);
  }
  handleOnScroll() {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrolledToBottom = scrollTop + clientHeight >= scrollHeight;

    if (scrolledToBottom) {
      this.getTransaction();
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
