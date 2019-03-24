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
  submitForm: () => void
};

class Form extends PureComponent<Props> {

  render() {
    const {
      validEmail,
      email,
      currency,
      amount,
      message,
      transactionType,
      handleEmailChange,
      handleAmountChange,
      handleCurrencySelect,
      handleMessageChange,
      handleOptionChange,
      resetForm,
      submitForm
    } = this.props;
    return (
      <Fragment>
        <form id="send-money">
          <div className="email padded form-field">
            <span>To:</span>
            <input type="email" value={email} onChange={handleEmailChange} autoFocus />
            {validEmail === true && "✅"}
            {validEmail === false && "❌"}
          </div>
          <div className="amount padded form-field">
            <span>Amount:</span>
            {renderCurrencySymbol(currency)}
            <input type="text" value={amount} onChange={handleAmountChange} />
            <select value={currency} onChange={handleCurrencySelect}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="JPY">JPY</option>
            </select>
          </div>
          <div className="padded form-field">
            <span>Message (optional):</span>
            <textarea value={message} onChange={handleMessageChange} />
          </div>
          <span>What's this payment for?</span>
          <div className="padded form-field radio">
            <label className="type">
              <span className={transactionType === PERSONAL ? "selected" : ""}>
                I'm sending money to family or friends
              </span>
              <input
                type="radio"
                name="transactionType"
                value={PERSONAL}
                onChange={handleOptionChange}
                checked={transactionType === PERSONAL} />
            </label>
            <label className="type">
              <span className={transactionType === BUSINESS ? "selected" : ""}>
                I'm paying for goods or services
              </span>
              <input
                type="radio"
                name="transactionType"
                value={BUSINESS}
                onChange={handleOptionChange}
                checked={transactionType === BUSINESS} />
            </label>
          </div>
        </form>
        <footer>
          <div onClick={resetForm}>Clear</div>
          <div onClick={submitForm}>Next</div>
        </footer>
      </Fragment>
    );
  }
}

export default Form;
