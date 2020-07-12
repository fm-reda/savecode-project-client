import React from "react";
import { Box, Divider, Flex, Heading, Stack } from "@chakra-ui/core";
import { NavLink } from "react-router-dom";
import Logo from "./../../images/Logo/logo5white.png";
import { useEffect } from "react";
import { getCategories } from "../Category/CategoryFunctions";
import { useState } from "react";
import Navbar2 from "../Navbar2";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import NewElementPage from "./NewElementPage";
import { LoginPage } from "./LoginPage";
import Profile from "../Profile";

export const Home = () => {
  const [categories, setCategories] = useState([]);
  // useEffect(() => {
  //   getCategories().then((res) => {
  //     setCategories(res.data.success);
  //     console.log(res);
  //   });
  // }, []);
  return (
    <Stack ml="20%" mt="10%" >
      <Box mx="auto">
        <Heading>Hello from Home</Heading>
      </Box>
    </Stack>
    // <Flex h="100vh" bg="firebase" w="15%">
    //   <NavLink to="/home">
    //     {" "}
    //     <Box
    //       // border="1px"
    //       pt="85px"
    //       mx="auto"
    //       bgImage={`url('${Logo}')`}
    //       bgPos="center"
    //       bgSize="90%"
    //       bgRepeat="no-repeat"
    //       w="200px"
    //       h="10px"
    //       // h="40px"
    //       color="#FFF"
    //     ></Box>
    //   </NavLink>
    //   <Box w="20%">sidebar</Box>
    //   <Box>
    //     {/* <Navbar2 /> */}
    //     {/* Main */}
    //   </Box>
    //   <Flex>
    //     <Divider color="#fff"></Divider>
    //     <Box p={5} color="#FFF" textAlign="left" w="20%">
    //       <ul>
    //         {categories.map((category) => (
    //           <li>z</li>
    //           // <li>{category.slug}</li>
    //         ))}
    //       </ul>
    //     </Box>
    //     <Box ml="60%" mt="120px">
    //       <Router>
    //         <Route exact path="/home/new-element" component={LoginPage}></Route>

    //         <Route
    //           exact
    //           path="/home/new-element"
    //           render={(props) => (
    //             <NewElementPage
    //               {...props}
    //               // loggedInStatus={loggedInStatus}
    //               // handleLogout={handleLogout}
    //             />
    //           )}
    //         />
    //         <Router
    //           exact
    //           path="/home/profile"
    //           render={(props) => (
    //             <Profile
    //               {...props}
    //               // loggedInStatus={loggedInStatus}
    //               // handleLogout={handleLogout}
    //             />
    //           )}
    //         />
    //       </Router>
    //     </Box>
    //   </Flex>
    // </Flex>
  );
};
