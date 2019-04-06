import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login/index';
import Register from './pages/Register/index';
import Home from './pages/Home/index';
import Charpter from './pages/Charpter';
import Detail from './pages/Detail';
import Content from './pages/Content';
import AdminHome from './pages/Admin/index';
import PersonalCenter from './pages/PersonalCenter';
import AvatarChoose from './components/AvatarChoose';
import Find from './pages/Find';
import { connect } from 'react-redux';
import { loadinfo } from "./redux/user_redux";

const RouteFallback = (props) => {
    console.log('route fallback with location: ', props.location);
    return <Redirect to={ {
        pathname: '/',
        from: props.location
    }} />
}
@connect(
  state => ({

  }),
  { loadinfo }
)
class App extends Component {
  componentDidMount() {
    this.props.loadinfo();
  }
  render() {
    return (
      <div style={{height: "100%", width: "100%"}}>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/find' component={Find}/>
          <Route exact path='/personalcenter' component={PersonalCenter}/>
          <Route exact path='/personalcenter/avatarchoose' component={AvatarChoose}/>
          <Route exact path="/parts/:partId/charpters" component={Charpter} />
          <Route exact path="/parts/:partId/charpters/:charpterId/details" component={Detail} />
          <Route exact path="/parts/:partId/charpters/:charpterId/details/:detailId/contents" component={Content} />
          <Route path='/admin' component={AdminHome}/>
          <Route component={RouteFallback} />
        </Switch>
      </div>
    );
  }
}

export default App;
