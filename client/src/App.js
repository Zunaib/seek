import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import LandingNavBar from "./components/LandingNav";
import Landing from "./containers/Landing";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Main from "./containers/Main";
import Videos from "./containers/Videos";
import SuspiciousVideos from "./containers/SuspiciousVideos";
import SuspiciousVideo from "./containers/SuspiciousVideo";
import NormalVideos from "./containers/NormalVideos";
import NormalVideo from "./containers/NormalVideo";
import StaticVideos from "./containers/StaticVideos";
import StaticVideo from "./containers/StaticVideo";
import Allvideos from "./containers/Allvideos";
import Admindashboard from "./containers/Admindashboard";
import Allusers from "./containers/Allusers";
import AllsuspiciousVideos from "./containers/AllsuspiciousVideos";
import AllstaticVideos from "./containers/AllstaticVideos";
import AllnormalVideos from "./containers/AllnormalVideos";
import Allcontacts from "./containers/Allcontacts";
import Allrequests from "./containers/Allrequests";
import Logout from "./containers/Logout";
import AdminRequest from "./containers/AdminRequest";
import AdminLayout from "./components/common/Layout";
import WebLayout from "./components/common/WebLayout";
import Settings from "./containers/Settings";
import Profile from "./containers/Profile";

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
        <LandingNavBar />
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
      if (
        localStorage.getItem("admin") === "true" &&
        localStorage.getItem("profile") === "admin"
      ) {
        routes = (
          <>
            <Switch>
              <AdminLayout>
                <Route exact path="/dashboard" component={Admindashboard} />
                <Route exact path="/allvideos" component={Allvideos} />
                <Route exact path="/allusers" component={Allusers} />
                <Route
                  exact
                  path="/allsuspvid"
                  component={AllsuspiciousVideos}
                />
                <Route exact path="/allstaticvid" component={AllstaticVideos} />
                <Route exact path="/allnormalvid" component={AllnormalVideos} />
                <Route exact path="/allcontacts" component={Allcontacts} />
                <Route exact path="/allrequests" component={Allrequests} />
                <Route exact path="/settings" component={Settings} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/logout" component={Logout} />
                <Redirect to="/dashboard" />
              </AdminLayout>
            </Switch>
          </>
        );
      } else {
        routes = (
          <>
            <Switch>
              <WebLayout>
                <Route exact path="/main" component={Main} />
                <Route
                  exact
                  path="/videos/normal/:videoname"
                  component={NormalVideo}
                />
                <Route
                  exact
                  path="/videos/suspicious/:videoname"
                  component={SuspiciousVideo}
                />
                <Route
                  exact
                  path="/videos/static/:videoname"
                  component={StaticVideo}
                />
                <Route exact path="/videos" component={Videos} />
                <Route
                  exact
                  path="/suspiciousvideos"
                  component={SuspiciousVideos}
                />
                <Route exact path="/normalvideos" component={NormalVideos} />
                <Route exact path="/staticvideos" component={StaticVideos} />
                <Route exact path="/settings" component={Settings} />
                <Route
                  exact
                  path="/request-admin-access"
                  component={AdminRequest}
                />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/logout" component={Logout} />
                <Redirect to="/main" />
              </WebLayout>
            </Switch>
          </>
        );
      }
    }

    return <div>{routes}</div>;
  }
}

export default withRouter(App);
