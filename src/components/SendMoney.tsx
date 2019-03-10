import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './SendMoney.css';

class Initial extends Component {
  render() {
    return (
      <div>
        <header>Send Money</header>
        <form>
          <label>
            To: <input type="text" />
          </label>
          <label>
            Amount: <input type="text" />
            <select name="currency">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="JPY">JPY</option>
            </select>
          </label>
          <label>
            <span>Message (optional):</span>
            <textarea />
          </label>
          <label>What's this payment for?</label>
          <label>
            I'm sending money to family or friends
            <input type="radio" name="transactionType" />
          </label>
          <label>
            I'm paying for goods or services
            <input type="radio" name="transactionType" />
          </label>
        </form>
        <footer>
          <Link to="/">Back</Link>
        </footer>
      </div>
    );
  }
}

export default Initial;
