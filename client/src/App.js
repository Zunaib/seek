import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import NavBar from "./components/Navbar";
import LandingNavBar from "./components/LandingNav";
import Landing from "./containers/Landing";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Main from "./containers/Main";
import Videos from "./containers/Videos";
import SuspiciousVideo from "./containers/SuspiciousVideo";
import NormalVideo  from "./containers/NormalVideo";
import StaticVideo from "./containers/StaticVideo";
import Allvideos from "./containers/Allvideos";
import "antd/dist/antd.css";
import "./styles/main.css";
import Allusers from "./containers/Allusers";
import AllsuspiciousVideos from "./containers/AllsuspiciousVideos"
import AllstaticVideos from "./containers/AllstaticVideos"
import AllnormalVideos from "./containers/AllnormalVideos"

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
      <>
      <LandingNavBar/>
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
        <Route exact path="/login" component={Login} />

        <Route path="/register" component={Register} />
        <Redirect to="/" />
      </Switch>
      </>
    );

    if (localStorage.getItem("loggedIn") === "true") {
      routes = (
        <>
        <NavBar />
        <Switch>
          <section className="Header">
          <Route exact path="/main" component={Main} />
          <Route exact path="/videos/suspicious/:videoname" component={SuspiciousVideo}/>
          <Route exact path="/videos/normal/:videoname" component={NormalVideo}/>
          <Route exact path="/videos/static/:videoname" component={StaticVideo}/>
          <Route exact path="/videos" component={Videos} />
          <Route exact path="/allvideos" component={Allvideos} />
          <Route exact path="/allusers" component={Allusers}/>
          <Route exact path="/allsuspvid" component={AllsuspiciousVideos}/>
          <Route exact path="/allstaticvid" component={AllstaticVideos}/>
          <Route exact path="/allnormalvid" component={AllnormalVideos}/>

          
          {/* <Redirect exact to="/main"/> */}
          </section>
        </Switch>
        </>
      );
    }

    return (
      <div>
        {routes}
        
      </div>
    );
  }
}

export default withRouter(App);
