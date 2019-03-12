import React, { Component, ChangeEvent } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './SendMoney.css';

const renderCurrencySymbol = (currency: string) => {
  switch (currency) {
    case 'USD': return '$';
    case 'EUR': return '€';
    case 'JPY': return '¥';
  };
}

const validAmount = (amount: string) => {

  // TODO: add logic
  return Number(amount) > 0;
};

const validEmail = (email: string) => {

  const MAX_LENGTH_LOCAL = 64;
  const MAX_LENGTH_DOMAIN = 255;

  // return false if no '@' or 2 or more '@'
  const splitAt = email.split('@');
  if (splitAt.length === 1 || splitAt.length > 2) {
    return false;
  }

  const [local, domain] = splitAt;

  if (local.length === 0 ||
      local.length > MAX_LENGTH_LOCAL ||
      domain.length === 0 ||
      domain.length > MAX_LENGTH_DOMAIN) {
    return false;
  }

  if (!/\S+/.test(local)) {
    return false;
  }

  // return false if no '.' or 2 or more '.' in domain
  const domainSplit = domain.split('.');
  if (domainSplit.length === 1 || domainSplit.length > 2) {
    return false;
  }

  const [host, tld] = domainSplit;

  const domainRegex = /^[A-Za-z0-9\-]+$/;
  if (!domainRegex.test(host) || !domainRegex.test(tld)) {
    return false;
  }

  return true;
};

type TransactionType = 'UNKNOWN' | 'PERSONAL' | 'BUSINESS';
const UNKNOWN = 'UNKNOWN';
const PERSONAL = 'PERSONAL';
const BUSINESS = 'BUSINESS';

type State = {
  success: boolean,
  validEmail: boolean | null,
  email: string,
  currency: string,
  amount: string,
  message: string,
  transactionType: TransactionType
};

class Initial extends Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      success: false,
      validEmail: null,
      email: '',
      currency: 'USD',
      amount: '',
      message: '',
      transactionType: UNKNOWN
    };

    this.emailOnBlur = this.emailOnBlur.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleCurrencySelect = this.handleCurrencySelect.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.restart = this.restart.bind(this);
  }
  emailOnBlur() {
    this.setState({ validEmail: validEmail(this.state.email) });
  }
  handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    // TODO: add email validation
    this.setState({ email: event.currentTarget.value });
  }
  handleCurrencyChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget.value;
    if (input === '') {
      this.setState({ amount: '' });
    }
    else if (!input.includes('-')) {
      // TODO: add commas at correct place
      const firstMatch = /\d+\.?\d{0,2}/.exec(input);
      this.setState({ amount: firstMatch ? firstMatch[0] : this.state.amount });
    }
  }
  handleCurrencySelect(event: ChangeEvent<HTMLSelectElement>) {
    this.setState({ currency: event.currentTarget.value });
  }
  handleMessageChange(event: ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ message: event.currentTarget.value });
  }
  handleOptionChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    if (value === PERSONAL || value === BUSINESS) {
      const type: TransactionType = value;
      this.setState({ transactionType: type })
    }
  }
  resetForm() {
    this.setState({
      validEmail: null,
      email: '',
      currency: 'USD',
      amount: '',
      message: '',
      transactionType: UNKNOWN
    });
  }
  submitForm() {
    if (validEmail(this.state.email) && validAmount(this.state.amount)) {
      this.setState({ success: true });
    }
  }
  restart() {
    this.resetForm();
    this.setState({ success: false });
  }
  render() {
    return (
      <div>
        <header>Send Money</header>
        {!this.state.success && <form id="send-money">
          <label>
            To: <input type="email" value={this.state.email} onChange={this.handleEmailChange} onBlur={this.emailOnBlur} autoFocus />
            {this.state.validEmail === true && "✔︎"}
            {this.state.validEmail === false && "✘"}
          </label>
          <label>
            Amount: {renderCurrencySymbol(this.state.currency)}
            <input type="text" value={this.state.amount} onChange={this.handleCurrencyChange} />
            <select value={this.state.currency} onChange={this.handleCurrencySelect}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="JPY">JPY</option>
            </select>
          </label>
          <label>
            <span>Message (optional):</span>
            <textarea value={this.state.message} onChange={this.handleMessageChange} />
          </label>
          <label>What's this payment for?</label>
          <label>
            I'm sending money to family or friends
            <input type="radio"
              name="transactionType"
              value={PERSONAL}
              onChange={this.handleOptionChange}
              checked={this.state.transactionType === PERSONAL} />
          </label>
          <label>
            I'm paying for goods or services
            <input type="radio"
              name="transactionType"
              value={BUSINESS}
              onChange={this.handleOptionChange}
              checked={this.state.transactionType === BUSINESS} />
          </label>
        </form>}
        {this.state.success && <div className="success">
          You have sent {renderCurrencySymbol(this.state.currency)}{this.state.amount} to {this.state.email}!
        </div>}
        <footer>
          {!this.state.success && <div onClick={this.resetForm}>Clear</div>}
          {!this.state.success && <div onClick={this.submitForm}>Next</div>}
          {this.state.success && <div onClick={this.restart}>Send Money</div>}
          {this.state.success && <Link to="/view">Transaction History</Link>}
        </footer>
      </div>
    );
  }
}

export default Initial;
