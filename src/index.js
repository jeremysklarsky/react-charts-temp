import React from 'react';
import { render } from "react-dom";

import './index.css';
import "semantic-ui-css/semantic.min.css";
import "react-vis/dist/style.css";

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { middleware as reduxPackMiddleware } from "redux-pack";
import { Provider } from "react-redux";

import rootReducer from "./reducers";

const store = createStore(rootReducer, applyMiddleware(reduxPackMiddleware));

render(
  <Provider store={store}>  
    <Router>
      <Route path="/:id" component={App} /> 
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();

// WITHOUT REDUX
// ReactDOM.render(<App />, document.getElementById('root'));
