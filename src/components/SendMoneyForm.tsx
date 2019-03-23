import React, { PureComponent, ChangeEvent, Fragment } from 'react';
import { renderCurrencySymbol } from '../utils';
import './SendMoneyForm.css';

type TransactionType = 'UNKNOWN' | 'PERSONAL' | 'BUSINESS';
const PERSONAL = 'PERSONAL';
const BUSINESS = 'BUSINESS';

type Props = {
  validEmail: boolean | null,
  email: string,
  currency: string,
  amount: string,
  message: string,
  transactionType: TransactionType,
  handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void,
  handleAmountChange: (e: ChangeEvent<HTMLInputElement>) => void,
  handleCurrencySelect: (e: ChangeEvent<HTMLSelectElement>) => void,
  handleMessageChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
  handleOptionChange: (e: ChangeEvent<HTMLInputElement>) => void,
  resetForm: () => void,
  submitForm: () => void,
  showLoading: () => void,
  hideLoading: () => void
};

class Form extends PureComponent<Props> {

  render() {
    return (
      <Fragment>
        <form id="send-money">
          <div className="email padded form-field">
            <span>To:</span>
            <input type="email" value={this.props.email} onChange={this.props.handleEmailChange} autoFocus />
            {this.props.validEmail === true && "✔︎"}
            {this.props.validEmail === false && "✘"}
          </div>
          <div className="amount padded form-field">
            <span>Amount:</span>
            {renderCurrencySymbol(this.props.currency)}
            <input type="text" value={this.props.amount} onChange={this.props.handleAmountChange} />
            <select value={this.props.currency} onChange={this.props.handleCurrencySelect}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="JPY">JPY</option>
            </select>
          </div>
          <div className="padded form-field">
            <span>Message (optional):</span>
            <textarea value={this.props.message} onChange={this.props.handleMessageChange} />
          </div>
          <span>What's this payment for?</span>
          <div className="padded form-field radio">
            <label className="type">
              <span className={this.props.transactionType === PERSONAL ? "selected" : ""}>
                I'm sending money to family or friends
              </span>
              <input
                type="radio"
                name="transactionType"
                value={PERSONAL}
                onChange={this.props.handleOptionChange}
                checked={this.props.transactionType === PERSONAL} />
            </label>
            <label className="type">
              <span className={this.props.transactionType === BUSINESS ? "selected" : ""}>
                I'm paying for goods or services
              </span>
              <input
                type="radio"
                name="transactionType"
                value={BUSINESS}
                onChange={this.props.handleOptionChange}
                checked={this.props.transactionType === BUSINESS} />
            </label>
          </div>
        </form>
        <footer>
          <div onClick={this.props.resetForm}>Clear</div>
          <div onClick={this.props.submitForm}>Next</div>
        </footer>
      </Fragment>
    );
  }
}

export default Form;
