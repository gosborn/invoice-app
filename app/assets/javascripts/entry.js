console.log('hello world!')

import Main from "./components/main.es6";

import ReactDOM from './../../../node_modules/react-dom';

ReactDOM.render(<Main user_email='greg' />, document.getElementById('container'))