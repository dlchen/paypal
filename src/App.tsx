import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

import Initial from './components/Initial';
import SendMoney from './components/SendMoney';
import ViewHistory from './components/ViewHistory';

type Props = {
  hideLoading: () => void;
  showLoading: () => void;
};

class App extends Component<Props,{}> {
  componentDidMount() {
    this.props.hideLoading();
  }
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Initial}></Route>
          <Route path="/send" component={SendMoney}></Route>
          <Route path="/view" component={ViewHistory}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
