console.log('hello world1')

import React from './../../../node_modules/react'
import ReactDOM from './../../../node_modules/react-dom'

import Main from "./components/main.es6";

ReactDOM.render(<Main user_email='greg' />, document.getElementById('container'))