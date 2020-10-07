import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import NavBar from "./components/Navbar";
import Landing from "./containers/Landing";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Main from "./containers/Main";
import Videos from "./containers/Videos";
import SuspiciousVideo from "./containers/SuspiciousVideo";
import NormalVideo  from "./containers/NormalVideo";
import StaticVideo from "./containers/StaticVideo";
import "antd/dist/antd.css";
import "./styles/main.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.contactUsRef = React.createRef();
    this.scrollTocontactUs = this.scrollTocontactUs.bind(this);
  }

  scrollTocontactUs() {
    window.scrollTo(0, this.contactUsRef.current.offsetTop);
  }
  render() {
    let routes = (
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Landing
              contactUsRefProp={this.contactUsRef}
              scrollToContactUs={this.scrollTocontactUs}
            />
          )}
        />
        <Route path="/login" component={Login} />

        <Route path="/register" component={Register} />
        <Redirect to="/" />
      </Switch>
    );

    if (localStorage.getItem("loggedIn") === "true") {
      routes = (
        <Switch>
          <Route exact path="/main" component={Main} />
          <Route exact path="/videos" component={Videos} />
          <Route exact path="/videos/suspicious/:videoname" component={SuspiciousVideo}/>
          <Route exact path="/videos/normal/:videoname" component={NormalVideo}/>
          <Route exact path="/videos/static/:videoname" component={StaticVideo}/>
          
          <Redirect to="/main"/>
        </Switch>
      );
    }

    return (
      <div>
        <NavBar />
        {routes}
      </div>
    );
  }
}

export default withRouter(App);
