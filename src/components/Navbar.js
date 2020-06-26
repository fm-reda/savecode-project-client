import React, { useState } from "react";
import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Link,
  Avatar,
} from "@chakra-ui/core";
import { NavLink, Redirect } from "react-router-dom";
import "../App.css";
const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);
const LinkLogin = ({ children }) => (
  <>
    <NavLink to="/register">
      <Button
        mr={2}
        bg="transparent"
        border="1px"
        _hover={{ bg: "blue.500", color: " white" }}
      >
        Create account
      </Button>
    </NavLink>
    <NavLink to="/Login">
      <Button
        mr={2}
        bg="transparent"
        border="1px"
        _hover={{ bg: "blue.500", color: " white" }}
      >
        Login
      </Button>
    </NavLink>
  </>
);

const Navbar = (props) => {

  // console.log(props.location.pathname);
  const { loggedInStatus, handleLogout } = props;
  const [show, setShow] = React.useState(false);
  const [local, setLocal] = useState("");
  const handleToggle = () => setShow(!show);
  const handlClick = () => {
    localStorage.setItem("userToken", "");
    // setLocal("test");
    return <Redirect to={"/login"} />;
  };
  const LinkLogout = () => (
    <Flex align="center">
      <NavLink to="/">
        <Button
          mr={2}
          bg="transparent"
          border="1px"
          _hover={{ bg: "red.500", color: " white" }}
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </Button>
      </NavLink>
      <Avatar
        fontSize="50px"
        mr={2}
        name="Dan Abrahmov"
        src={`http://localhost:8000/storage/${localStorage.getItem("avatar")}`}
      />
      <Text
        textTransform="uppercase"
        fontSize="15px"
        fontWeight="500"
        color="teal.500"
      >
        {localStorage.getItem("name")}
      </Text>
    </Flex>
  );

  return (
    // <Flex
    //   bg="black"
    //   w="100%"
    //   h={200}
    //   d="flex"
    //   color="white"
    //   justify="space-between"
    // >
    //   <Box>
    //     <Heading>SAVE</Heading>
    //   </Box>
    //   <Heading>Login</Heading>
    //   <Heading>Login</Heading>

    //   <Box>
    //     <Heading>Login</Heading>
    //     <Heading>Login</Heading>
    //     <Heading>Login</Heading>
    //   </Box>
    // </Flex>
    <Flex
      zIndex="1"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="#ffffff"
      color="black"
      pos="fixed"
      w="100%"
      boxShadow="lg"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-0.1rem"}>
          <NavLink to="/"> SaveCode</NavLink>
        </Heading>
      </Flex>

      <Box display={{ sm: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="black"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems>
          <NavLink to="/upload">
            <Box
              className={props.location.pathname === "/upload" ? "current" : ""}
              p={2}
              rounded="md"
            >
              upload
            </Box>
          </NavLink>
        </MenuItems>
        <MenuItems>
          <NavLink to="/manage">
            <Box
              className={props.location.pathname === "/manage" ? "current" : ""}
              p={2}
              rounded="md"
            >
              Manage
            </Box>
          </NavLink>
        </MenuItems>
        <MenuItems>
          <NavLink to="/profile">
            <Box
              className={
                props.location.pathname === "/profile" ? "current" : ""
              }
              p={2}
              rounded="md"
            >
              Profile
            </Box>
          </NavLink>
        </MenuItems>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
        pr="150px"
      >
        {localStorage.userToken === "" ? <LinkLogin /> : <LinkLogout />}

        {/* <NavLink to="/register">
          <Button mr={2} bg="transparent" border="1px">
            Create account
          </Button>
        </NavLink>
        <NavLink to="/Login">
          <Button mr={2} bg="transparent" border="1px">
            Login
          </Button>
        </NavLink> */}

        {/* <Button mr={2} bg="transparent" border="1px">
          Logout
        </Button> */}

        {/* <Button bg="transparent" border="1px">
          <NavLink to="/login">Login</NavLink>
        </Button> */}
      </Box>
    </Flex>
  );
};

export default Navbar;
