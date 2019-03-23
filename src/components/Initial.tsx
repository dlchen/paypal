import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import './Initial.css';

class Initial extends PureComponent {
  render() {
    return (
      <div>
        <header>What are we Doing?</header>
        <div className="initial content">
          <Link to="/send" className="action">Send Money</Link>
          <Link to="/view" className="action">View Transaction History</Link>
        </div>
        <footer></footer>
      </div>
    );
  }
}

export default Initial;
