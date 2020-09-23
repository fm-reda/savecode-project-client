import React, { useState, useEffect } from "react";
import {
  Stack,
  Box,
  Heading,
  Flex,
  Spinner,
  PseudoBox,
  Button,
  Icon,
  Text,
  SimpleGrid,
} from "@chakra-ui/core";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
  Link,
  useRouteMatch,
  NavLink,
} from "react-router-dom";
import { getCategories } from "./../Category/CategoryFunctions";
import { SingleCategoryPage } from "../Category/SingleCategoryPage";
import { LoginPage } from "./LoginPage";

export const GestionCategories = () => {
  const [categories, setCategories] = useState([]);
  const [requestStatusCategories, setRequestStatusCategories] = useState(true);
  useEffect(() => {
    setRequestStatusCategories(true);
    getCategories().then((res) => {
      if (res && res.status === 200) {
        setCategories(res.data.success.categories);
        setRequestStatusCategories(false);
        //   console.log(res);
        // console.log(res.status);
        // setCategories(res.data.success.categories);
      } else if (res && res.status === 401) {
        // console.log("autorisation");
        // localStorage.setItem('userToken',"")
      }
    });
  }, []);
  let { path, url } = useRouteMatch();
  // console.log(path);
  // console.log(url);
  return (
    <>
      {!localStorage.userToken ? (
        <Redirect to="/login" />
      ) : (
        // ********************************************************************* FRAME
        <Stack ml="15%" mt="5%" p={5} bg="bgGray" className="" h="100vh">
          {/* ********************************************************************* Container */}

          <Box
            bg="#FFF"
            p={5}
            rounder="lg"
            shadow="lg"
            w="90%"
            mt="50px"
            mx="auto"
          >
            {requestStatusCategories ? (
              <Flex
                justifyContent="center"
                h="50vh"
                align="center"
                // pt="50px"
                bg="#FFF"
              >
                {/* ***************************************************************** Spinner */}

                <Box>
                  <Heading color="myYellow" mb={3}>
                    Searching Categories, Please wait...
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
              <>
                {/* *****************************************************************categories MAPPING */}
                <Box>
                  <Heading mb={5}>List of categories</Heading>

                  <SimpleGrid
                    // minChildWidth="30%"
                    columns={3}
                    spacing="20px"
                  >
                    {categories.map((item, i) => (
                      <PseudoBox
                        flex="1"
                        mb={2}
                        border="1px"
                        key={i}
                        fontSize="20px"
                        pos="relative"
                        shouldWrapChildren={true}
                        flexWrap="wrap"
                      >
                        <Flex
                          bg="greenColor"
                          color="#fff"
                          p={2}
                          justifyContent="space-between"
                          align="center"
                        >
                          <Text fontSize="30px">
                            {item.title.substring(0, 11) +
                              (item.title.length > 11 ? "..." : "")}
                          </Text>

                          <Flex align="center">
                            <Box mr={3}>Sub category</Box>
                            <Box
                              px={2}
                              as="span"
                              bg="myYellow"
                              color="#fff"
                              rounded="full"
                              // w="30px"
                              // h="30px"
                            >
                              {item.sub_categories.length}
                            </Box>
                          </Flex>
                        </Flex>
                        <Flex justifyContent="center" p={2}>
                          <NavLink
                            to={`/gestion-categories/${item.title}/${item.id}`}
                          >
                            <Button
                              variantColor="teal"
                              variant="outline"
                              _hover={{ bg: "#56797430", color: "" }}
                            >
                              View
                            </Button>
                          </NavLink>
                        </Flex>
                        {/* ****************************************************************************** Absolut button */}
                        {/* <Flex pos="absolute" top="0" right="0">
                          <PseudoBox
                            mr={3}
                            _hover={{
                              borderColor: "myYellow",
                              // bg: "#ff9e0069",
                              // bg: "#fff6e7",
                              color: "#000",
                              shadow: "lg",
                              cursor: "pointer",
                              // marginBottom: "10px",
                            }}
                          >
                            <Icon name="edit" size="25px" color="#fff" />
                          </PseudoBox>
                          <PseudoBox
                            borderRadius="50px"
                            bg="red.500"
                            _hover={{
                              borderColor: "myYellow",
                              // bg: "#ff9e0069",
                              // bg: "#fff6e7",
                              color: "#000",
                              shadow: "lg",
                              cursor: "pointer",
                              // marginBottom: "10px",
                            }}
                          >
                            <Icon name="close" size="20px" color="#fff" />
                          </PseudoBox>
                        </Flex> */}
                      </PseudoBox>
                    ))}
                  </SimpleGrid>
                </Box>

                {/* * *****************************************************************END categories MAPPING */}
                {/* <Switch>
                  <Route path={`${path}/:category/:category_id`}>
                    <SingleCategoryPage />
                  </Route>
                </Switch> */}
                <Box>
                  {/* <Router> */}
                  {/* <Router>
                    <Route
                      // path={`gestion-categories/:category/:category_id`}
                      exact
                      path="/gestion-categories/:category/:category_id"
                      render={(props) => (
                        <LoginPage
                          {...props}
                          // handleLogin={handleLogin}
                          // loggedInStatus={loggedInStatus}
                        />
                      )}
                    />
                  </Router> */}
                  {/* </Router> */}
                </Box>
              </>
              // {/* * *****************************************************************END requestStatus*/}
            )}
          </Box>
        </Stack>
      )}
    </>
  );
};
