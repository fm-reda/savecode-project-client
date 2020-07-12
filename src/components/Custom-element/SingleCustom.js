import React, { useState } from "react";
import {
  Stack,
  Box,
  Heading,
  Flex,
  Text,
  Divider,
  Button,
} from "@chakra-ui/core";
import { useEffect } from "react";
import { customBycategory } from "./CustomFunctions";
import "./../../App.css";

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
    console.log("clicked");
  };
  return (
    <Stack ml="15%" mt="4%" p={5} bg="bgGray" h="100vh" className="">
      <Box
        p={3}
        // mx="auto"
        // h="150px"
        // bg="#000"
        // bg="laravel"
        // w="110%"
        // ml="-20px"
        // mt="-25px"
        color="#000"
      >
        <Heading fontSize="40px" textTransform="uppercase">
          Category : {category}
        </Heading>
        <Heading color="myYellow">{subCategory}</Heading>
      </Box>
      <Divider borderColor="red"></Divider>
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
        ml="100px"
        maxWidth="3000px"
        spacing={4}
        // mx="auto"
        isInline
        shouldWrapChildren={true}
        flexWrap="wrap"
      >
        {customs.map((item) => {
          return (
            <>
              <Box
                pos="relative"
                key={item.id}
                w="450px"
                h="200px"
                // border="1px"
                m={5}
                p={3}
                bg="#fff"
                rounded="md"
                shadow="lg"
                // onMouseEnter={() => handleHover(item)}
                // onMouseLeave={() => handleMouseLeave()}
              >
                <Heading fontSize="20px" color="myBlue">
                  {item.element.title}
                </Heading>
                <Divider></Divider>
                {/* <Heading fontSize="15px" color="myYellow">
                  Description
                </Heading> */}

                <Text minH="50%" py="10px">
                  {item.element.description}
                </Text>
                <Flex>
                  <Button mx="auto" onClick={handleClick} bg="myYellow">
                    View
                  </Button>
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
                    {/* <Button
                    variantColor="teal"
                    size="xs"
                    pos="absolute"
                    top="10px"
                    right="10px"
                  >
                    Copy
                  </Button> */}
                    <Text pl={2} pr="50px" overflowWrap>
                      {item.element.code}
                    </Text>
                  </Box>
                )}

                {/* <Text>{item.element.code}</Text> */}
              </Box>
            </>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default SingleCustom;
