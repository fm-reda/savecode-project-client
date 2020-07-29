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
} from "@chakra-ui/core";
import { Redirect } from "react-router-dom";
import { getCategories } from "./../Category/CategoryFunctions";

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
        console.log("autorisation");
        // localStorage.setItem('userToken',"")
      }
    });
  }, []);
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
              // * *****************************************************************categories MAPPING */}

              <Box>
                <Heading>List of categories</Heading>
                <Flex>
                  <Stack isInline shouldWrapChildren={true} flexWrap="wrap">
                    {categories.map((item, i) => (
                      <PseudoBox
                        mb={2}
                        border="1px"
                        key={i}
                        fontSize="20px"
                        w="250px"
                        pos="relative"
                      >
                        <Box bg="greenColor" color="#fff" p={5}>
                          {item.title}
                        </Box>
                        <Flex pos="absolute" top="0" right="0">
                          <PseudoBox
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
                            <Icon name="close" size="20px" color="red.400" />
                          </PseudoBox>
                        </Flex>
                      </PseudoBox>
                    ))}
                  </Stack>
                  {/* <Box>List of sub categpories</Box> */}
                </Flex>
              </Box>
            )}
          </Box>
        </Stack>
      )}
    </>
  );
};
