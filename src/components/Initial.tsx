import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './Initial.css';

class Initial extends Component {
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
