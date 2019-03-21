import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const spinner = document.querySelector('.spinner');
const overlay = document.querySelector('.overlay');

const showLoading = () => {
  spinner && spinner.classList.remove('spinner--hide');
  overlay && overlay.classList.remove('overlay--hide');
};
const hideLoading = () => {
  spinner && spinner.classList.add('spinner--hide');
  overlay && overlay.classList.add('overlay--hide');
};

ReactDOM.render(<App hideLoading={hideLoading} showLoading={showLoading} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
