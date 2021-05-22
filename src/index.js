const MiniReact = require('./react');
const ReactDOM = require('./reactDOM');

/** @jsx MiniReact.createElement */
const element = (
  <div style="background: salmon">
    <h1>Hello World</h1>
    <h2 style="text-align:right">from MiniReact</h2>
  </div>
);

const container = document.getElementById('root');
ReactDOM.render(element, container);