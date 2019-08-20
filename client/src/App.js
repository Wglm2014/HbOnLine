import React from "react";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./components/Nav"
import Landing from "./components/Landing"
import "./App.css";
function App() {

  return (
    <Router>
    <div className="App">
      <NavBar />
      <Route exact path = "/" component = {Landing}/>
    </div>
    </Router>
  )
}

export default App;
