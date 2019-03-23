import React, { PureComponent, ChangeEvent, Fragment } from 'react';
import { renderCurrencySymbol, validAmount, validEmail, formatAmount } from '../utils';

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
          <label>
            To: <input type="email" value={this.props.email} onChange={this.props.handleEmailChange} autoFocus />
            {this.props.validEmail === true && "✔︎"}
            {this.props.validEmail === false && "✘"}
          </label>
          <label>
            Amount: {renderCurrencySymbol(this.props.currency)}
            <input type="text" value={this.props.amount} onChange={this.props.handleAmountChange} />
            <select value={this.props.currency} onChange={this.props.handleCurrencySelect}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="JPY">JPY</option>
            </select>
          </label>
          <label>
            <span>Message (optional):</span>
            <textarea value={this.props.message} onChange={this.props.handleMessageChange} />
          </label>
          <label>What's this payment for?</label>
          <label>
            <input type="radio"
              name="transactionType"
              value={PERSONAL}
              onChange={this.props.handleOptionChange}
              checked={this.props.transactionType === PERSONAL} />
            I'm sending money to family or friends
          </label>
          <label>
            <input type="radio"
              name="transactionType"
              value={BUSINESS}
              onChange={this.props.handleOptionChange}
              checked={this.props.transactionType === BUSINESS} />
              I'm paying for goods or services
          </label>
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
