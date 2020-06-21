import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Profile from "./components/Profile";
import { Register } from "./components/Register";
import { ThemeProvider, theme, CSSReset } from "@chakra-ui/core";
// import Uploader from "./components/Not-use/Galery-photo/Uploader";
import ManageGallery from "./components/Not-use/ManageGallery";
import { Error } from "./components/Error";
import { UploadFile } from "./components/UploadFile";

const breakpoints = ["360px", "768px", "1024px", "1440px"];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const newTheme = {
  ...theme,
  breakpoints,
};

function App(props) {
  const [loggedInStatus, setLoggedInStatus] = useState(
    localStorage.getItem("userToken")
  );

  const [user, setUser] = useState({});
  const toggleToken = () => {
    // setToken(true);
  };
  const handleLogin = (res) => {
    console.log(res.data.user);
    localStorage.setItem("name", res.data.user.name);
    localStorage.setItem("avatar", res.data.user.avatar);
    console.log(localStorage.getItem( "avatar"));
    setLoggedInStatus(localStorage.getItem("userToken"));
    // console.log("set login in");
  };

  const handleLogout = () => {
    localStorage.setItem("userToken", "");
    setLoggedInStatus("");

    // props.history.push("/login");
  };

  return (
    <div className="">
      <ThemeProvider theme={newTheme}>
        <CSSReset />

        {/* <Home /> */}
        <Router>
          <Route
            path="/"
            render={(props) => (
              <Navbar
                {...props}
                loggedInStatus={loggedInStatus}
                handleLogout={handleLogout}
              />
            )}
          />
          {/* <Navbar loggedInStatus={loggedInStatus} handleLogout={handleLogout} /> */}
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Landing {...props} loggedInStatus={loggedInStatus} />
              )}
            />
            <Route
              exact
              path="/login"
              render={(props) => <Login {...props} handleLogin={handleLogin} />}
            />
            {/* <Route exact path="/" component={Landing}></Route> */}
            <Route exact path="/register" component={Register}></Route>
            {/* <Route exact path="/login" component={Login}></Route> */}

            {/* <Route
            exact
            path="/login"
            children={<Login toggleToken={toggleToken} />}
          ></Route> */}
            {/* <Uploader /> */}
            <Route exact path="/profile" component={Profile}></Route>
            <Route exact path="/manage" component={ManageGallery}></Route>
            <Route exact path="/upload" component={UploadFile}></Route>
            <Route component={Error}></Route>
          </Switch>
        </Router>
      </ThemeProvider>

      {/* <Login /> */}
      {/* <Landing /> */}
    </div>
  );
}

export default App;
