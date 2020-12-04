import React from "react";
import { Switch, Route } from "react-router-dom";
import CreateAccount from "./components/createAccount/CreateAccount";
import HomePage from "./components/pages/HomePage";
import UserDashboard from "./components/user/UserDashboard";
import EditArticle from "./components/links/EditArticle";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/user-dashboard">
        {" "}
        <UserDashboard />{" "}
      </Route>
      <Route exact path="/user-dashboard/edit-:id" component={EditArticle} />
      <Route exact path="/create-account" component={CreateAccount} />
    </Switch>
  );
};

export default Routes;
