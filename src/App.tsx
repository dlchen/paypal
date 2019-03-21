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
    const { hideLoading, showLoading } = this.props;
    return (
      <Router>
        <div>
          <Route path="/" exact component={Initial} />
          <Route path="/send" render={(props) => <SendMoney {...props} hideLoading={hideLoading} showLoading={showLoading} />} />
          <Route path="/view" component={ViewHistory} />
        </div>
      </Router>
    );
  }
}

export default App;
