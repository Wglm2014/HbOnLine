import React,{useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./components/Nav";
import Landing from "./components/Landing";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
//Redux
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/alert"
import {loadUser} from "./actions/auth";
import setAuthToken from "./utils/setauthtoken"
import "./App.css";


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App =() =>{
  useEffect(()=>{
    store.dispatch(loadUser)},[]); //empty bracket will make it only run once
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </section>
        </div>
      </Router>
    </Provider>
  )
}

export default App;
