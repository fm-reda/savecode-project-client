import React, { useState, useContext } from "react";
import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Avatar,
  Divider,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionIcon,
  AccordionPanel,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  InputGroup,
  InputLeftElement,
  Input
} from "@chakra-ui/core";
// import { Button1 } from "react-bootstrap";

// import { triangle-down } from "react-icons/md"
import {
  NavLink,
  Redirect,
  Router,
  Route,
  useRouteMatch,
  Link
} from "react-router-dom";
import Logo from "./../images/Logo/logo5white.png";
import "../App.css";
import { categoriesContext } from "../App";
import { useEffect } from "react";
import { LoginPage } from "./pages/LoginPage";
import NewElementPage from "./pages/NewElementPage";
import Profile from "./Not-use/Profile1";
import { getCategories } from "./Category/CategoryFunctions";
import SingleCustom from "./Custom-element/SingleCustom";
const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);
const LinkLogin = ({ children }) => (
  <>
    <NavLink to="/Login">
      {/* <Button1 variant="primary">Primary</Button1>{" "} */}
      <Button
        color="#000"
        mr={2}
        bg="#f1f1f1"
        variantColor="#000"
        rounded="30px"
        _hover={{ bg: "blue.500", color: " white" }}
      >
        Log in
      </Button>
    </NavLink>
    <Link to="/register">
      <Button
        mr={2}
        bg="#ff9e00"
        // border="1px"
        rounded="30px"
        // variantColor="#ff9e00"
        _hover={{ bg: "#66709b", color: " white" }}
      >
        Sign Up
      </Button>
    </Link>
  </>
);

const Navbar2 = props => {
  // const categoriesProps = useContext(categoriesContext);
  const { categoriesProps } = props;

  // if (categoriesProps == "") {
  //   console.log("no categories");
  // } else console.log("jat");
  // console.log(categoriesProps);
  const [search, setSearch] = useState("");

  setTimeout(() => {
    // console.log(categoriesProps.success.categories);
  }, 10000);
  const { rendering } = props;
  const [renderNavbar, setRenderNavbar] = useState(false);
  // console.log("navbar22222222222222");

  // setRenderNavbar(true);
  // console.log(props);

  // console.log(props.location.pathname);
  const { loggedInStatus, handleLogout } = props;
  // console.log(loggedInStatus);
  const [show, setShow] = React.useState(false);
  // const [url, setUrl] = useState("");
  const [categories, setCategories] = useState([]);

  const handleToggle = () => setShow(!show);
  useEffect(() => {
    // if (!categoriesProps == undefined) {
    //   if (!categoriesProps.success == "") {
    //     console.log("effect");
    //     setCategories(categoriesProps.success.categories);
    //   }
    // }

    if (!categoriesProps.success == "") {
      // console.log("effect");
      setCategories(categoriesProps.success.categories);
    }

    // console.log(categoriesProps.success);
    // setCategoriesTab(categoriesProps.success.categories);
    // rendering();
    // getCategories().then((res) => {
    //   if (res) {
    //     setCategories(res.data.success.categories);
    //   }
    //   // console.log(res);
    //   // console.log(res);
    // });
  }, [rendering]);

  const LinkLogout = () => (
    <Flex align="center">
      {/* <NavLink to="/login">
        <Button
          mr={2}
          bg="#fff"
          border="1px"
          rounded="30px"
          variantColor="myYellow"
          color="#000"
          _hover={{ bg: "#b09e50", color: " white" }}
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </Button>
      </NavLink> */}
      <Menu>
        <MenuButton
          color="#000"
          p="5px"
          pl="20px"
          transition="all 0.2s"
          rounded="50px"
          // _hover={{ bg: "#14a3e8" }}
          _expanded={{ bg: "#14a3e8" }}
          _focus={{
            outline: 0
            //  boxShadow: "outline"
          }}
        >
          <Avatar
            fontSize="50px"
            mr={2}
            name=""
            src={`${process.env.REACT_APP_URL}storage/${localStorage.getItem(
              "avatar"
            )}`}
          />
          <Icon name="triangle-down" size="15px" mt="18px" color="white" />
        </MenuButton>
        <MenuList fontSize="20px" color="#000" bg="#fff" mr={5}>
          <MenuItem>
            <NavLink to="/profile">{localStorage.getItem("name")}</NavLink>
          </MenuItem>
          {/* <MenuItem>New Window</MenuItem> */}
          {/* <MenuDivider /> */}
          {/* <MenuItem>Open...</MenuItem> */}
          <MenuDivider />
          <MenuItem>
            <NavLink
              to="/login"
              onClick={() => {
                handleLogout();
              }}
            >
              Log out
            </NavLink>
          </MenuItem>
        </MenuList>
      </Menu>
      {/* <Avatar
        fontSize="50px"
        mr={2}
        name="Dan Abrahmov"
        src={`http://localhost:8000/storage/${localStorage.getItem("avatar")}`}
      />
      <Icon name="triangle-down" size="15px" />
      <Text fontSize="15px" fontWeight="500" color="gray.500">
        {localStorage.getItem("name")}
      </Text> */}
    </Flex>
  );
  const handleKeyPress = e => {
    if (e.charCode == 13) {
      // setSearch(e.target.value);
      handleSubmit(e);
    }
    // console.log(e.target.value);
  };
  const handleChange = e => {
    // event.preventDefault();t
    // if (e.keyCode === 13) {
    //   console.log(e.target.value);
    // }
    // console.log(e.target.value);
    setSearch(e.target.value);
  };
  const handleSubmit = e => {
    // e.preventDefault();
    // console.log(search);
    props.history.push("/search/element/" + search);
  };
  // let { path, url } = useRouteMatch();

  return (
    // ******************************************************sidebar
    <Flex>
      <Box
        h="100vh"
        // h="300px"
        overflowY="auto"
        bg="myBlue"
        w="15%"
        pos="fixed"
        shadow="lg"
        borderColor="myYellow"
        border="1px"
      >
        {/* // ************************************************ Logos */}
        <NavLink to="/home">
          {" "}
          <Box
            // border="1px"
            pt="95px"
            mx="auto"
            bgImage={`url('${Logo}')`}
            bgPos="center"
            bgSize="90%"
            bgRepeat="no-repeat"
            w="200px"
            h="10px"
            // h="40px"
            color="#FFF"
          ></Box>
        </NavLink>
        <Flex>
          <Divider color="#fff" />
          {/* *************************************************Deroulant */}
          <Box color="#FFF" w="100%" mb="100px">
            <Accordion allowToggle w="100%" mt={2}>
              {categories.map((category, i) => {
                // _expanded={{ bg: "myYellow", color: "white" }}
                return (
                  <>
                    <AccordionItem key={i} bg="">
                      <AccordionHeader
                        _hover={{ bg: "#124154", color: "" }}
                        _focus={{ borderColor: "myYellow" }}
                      >
                        <Box flex="1" textAlign="left">
                          {category.title} ({category.sub_categories.length})
                        </Box>
                        <AccordionIcon />
                      </AccordionHeader>

                      {category.sub_categories.map((item, j) => {
                        return (
                          <>
                            {/* <Link to={`${url}/${category.slug}/${item.slug}`}> */}
                            {/* <Link to={`/test}`}>
                              <AccordionPanel bg="#fff" p={0}>
                                <Button
                                  color="#333"
                                  w="100%"
                                  bg="#fff"
                                  _active={{
                                    bg: "#C4C4C4",
                                    transform: "scale(0.98)",
                                    borderColor: "#000",
                                  }}
                                  _focus={{
                                    bg: "#F2F2F2",
                                    transform: "scale(0.98)",
                                    borderColor: "myYellow",
                                  }}
                                  _hover={{ bg: "myYellow", color: "" }}
                                >
                                  {item.title} ({item.customs.length})
                                </Button>
                              </AccordionPanel>
                            </Link> */}

                            <NavLink
                              key={j}
                              to={`/custom/${category.slug}/${item.slug}`}
                            >
                              <AccordionPanel bg="#fff" p={0}>
                                <Button
                                  color="#333"
                                  w="100%"
                                  bg="#fff"
                                  _active={{
                                    bg: "#C4C4C4",
                                    transform: "scale(0.98)",
                                    borderColor: "#000"
                                  }}
                                  _focus={{
                                    bg: "#F2F2F2",
                                    transform: "scale(0.98)",
                                    borderColor: "myYellow"
                                  }}
                                  _hover={{ bg: "myYellow", color: "" }}
                                >
                                  {item.title} ({item.customs.length})
                                </Button>
                              </AccordionPanel>
                            </NavLink>
                          </>
                        );
                      })}
                    </AccordionItem>
                    {/* <Route path={`/:category`}>
                      <SingleCustom />
                    </Route> */}
                    {/* <Route
                      exact
                      path="/:category/:subCategory"
                      render={(props) => (
                        <SingleCustom
                          {...props}
                          // loggedInStatus={loggedInStatus}
                          // handleLogout={handleLogout}
                        />
                      )}
                    /> */}
                  </>
                );
              })}
            </Accordion>
          </Box>
        </Flex>
      </Box>
      <Box>
        {/* ********************************************************* navbar design */}
        <Flex
          ml="15%"
          zIndex="2"
          as="nav"
          align="center"
          justify="space-between"
          wrap="wrap"
          padding="1.5rem"
          bg="firebase"
          color="#fff"
          pos="fixed"
          w="85%"
          boxShadow="lg"
          {...props}
        >
          <Flex align="center" mr={5}>
            <Heading as="h1" size="lg" letterSpacing={"-0.1rem"}>
              {/* <NavLink to={`/${url}`}>
            {" "}
            <Box
              bgImage={`url('${Logo}')`}
              bgPos="center"
              bgSize="100%"
              bgRepeat="no-repeat"
              w="200px"
              h="60px"
            ></Box>
          </NavLink> */}
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
            {/* <MenuItems>
          <NavLink to="/upload">
            <Box
              className={props.location.pathname === "/upload" ? "current" : ""}
              p={2}
              rounded="md"
            >
              upload
            </Box>
          </NavLink>
        </MenuItems> */}
            <MenuItems>
              <NavLink to="/">
                <Box
                  className={props.location.pathname === "/" ? "current" : ""}
                  p={2}
                  rounded="md"
                >
                  Home
                </Box>
              </NavLink>
            </MenuItems>
            <MenuItems>
              <NavLink to="/new-element">
                <Box
                  className={
                    props.location.pathname === "/new-element" ? "current" : ""
                  }
                  p={2}
                  rounded="md"
                >
                  New Element
                </Box>
              </NavLink>
            </MenuItems>
            <MenuItems>
              <NavLink to="/gestion-categories">
                <Box
                  className={
                    props.location.pathname === "/gestion-categories"
                      ? "current"
                      : ""
                  }
                  p={2}
                  rounded="md"
                >
                  Categories
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
            {/* ************************************************ Search bar  */}
            <Flex
              ml="80px"
              //  bg="#fff"
            >
              <Input
                color="#000"
                w="300px"
                type="phone"
                placeholder="Search"
                rounded="0"
                roundedLeft="md"
                onChange={e => handleChange(e)}
                onKeyPress={handleKeyPress}
              />
              <Button
                bg="myYellow"
                roundedLeft="0"
                onClick={e => handleSubmit(e)}
              >
                <Icon name="search" color="#000" />
              </Button>
            </Flex>
            {/* <InputGroup>
                <InputLeftElement
                  children={<Icon name="search" color="gray.300" />}
                />
              </InputGroup> */}
          </Box>

          <Box
            display={{ sm: show ? "block" : "none", md: "block" }}
            mt={{ base: 4, md: 0 }}
            pr="20px"
          >
            {localStorage.userToken === "" ? <LinkLogin /> : <LinkLogout />}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Navbar2;
{
  /* <Accordion allowToggle w="100%">
              <AccordionItem bg="">
                <AccordionHeader
                  // _expanded={{ bg: "myYellow", color: "white" }}
                  _hover={{ bg: "#124154", color: " white" }}
                >
                  <Box flex="1" textAlign="left">
                    Categories
                  </Box>
                  <AccordionIcon />
                </AccordionHeader>
                <NavLink to="/lara/migration">
                  <AccordionPanel bg="" p={0}>
                    <Button
                      w="100%"
                      bg="#"
                      _hover={{ bg: "#124154", color: " white" }}
                    >
                      subCategorie1
                    </Button>
                  </AccordionPanel>
                </NavLink>
                <NavLink to="/react/dodo">
                  <AccordionPanel bg="" p={0}>
                    <Button
                      w="100%"
                      bg="#"
                      _hover={{ bg: "#124154", color: " white" }}
                    >
                      subCategorie1
                    </Button>
                  </AccordionPanel>
                </NavLink>
                <NavLink to="/subCategorie1">
                  <AccordionPanel bg="" pl={6} p={0}>
                    <Button
                      w="100%"
                      bg="#"
                      _hover={{ bg: "#124154", color: " white" }}
                    >
                      subCategorie1
                    </Button>
                  </AccordionPanel>
                </NavLink>
              </AccordionItem>
            
              <AccordionItem
              // onChange={() => {
              //   console.log("test");
              // }}
              >
                <AccordionHeader>
                  <Box flex="1" textAlign="left">
                    Section 2 title
                  </Box>
                  <AccordionIcon />
                </AccordionHeader>
                <AccordionPanel pb={4}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionPanel>
              </AccordionItem>
            </Accordion> */
}
{
  /* <Router>
  <Route
    exact
    path="/new-element"
    component={LoginPage}
  ></Route>

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
  <Router
    exact
    path="/profile"
    render={(props) => (
      <Profile
        {...props}
        // loggedInStatus={loggedInStatus}
        // handleLogout={handleLogout}
      />
    )}
  />
</Router> */
}
