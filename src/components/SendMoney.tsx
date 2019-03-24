import React, { PureComponent, ChangeEvent } from 'react';

import Form from './SendMoneyForm';
import Success from './SendMoneySuccess';
import { validAmount, validEmail, formatAmount } from '../utils';

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

class SendMoney extends PureComponent<Props, State> {
  constructor(props: Props) {
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

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleCurrencySelect = this.handleCurrencySelect.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.restart = this.restart.bind(this);
  }
  handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      email: event.currentTarget.value,
      validEmail: validEmail(event.currentTarget.value)
    });
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
    const { email, amount, transactionType } = this.state;
    if (validEmail(email) && validAmount(amount) && transactionType !== UNKNOWN) {
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
    const { validEmail, email, currency, amount, message, transactionType } = this.state;
    return (
      <div>
        <header>Send Money</header>
        {!this.state.success && <Form
          validEmail={validEmail}
          email={email}
          currency={currency}
          amount={amount}
          message={message}
          transactionType={transactionType}
          handleEmailChange={this.handleEmailChange}
          handleAmountChange={this.handleAmountChange}
          handleCurrencySelect={this.handleCurrencySelect}
          handleMessageChange={this.handleMessageChange}
          handleOptionChange={this.handleOptionChange}
          resetForm={this.resetForm}
          submitForm={this.submitForm} />}
        {this.state.success && <Success
          currency={currency}
          amount={amount}
          email={email}
          restart={this.restart}/>}
      </div>
    );
  }
}

export default SendMoney;
