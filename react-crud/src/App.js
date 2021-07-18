import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddUser from "./components/addUser";
import User from "./components/user";
import UsersList from "./components/usersList";

class App extends Component {
  render() {
    return (
      <div className="main-wrapper"> 
        <div className="d-flex justify-content-center">
          <h5><br/>USERS BOARD<br/></h5>
        </div>

        <div className="app-container mt-3">
          <Switch>
            <Route exact path={["/", "/users"]} component={UsersList} />
            <Route exact path="/add" component={AddUser} />
            <Route path="/users/:id" component={User} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
