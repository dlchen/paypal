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

  const noCommas = amount.replace(/,/g, '');
  return Number(noCommas) > 0;
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

const insertCommas = (wholeNum: number, { offset } = { offset: 0 }): string => {

  const stringified = String(wholeNum);

  const decimalIdx = stringified.length - offset;
  const decimals = stringified.slice(decimalIdx);
  const whole = stringified.slice(0, decimalIdx);

  const commaHelper = (acc: string, str: string, count: number): string => {

    const head = str && str[0];

    if (!head) return acc;

    const tail = str.slice(1);

    if (count === 1 && tail) {
      return commaHelper(acc + head + ',', tail, 3);
    }

    return commaHelper(acc + head, tail, count - 1);
  };

  const withCommas = commaHelper('', whole, whole.length % 3 || 3);

  return withCommas + decimals;
};

const formatAmount = (digits: string) => {

  const parsed = parseInt(digits, 10);

  if (parsed === 0) {
    return '0.00';
  }

  const stringified = String(parsed);
  if (stringified.length <= 3) {
    let padded = stringified;
    while (padded.length < 3) {
      padded = '0' + padded;
    }
    return padded.slice(0, 1) + '.' + padded.slice(1);
  }

  const withCommas = insertCommas(parsed, { offset: 2 });
  const decimalIdx = withCommas.length - 2;
  const withDecimal = withCommas.slice(0, decimalIdx) + '.' + withCommas.slice(decimalIdx);
  return withDecimal;
};

type TransactionType = 'UNKNOWN' | 'PERSONAL' | 'BUSINESS';
const UNKNOWN = 'UNKNOWN';
const PERSONAL = 'PERSONAL';
const BUSINESS = 'BUSINESS';

type Props = {
  hideLoading: () => void;
  showLoading: () => void;
};

type State = {
  success: boolean,
  validEmail: boolean | null,
  email: string,
  currency: string,
  amount: string,
  message: string,
  transactionType: TransactionType,
};

class Initial extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      success: false,
      validEmail: null,
      email: '',
      currency: 'USD',
      amount: '0.00',
      message: '',
      transactionType: UNKNOWN
    };

    this.emailOnBlur = this.emailOnBlur.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
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
    this.setState({ email: event.currentTarget.value });
  }
  handleAmountChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget.value;
    if (input === '') {
      return this.setState({ amount: '0.00' });
    }
    const digits = input.replace(/[,|.]/g, '');
    if (digits.match(/^\d+$/)) {
      const format = formatAmount(digits);
      this.setState({ amount: format });
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
      this.props.showLoading();
      setTimeout(() => {
        this.props.hideLoading();
        this.setState({ success: true });
      }, 500);
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
            <input type="text" value={this.state.amount} onChange={this.handleAmountChange} />
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
        {this.state.success && <div className="content">
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
