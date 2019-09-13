import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import NavBar from "./components/Nav";
import Landing from "./components/Landing";
//import PostBudgetLine from "./components/budgetForm";
//import PostMovements from "./components/movementForm";
//import PostTransfers from "./components/transferForm";
import "./css/App.css"
//Redux
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setauthtoken"
import Routes from "./components/routing/Routes";

/*<PrivateRoute exact path="/postbudgetline" component={PostBudgetLine} />
              <PrivateRoute exact path="/postmovements/:id" component={PostMovements} />
              <PrivateRoute exact path="/posttransfers/:id" component={PostTransfers} />*/

console.log(localStorage.token);
if (localStorage.token) {
  console.log("here");
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    console.log("before load user");
    store.dispatch(loadUser)
    console.log("after load user");
  }, []); //empty bracket will make it only run once

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;