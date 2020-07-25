import React, { useState } from "react";
import {
  Stack,
  Box,
  Heading,
  Flex,
  Text,
  Divider,
  Button,
  PseudoBox,
} from "@chakra-ui/core";
import { useEffect } from "react";
import { customBycategory } from "./CustomFunctions";
import "./../../App.css";
import { Link, NavLink } from "react-router-dom";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { SingleCustomPage } from "../pages/SingleCustomPage";

const SingleCustom = (props) => {
  // console.log(props);
  const { category, subCategory } = props.match.params;
  // console.log(category);
  // console.log(subCategory);
  const [customs, setCustoms] = useState([]);
  const [showCode, setShowCode] = useState(false);
  // console.log(category, subCategory);
  useEffect(() => {
    // console.log("test");
    customBycategory({ category: category, subCategory: subCategory }).then(
      (res) => {
        if (res.status === 200) {
          console.log(res);
          setCustoms(res.data.success.customs);
          // console.log(res.data.success.customs);
        } else if (res.status === 205) {
          console.log("category not found");
          setCustoms([]);
        } else if (res.status === 206) {
          console.log("subcategory not found");
          setCustoms([]);
        } else if (res.status === 207) {
          console.log("custom not found");
          setCustoms([]);
        }

        // console.log(res.data.success.customs);
      }
    );
  }, [subCategory, category]);
  // const handleHover = (e) => {
  //   // console.log(e.element.code);
  //   setTimeout(() => {
  //     setShowCode(e.element.id);
  //   }, 1000);
  //   setShowCode(false);
  // };
  // const handleMouseLeave = () => {
  //   setShowCode(false);
  // };
  const handleClick = () => {
    // console.log("clicked");
  };
  return (
    <Stack ml="15%" mt="4%" p={5} bg="bgGray" minH="710px" className="">
      <Box mx="auto" w="100%">
        <Box
          p={5}
          // mx="auto"
          // h="150px"
          // bg="#000"
          bg="#fff"
          // w="110%"
          // ml="-20px"
          mt="4%"
          // mt={5}
          color="#000"
          rounded="lg"
        >
          <Heading fontSize="30px" textTransform="uppercase">
            Category : {category}
          </Heading>
          <Heading color="myYellow" fontSize="25px">
            {subCategory}
          </Heading>
        </Box>
        {/* <Divider borderColor="red"></Divider> */}
        {/* <Flex>
        {customs.map((item) => {
          return (
            <>
              <Box key={item.id} w="600px" h="200px" border="1px" m={5} p={3}>
                <Heading>{item.element.title}</Heading>
                <Text>{item.element.description}</Text>
                <Text>{item.element.code}</Text>
              </Box>
            </>
          );
        })}
      </Flex> */}

        <Stack
          // justifyContent="center"
          align="center"
          mt="3%"
          bg="bgGray"
          // minH="100vh"
          className=""
          isInline
          // width="1430px"
          // w="100%"

          shouldWrapChildren={true}
          flexWrap="wrap"
        >
          {customs.map((item, i) => {
            return (
              <>
                <PseudoBox
                  key={i}
                  rounded="md"
                  height="200px"
                  shadow="lg"
                  p={3}
                  bg="#fff"
                  width="430px"
                  // width="30%"
                  mb={5}
                  mx={3}
                  _hover={{
                    borderColor: "myYellow",
                    bg: "myBlue",
                    color: "white",
                  }}
                  // width="100%"
                >
                  <Flex
                    direction="column"
                    justifyContent="space-between"
                    h="100%"
                  >
                    <Box>
                      <Heading fontSize="20px">
                        {" "}
                        {item.element.title.substring(0, 30) +
                          (item.element.title.length > 29 ? "..." : "")}
                      </Heading>
                      <Divider></Divider>
                      <Box>
                        {item.element.description.substring(0, 80) +
                          (item.element.description.length > 80 ? "..." : "")}
                      </Box>
                    </Box>
                    <Flex justifyContent="center">
                      <Link to={`/custom/single/${item.element_id}`}>
                        <Button
                          color="#FFF"
                          mx="auto"
                          onClick={handleClick}
                          bg="myYellow"
                          _hover={{
                            bg: "#fff",
                            color: "myYellow",
                          }}
                        >
                          View
                        </Button>
                      </Link>
                    </Flex>
                  </Flex>
                </PseudoBox>
              </>
            );
          })}
        </Stack>
      </Box>
      {/* **************************************************************************** stack original */}

      {/* <Stack
        // bg="#fff"
        ml=""
        mt="30px"
        // maxWidth="3000px"
        spacing={4}
        // mx="auto"
        // direction="column-reverse"
        isInline
        shouldWrapChildren={true}
        flexWrap="wrap"
        rounded="md"
      >
        {customs.map((item) => {
          return (
            <>
              <Box width="100%">
                <Flex
                  direction="column"
                  justifyContent="space-between"
                  pos="relative"
                  key={item.id}
                  flex="1"
                  h="200px"
                  // border="1px"

                  p={3}
                  bg="#fff"
                  rounded="md"
                  shadow="lg"
                  // onMouseEnter={() => handleHover(item)}
                  // onMouseLeave={() => handleMouseLeave()}
                >
                  <Box>
                    <Heading fontSize="20px" color="myBlue">
                      {item.element.title}
                    </Heading>
                    <Divider></Divider>
             

                    <Box minH="" py="10px" className="bloc">
                      {item.element.description}
                    </Box>
                  </Box>
                  <Flex justifyContent="center">
                    <Link to={`/custom/single/${item.element_id}`}>
                      <Button mx="auto" onClick={handleClick} bg="myYellow">
                        View
                      </Button>
                    </Link>
                  </Flex>

               

                  {showCode === item.element.id && (
                    <Box
                      zIndex="2"
                      w="80%"
                      pos="absolute"
                      p={5}
                      bg="#011627"
                      rounded="md"
                      shadow="xl"
                      color="#FFF"
                      mb={5}
                      h="70%"
                      top="-20%"
                      right="-20%"
                    >
               
                      <Text pl={2} pr="50px" overflowWrap>
                        {item.element.code}
                      </Text>
                    </Box>
                  )}

                 
                </Flex>
              </Box>
            </>
          );
        })}
      </Stack> */}
    </Stack>
  );
};

export default SingleCustom;
