const MiniReact = require('./react');
const ReactDOM = require('./reactDOM');

/** @jsx MiniReact.createElement */
function App(props) {
  return <h1>Hey {props.name}</h1>
}

const container = document.getElementById('root');
ReactDOM.render(<App name="foo" />, container);