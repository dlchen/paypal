import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// import './SendMoney.css';

class Initial extends Component {
  render() {
    return (
      <div>
        <header>Send Money</header>
        <div className="content">
          <form>
            <input type="text"></input>
          </form>
        </div>
        <footer>
          <Link to="/">Back</Link>
        </footer>
      </div>
    );
  }
}

export default Initial;
