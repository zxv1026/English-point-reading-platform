import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import Login from './pages/Login/index';
import Register from './pages/Register/index';
import reducers from './reducer';

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension(): f=>f
))

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <BrowserRouter>
            <div style={{height: "100%", width: "100%"}}>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/register' component={Register}/>
            </div>
      	</BrowserRouter>
        </Provider>
    );
  }
}

export default App;
