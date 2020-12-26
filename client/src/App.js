import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import LandingNavBar from "./components/LandingNav";
import Landing from "./containers/Landing";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Welcomesettings from "./containers/Welcomesettings";
import Main from "./containers/Main";
import Videos from "./containers/Videos";
import FavVideos from "./containers/FavVideos";
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
import Usermessages from "./containers/Usermessages";
import Usercctvs from "./containers/Usercctvs";
import UserCCTVDetection from "./containers/UserCCTVDetection";
import Allmessages from "./containers/Allmessages";
import WebCamStream from "./containers/WebCamStream";
import Allcctvs from "./containers/Allcctvs";
import AllNotifications from "./containers/AllNotifications";
import UserNotifications from "./containers/UserNotifications";

const App = () => {
  let contactUsRef = React.createRef();

  const scrollTocontactUs = () => {
    window.scrollTo(0, contactUsRef.current.offsetTop);
  };

  let routes = (
    <>
      <LandingNavBar />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Landing
              contactUsRefProp={contactUsRef}
              scrollToContactUs={scrollTocontactUs}
            />
          )}
        />
        <Route exact path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Redirect to="/" />
      </Switch>
    </>
  );

  if (
    localStorage.getItem("welcomed") === null ||
    localStorage.getItem("welcomed") === "true"
  ) {
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
                <Route
                  exact
                  path="/allnotifications"
                  component={AllNotifications}
                />
                <Route exact path="/settings" component={Settings} />
                <Route exact path="/profile" component={Profile} />
                <Route path="/allmessages" exact component={Allmessages} />
                <Route path="/allcctvs" exact component={Allcctvs} />

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
                <Route exact path="/webcamstream" component={WebCamStream} />
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
                <Route path="/usermessages" exact component={Usermessages} />
                <Route path="/usercctvs" exact component={Usercctvs} />
                <Route
                  path="/cctvdetection"
                  exact
                  component={UserCCTVDetection}
                />
                <Route
                  exact
                  path="/videos/static/:videoname"
                  component={StaticVideo}
                />
                <Route exact path="/videos" component={Videos} />
                <Route exact path="/favvideos" component={FavVideos} />
                <Route
                  exact
                  path="/suspiciousvideos"
                  component={SuspiciousVideos}
                />
                <Route exact path="/normalvideos" component={NormalVideos} />
                <Route exact path="/staticvideos" component={StaticVideos} />
                <Route
                  exact
                  path="/notifications"
                  component={UserNotifications}
                />
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
  } else {
    routes = (
      <>
        <LandingNavBar />
        <Switch>
          <Route path="/welcomesettings" component={Welcomesettings} />
          <Route exact path="/logout" component={Logout} />

          <Redirect to="/welcomesettings" />
        </Switch>
      </>
    );
  }

  return <div>{routes}</div>;
};

export default withRouter(App);
