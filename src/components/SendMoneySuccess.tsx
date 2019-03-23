import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { renderCurrencySymbol } from '../utils';

import './SendMoneySuccess.css';

type Props = {
  currency: string,
  amount: string,
  email: string,
  restart: () => void
};

class Success extends PureComponent<Props> {

  render() {
    const { currency, amount, email, restart } = this.props;
    return (
      <Fragment>
        <div className="content success">
          <div className="success-message">You have sent {renderCurrencySymbol(currency)}{amount} to {email}!</div>
          <div className="success-icon">✔︎</div>
        </div>
        <footer>
          <div onClick={restart}>Send Money</div>
          <Link to="/view">Transaction History</Link>
        </footer>
      </Fragment>
    );
  }
}

export default Success;
