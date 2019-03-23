import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import './Initial.css';

class Initial extends PureComponent {
  render() {
    return (
      <div>
        <header>What are we Doing?</header>
        <div className="content">
          <Link to="/send">Send Money</Link>
          <Link to="/view">View Transaction History</Link>
        </div>
        <footer></footer>
      </div>
    );
  }
}

export default Initial;
