import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// import './SendMoney.css';

const mockTransactions = [
  {
    name: "John Smith",
    date: new Date(Date.UTC(2018, 3, 8)),
    amount: 123.45,
    currency: 'USD'
  },
  {
    name: "Toys R Us",
    date: new Date(Date.UTC(2012, 3, 8)),
    amount: 1123.45,
    currency: 'USD'
  }
];

class ViewHistory extends Component {
  render() {
    return (
      <div>
        <header>Transaction History</header>
        <div className="content">
          <table>
            <tbody>
              <tr>
                <td>12/5/2018</td>
                <td>John Smith</td>
                <td>$123.45</td>
              </tr>
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
