import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from "./views/Login/Login"
import NotFound from "./views/NotFound"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Signout from "./components/signout"
import Home from "./views/Home/Home"
import Dashboard from "./views/Dashboard/Dashboard"
import Register from "./views/Register/Register"
import ViewFlowers from "./components/ViewFlowers"
import signout from "./components/signout"
import NewSighting from "./components/NewSighting"
import TestPerformance from "./components/TestPerformance"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/signout" component={Signout} />
        <Route exact path="/dashboard" component={Dashboard}/>
        
        <Route exact path="/listflowers" component={ViewFlowers} />
        <Route exact path="/signout" component={signout} />
        <Route exact path="/newsighting" component={NewSighting}/>
        <Route exact path="/performance" component={TestPerformance}/>

        <Route component={NotFound}/>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
