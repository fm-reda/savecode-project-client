import React, { useContext } from "react";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
  Button,
  PseudoBox,
  Avatar,
  Icon,
  Spinner,
  Link,
} from "@chakra-ui/core";
import { NavLink, Redirect } from "react-router-dom";
import Logo from "./../../images/Logo/logo5white.png";
import { useEffect } from "react";
import { getCategories } from "../Category/CategoryFunctions";
import { useState } from "react";
import Navbar2 from "../Navbar2";
import user from "./../../images/Logo/newuser.png";
import element from "./../../images/Logo/code.jpg";
import library from "./../../images/Logo/library.png";
import categoryLogo from "./../../images/Logo/categoryLogo.png";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import NewElementPage from "./NewElementPage";
import { LoginPage } from "./LoginPage";
import Profile from "../Not-use/Profile1";
import GetStarted from "../GetStarted";
import { getStat } from "./../ElementFunctions";
import { LogStatusContext } from "../../App";

export const Home = () => {
  const rendering = useContext(LogStatusContext);

  const [categories, setCategories] = useState([]);
  const [elements, setElements] = useState([]);
  const [customs, setCustoms] = useState([]);
  const [countUser, setCountUser] = useState("");
  const [countElement, setCountElement] = useState("");
  const [elementsUser, setElementsUser] = useState([]);
  const [countCustom, setCountCustom] = useState("");
  const [countCategory, setCountCategory] = useState("");
  const [requestStatus, setRequestStatus] = useState(true);
  useEffect(() => {
    rendering();
    setRequestStatus(true);

    getStat().then((res) => {
      if (res && res.status == 200) {
        setElements(res.data.elements);
        setElementsUser(res.data.elementsUser);
        setCustoms(res.data.customs);
        setCountUser(res.data.countUser);
        setCountElement(res.data.countElement);
        setCountCustom(res.data.countCustom);
        setCountCategory(res.data.countCategory);
        setRequestStatus(false);
        // const date1 = new Date(res.data.elements[0].created_at);
        // const date2 = new Date(res.data.elements[1].created_at);
        // const date3 = new Date(res.data.elements[2].created_at);
        // const dates = res.data.elements.map((item) => {
        //   // console.log(item.created_at);
        //   item.created_at;
        // });
        // console.log()
        //   if (date1 > date2) {
        //     console.log("date1");
        //     console.log(date1)
        //     console.log(date2)
        //     console.log(date3)
        //   } else console.log("date2");
      }
    });
  }, []);
  const handleElement = () => {};

  return (
    <>
      {!localStorage.userToken ? (
        <Redirect to="/" />
      ) : (
        <Stack ml="15%" mt="4.1%" bg="bgGray" minH="100vh" pb="400px">
          {requestStatus ? (
            <Flex justifyContent="center" align="center" mt="250px">
              <Box>
                <Heading color="myYellow" mb={3}>
                  Welcome, please wait...
                </Heading>
                <Flex justifyContent="center">
                  <Spinner
                    textAlign="center"
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="100px"
                  />
                </Flex>
              </Box>
            </Flex>
          ) : (
            // <Skeleton colorStart="#fff" colorEnd="#CCC" height="50px" mb={5} />
            <Flex
              justifyContent="space-between"
              p="25px"
              mt="50px"
              // mx="auto"
            >
              {/* ************************************************************ welcome */}
              <Box mr="40px" flex="3">
                <Box rounded="md" shadow="lg" bg="#fff" p={5} mb={5}>
                  <Heading color="myBlue">Welcome {localStorage.name}</Heading>
                  <Box fontSize="25px" lineHeight="60px" p={2}>
                    <Text>
                      <Icon
                        name="check-circle"
                        size="24px"
                        color="myYellow"
                        mr={3}
                      />
                      You can create elements
                    </Text>
                    <Text>
                      <Icon
                        name="check-circle"
                        size="24px"
                        color="myYellow"
                        mr={3}
                      />
                      Search elements from other member's
                    </Text>
                    <Text>
                      <Icon
                        name="check-circle"
                        size="24px"
                        color="myYellow"
                        mr={3}
                      />
                      Add element to your library
                    </Text>
                  </Box>
                </Box>
                {/* ************************************************************ Recent activities */}

                <Box bg="#FFF" shadow="lg" rounded="md" p={5}>
                  <Heading color="myBlue" mb={3}>
                    Recent activities
                  </Heading>
                  <Box fontSize="20px" p={3}>
                    {elementsUser.map((item, i) => {
                      return (
                        <>
                          <Text>
                            <Icon
                              name="info"
                              size="24px"
                              mr={3}
                              color="myYellow"
                            />
                            {item.created_at}
                            <Icon
                              name="minus"
                              size="10px"
                              color="myYellow"
                              mx={4}
                            />{" "}
                            Element
                            <Link color="teal.500" href="#">
                              <NavLink to={`/element/single/${item.id}`}>
                                <Box
                                  mx={2}
                                  as="span"
                                  color="myYellow"
                                  textTransform="uppercase"
                                  fontSize="20px"
                                >
                                  {item.title}
                                </Box>
                              </NavLink>
                            </Link>
                            has been created.
                          </Text>
                        </>
                      );
                    })}
                  </Box>
                </Box>
              </Box>
              {/* ************************************************************ Latest element */}
              <Box mx="auto" flex="2">
                <Box rounded="md" shadow="lg" bg="#FFF" p={5} mb={5}>
                  {/* ************************************************************Section stats ligne1 */}

                  <Flex mb={5}>
                    <Flex
                      flex="1"
                      justifyContent="center"
                      alignItems="center"
                      mx="auto"
                    >
                      <Avatar
                        size="lg"
                        mr={4}
                        name=""
                        src={`${user}`}
                      />
                      <Box textAlign="center">
                        <Heading fontSize="30px">{countUser}</Heading>
                        <Text color="gray.400">Users</Text>
                      </Box>
                    </Flex>

                    <Flex
                      flex="1"
                      justifyContent="center"
                      alignItems="center"
                      mx="auto"
                    >
                      <Avatar
                        size="lg"
                        mr={4}
                        name=""
                        src={`${element}`}
                      />
                      <Box textAlign="center">
                        <Heading fontSize="30px">{countElement}</Heading>
                        <Text color="gray.400">Elements</Text>
                      </Box>
                    </Flex>
                  </Flex>
                  {/* ************************************************************Section stats ligne 2 */}
                  <Flex>
                    <Flex
                      flex="1"
                      justifyContent="center"
                      alignItems="center"
                      mx="auto"
                    >
                      <Avatar
                        size="lg"
                        mr={4}
                        name=""
                        src={`${library}`}
                      />
                      <Box textAlign="center">
                        <Heading fontSize="30px">{countCustom}</Heading>
                        <Text color="gray.400">Library</Text>
                      </Box>
                    </Flex>

                    <Flex
                      flex="1"
                      justifyContent="center"
                      alignItems="center"
                      mx="auto"
                    >
                      <Avatar
                        size="lg"
                        mr={4}
                        name=""
                        src={`${categoryLogo}`}
                      />
                      <Box textAlign="center">
                        <Heading fontSize="30px">{countCategory}</Heading>
                        <Text color="gray.400">Categories</Text>
                      </Box>
                    </Flex>
                  </Flex>

                  {/* ************************************************************ end stats */}
                </Box>

                <Box rounded="md" shadow="lg" bg="#fff" p={5} mb={5}>
                  <Heading mb={5} color="myBlue">
                    Latest Elements
                  </Heading>
                  {elements.map((item, i) => {
                    return (
                      <>
                        <NavLink key={i} to={`/element/single/${item.id}`}>
                          <PseudoBox
                            pos="relative"
                            key={i}
                            rounded="md"
                            // height="250px"
                            shadow="lg"
                            p={3}
                            bg="#fff"
                            // width="430px"
                            // width="30%"
                            mb="20px"
                            mx={3}
                            onClick={handleElement}
                            _hover={{
                              borderColor: "myYellow",
                              bg: "#ff9e0069",
                              // bg: "#fff6e7",
                              color: "#000",
                              shadow: "lg",
                              cursor: "pointer",
                              // marginBottom: "10px",
                            }}
                            // width="100%"
                          >
                            {/* {item.customs.length && <Owned />} */}

                            <Flex
                              direction="column"
                              justifyContent="space-between"
                              h="100%"
                            >
                              <Box>
                                <Flex
                                  align="center"
                                  mb={3}
                                  justifyContent="space-between"
                                >
                                  <Flex>
                                    <Avatar
                                      fontSize="50px"
                                      mr={2}
                                      name=""
                                      src={`http://localhost:8000/storage/users/${item.user.avatar}`}
                                    />
                                    <Text fontSize="20px" color="#007bff" m={3}>
                                      {/* {localStorage.name === creator ? "You" : creator} */}
                                      {item.user.id == localStorage.user_id
                                        ? "You"
                                        : item.user.name}
                                    </Text>
                                  </Flex>
                                  <Box>
                                    <Text color="gray.400">
                                      {item.created_at.substring(0, 10)}
                                    </Text>
                                  </Box>
                                </Flex>
                                <Divider />
                                <Flex justifyContent="space-between">
                                  <Heading fontSize="20px" mb={2}>
                                    {item.title.substring(0, 30) +
                                      (item.title.length > 29 ? "..." : "")}
                                    {/* Title */}
                                  </Heading>
                                  {/* <Text size="md">
                              {item.default_category.title}
                              </Text> */}
                                  <Box
                                    p={1}
                                    rounded="md"
                                    // color="#FFF"
                                    // color="gray.400"
                                    // bg={`${item.default_category.slug}`}
                                  >
                                    {item.default_category.title}
                                    {/* category */}
                                  </Box>
                                </Flex>

                                {/* <Flex justifyContent="space-between">
                              <Text color="gray.400">
                                {item.default_category.title}
                              </Text>
                              <Text color="gray.400">
                                {item.created_at.substring(0, 10)}
                              </Text>
                            </Flex> */}
                              </Box>
                              {/* 
                          <Flex justifyContent="center">
                            <Link to={`/custom/single/${item.id}`}>
                              <Button
                                color="#FFF"
                                mx="auto"
                                //   onClick={handleClick}
                                bg="myYellow"
                                _hover={{
                                  bg: "#fff",
                                  color: "myYellow",
                                }}
                              >
                                View
                              </Button>
                            </Link>
                          </Flex> */}
                            </Flex>
                          </PseudoBox>
                        </NavLink>
                      </>
                    );
                  })}
                </Box>
                {/* ************************************************************Section Stats */}
              </Box>
            </Flex>
          )}
        </Stack>
      )}
    </>
  );
};
