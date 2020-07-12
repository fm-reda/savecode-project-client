import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
// import NavbarLog from "./components/NavbarOut.js";
import GetStarted from "./components/GetStarted";
import { UploadFile } from "./components/UploadFile";
import Profile from "./components/Profile";
import Register from "./components/Register";
import ManageGallery from "./components/ManageGallery";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import {
  ThemeProvider,
  theme,
  CSSReset,
  usePopoverContext,
} from "@chakra-ui/core";
// import Uploader from "./components/Not-use/Galery-photo/Uploader";
import { Error } from "./components/Error";
import customTheme from "./themes";
import { login } from "./components/UserFunctions";
import { RegisterPage } from "./components/pages/RegisterPage";
import { LoginPage } from "./components/pages/LoginPage";
import { Home } from "./components/pages/Home";
import Navbar2 from "./components/Navbar2";
import Sidebar from "./components/Sidebar";
import NewElementPage from "./components/pages/NewElementPage";
import SingleCustom from "./components/Custom-element/SingleCustom";

const breakpoints = ["360px", "768px", "1024px", "1440px"];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

// const newTheme = {
//   ...theme,
//   breakpoints,
// };

export const LogContext = React.createContext();
export const LogStatusContext = React.createContext();
function App(props) {
  const [loggedInStatus, setLoggedInStatus] = useState(null);
  // console.log(loggedInStatus);
  // console.log(loggedInStatus);
  const [render, setRender] = useState(false);
  const [startedTime, setStartedTime] = useState(null);
  // console.log(startedTime);

  const [user, setUser] = useState({});
  useEffect(() => {
    if (localStorage.getItem("userToken") && !startedTime) {
      setLoggedInStatus(true);
      // setUrl("home");
    } else {
      setLoggedInStatus(false);
      // setUrl("");
    }
  }, [loggedInStatus, render]);
  const rendering = () => {
    // console.log("test");
    setStartedTime(false);

    setRender(!render);

    console.log("render :" + render);
  };
  const handleLogin = (res, infos, origin) => {
    // console.log("the status from handleLogin   " + origin);

    if (origin === "started") {
      const user = {
        email: res.success.email,
        password: infos,
      };

      login(user).then((res) => {
        setStartedTime(true);
        if (res && res.status == 200) {
          // setRender(!render);
          // console.log(res);
          localStorage.setItem("name", res.data.user.name);
          // localStorage.setItem("userToken", res.data.user.name);
          localStorage.setItem("avatar", res.data.user.avatar);
          // console.log(localStorage);
          setRender(!render);

          // setLoggedInStatus(localStorage.getItem("userToken"));
        }
      });
      // setGetStarted(true);
      // console.log("if");
      // setLoggedInStatus(true);
    } else {
      // setGetStarted(false);
      // setLoggedInStatus(false);
    }

    // console.log(user);
    // console.log(loggedInStatus);

    // console.log(pass);

    // console.log(localStorage.getItem("avatar"));
  };

  const handleLogout = () => {
    localStorage.setItem("userToken", "");
    localStorage.setItem("name", "");
    localStorage.setItem("avatar", "");
    setLoggedInStatus(false);

    // props.history.push("/login");
  };

  return (
    <div className="">
      <ThemeProvider theme={customTheme}>
        <CSSReset />

        {/* <Home /> */}
        <LogContext.Provider value={handleLogin}>
          <LogStatusContext.Provider value={rendering}>
            <Router>
              {/* ********************Test Token redirect navbar or navbar2 */}

              {!loggedInStatus ? (
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
              ) : (
                <Route
                  path="/"
                  render={(props) => (
                    <Navbar2
                      {...props}
                      loggedInStatus={loggedInStatus}
                      handleLogout={handleLogout}
                      rendering={rendering}
                    />
                  )}
                />
              )}

              <Switch>
                {/* **********************Test Token redirect home or login */}

                {loggedInStatus ? (
                  <Route
                    path="/home"
                    render={(props) => (
                      <Home
                        {...props}
                        loggedInStatus={loggedInStatus}
                        handleLogout={handleLogout}
                        rendering={rendering}
                      />
                    )}
                  />
                ) : (
                  <Route
                    path="/home"
                    render={(props) => (
                      <LoginPage
                        {...props}
                        setLoggedInStatus={setLoggedInStatus}
                        loggedInStatus={loggedInStatus}
                        handleLogin={handleLogin}
                      />
                    )}
                  />
                )}
                {/* ************************Test Token redirect home or landing */}

                {!loggedInStatus ? (
                  <Route
                    exact
                    path="/"
                    render={(props) => (
                      <Landing
                        {...props}
                        loggedInStatus={loggedInStatus}
                        handleLogout={handleLogout}
                      />
                    )}
                  />
                ) : (
                  <Route
                    exact
                    path="/"
                    render={(props) => (
                      <Home
                        {...props}
                        loggedInStatus={loggedInStatus}
                        handleLogout={handleLogout}
                      />
                    )}
                  />
                )}
                {/* *******************************************Login */}
                <Route
                  exact
                  path="/login"
                  render={(props) => (
                    <LoginPage
                      {...props}
                      handleLogin={handleLogin}
                      setLoggedInStatus={setLoggedInStatus}
                    />
                  )}
                />
                {/* ******************************************* Register */}
                <Route
                  exact
                  path="/register"
                  render={(props) => (
                    <RegisterPage
                      {...props}
                      handleLogin={handleLogin}
                      rendering={rendering}
                    />
                  )}
                />
                {/* ******************************************* Get Started */}
                {/* {loggedInStatus && (
                <Route
                path="/home"
                render={(props) => (
                  <Home
                  {...props}
                      loggedInStatus={loggedInStatus}
                      handleLogout={handleLogout}
                    />
                    )}
                />
              )}
              
              {!loggedInStatus && (
                <Route
                path="/home"
                render={(props) => (
                  <LoginPage
                  {...props}
                  loggedInStatus={loggedInStatus}
                  handleLogin={handleLogin}
                  
                  // handleLogout={handleLogout}
                    />
                    )}
                />
              )} */}

                <Route
                  exact
                  path="/new-element"
                  render={(props) => (
                    <NewElementPage
                      {...props}
                      // loggedInStatus={loggedInStatus}
                      // handleLogout={handleLogout}
                    />
                  )}
                />
                <Route
                  exact
                  path="/:category/:subCategory"
                  render={(props) => (
                    <SingleCustom
                      {...props}
                      // loggedInStatus={loggedInStatus}
                      // handleLogout={handleLogout}
                    />
                  )}
                />
                {/* <Route
                exact
                path="/get-started"
                render={(props) => (
                  <GetStarted
                    {...props}
                    handleLogin={handleLogin}
                    loggedInStatus={loggedInStatus}
                  />
                )}
              /> */}
                {/* <Route exact path="/" component={Landing}></Route> */}
                <Route exact path="/profile" component={Profile}></Route>
                <Route exact path="/manage" component={ManageGallery}></Route>
                <Route exact path="/upload" component={UploadFile}></Route>

                {/* <Route exact path="/register" component={RegisterPage}></Route> */}

                {/* <Route exact path="/login" component={Login}></Route> */}
                <Route
                  exact
                  path="/get-started"
                  render={(props) => (
                    <GetStarted
                      {...props}
                      handleLogin={handleLogin}
                      loggedInStatus={loggedInStatus}
                    />
                  )}
                />
                <Route component={Error}></Route>

                {/* <Route
            exact
            path="/login"
            children={<Login toggleToken={toggleToken} />}
          ></Route> */}
                {/* <Uploader /> */}
              </Switch>
            </Router>
          </LogStatusContext.Provider>
        </LogContext.Provider>
      </ThemeProvider>

      {/* <Login /> */}
      {/* <Landing /> */}
    </div>
  );
}

export default App;
