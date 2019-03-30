import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch, Router } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import Login from './pages/Login/index';
import Register from './pages/Register/index';
import Home from './pages/Home/index';
import Charpter from './pages/Charpter';
import Detail from './pages/Detail';
import Content from './pages/Content';
import AdminHome from './pages/Admin/index';
import { GlobalStyle_Icon } from "./assets/iconfont/iconfont";
import reducers from './reducer';

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension(): f=>f
))
const RouteFallback = (props) => {
    console.log('route fallback with location: ', props.location);
    return <Redirect to={ {
        pathname: '/',
        from: props.location
    }} />
}
class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <BrowserRouter>
              <GlobalStyle_Icon/>
              <div style={{height: "100%", width: "100%"}}>
                <Switch>
                  <Route exact path='/' component={Home}/>
                  <Route exact path='/login' component={Login}/>
                  <Route exact path='/register' component={Register}/>
                  <Route exact path="/parts/:partId/charpters" component={Charpter} />
                  <Route exact path="/parts/:partId/charpters/:charpterId/details" component={Detail} />
                  <Route exact path="/parts/:partId/charpters/:charpterId/details/:detailId/contents" component={Content} />
                  <Route exact path='/admin' component={AdminHome}/>
                  <Route component={RouteFallback} />
                </Switch>
              </div>
      	    </BrowserRouter>
        </Provider>
    );
  }
}

export default App;
