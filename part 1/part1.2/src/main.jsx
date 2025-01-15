import React from 'react';
import ReactDOM from 'react-dom';
import App1 from './app1/App1';
import App2 from './app2/App2';

const AppSelector = () => {
  const path = window.location.pathname;

  if (path === '/app2') {
    return <App2 />;
  }

  return <App1 />;
};

ReactDOM.render(
  <React.StrictMode>
    <AppSelector />
  </React.StrictMode>,
  document.getElementById('root')
);