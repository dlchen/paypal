import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Initial from './components/Initial';
import SendMoney from './components/SendMoney';
import ViewHistory from './components/ViewHistory';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Initial} />
          <Route path="/send" component={SendMoney} />
          <Route path="/view" component={ViewHistory} />
        </div>
      </Router>
    );
  }
}

export default App;
