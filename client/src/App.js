import React from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import HomepageLayout from "./components/home/HomePageLayout";
import Users from "./components/users/Users";
import Products from "./components/products/Products";
import LoginLayout from "./components/LoginLayout/LoginLayout";
import SignInLayout from "./components/registration/registration";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={HomepageLayout} />
        <Route exact path="/Users" component={Users} />
        <Route exact path="/Products" component={Products} />
        <Route exact path="/Log-in" component={LoginLayout} />
        <Route exact path="/signin" component={SignInLayout} />
      </div>
    </Router>
  );
}

export default App;
