import React from "react";

import { profile } from "./UserFunctions";
import {
  Stack,
  Box,
  Text,
  Button,
  ButtonGroup,
  Heading,
  Flex,
} from "@chakra-ui/core";

import illus1 from "./../images/Back-ground/journey-laravel.svg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../App.css";
const MotionBox = motion.custom(Box);
function Landing(props) {
  const { loggedInStatus } = props;
  // console.log(loggedInStatus);
  const handleClick = () => {
    // localStorage.removeItem("userToken");
    // console.log(localStorage);

    // console.log(localStorage);
    profile().then((res) => {
      //   console.log(res);
    });
    // console.log("test");

    // localStorage.setItem("chef", param);
  };

  return (
    <>
      <Stack spacing={3} className="bg-started">
        {/* //container */}
        <Box
          mt="120px"
          width="1450px"
          mx="auto"

          //  borderWidth="1px"
        >
          <Flex align="center" justify="space-between" mb="150px">
            {/*first Element*/}
            <Box
              bgImage={`url('${illus1}')`}
              bgPos="center"
              bgSize="60%"
              bgRepeat="no-repeat"
              p={5}
              fontSize="50px"
              color="white"
              mr="50px"
              // shadow="md"
              // bg="dandelion.100"
              // borderWidth="1px"
              h="500px"
              w="100%"
            ></Box>
            <Box>
              <Text
                fontSize="40px"
                mb={4}
                color="#FFF"
                px="30px"
                textAlign="left"
                fontWeight="600"
                lineHeight="60px"
              >
                Savecode helps to save your search, and make a component for
                later use
              </Text>
              <Link to="/get-started">
                <Button
                  color="#fff"
                  p="25px"
                  rounded="50px"
                  w="25%"
                  size="lg"
                  m="30px"
                  bg="#ff9e00"
                  variantColor="teal"
                  textAlign="left"
                  _hover={{ bg: "#967090", color: " #FFF" }}
                >
                  Get started
                </Button>
              </Link>
            </Box>
            {/*illustration*/}
          </Flex>
          <Stack bg="#FFF" spacing={15} mb="100px" rounded="lg" boxShadow="lg">
            <Flex h="400px" p="50px">
              <Box flex="1">
                <Heading fontSize="25px" h="70px" color="#308c77">
                  Element code
                </Heading>
                <Box
                  w="70%"
                  pos="relative"
                  p={5}
                  bg="#011627"
                  rounded="md"
                  shadow="xl"
                  color="#FFF"
                  mb={5}
                  h="50%"
                >
                  <Button
                    variantColor="teal"
                    size="xs"
                    pos="absolute"
                    top="10px"
                    right="10px"
                  >
                    Copy
                  </Button>
                  <Text pl={2} pr="50px" overflowWrap>
                    $ git remote origin add
                  </Text>
                </Box>
              </Box>
              <Box flex="1">
                <Heading fontSize="35px" h="70px" color="#308c77">
                  Fastest search of your favorite code
                </Heading>
                <Text fontSize="20px">
                  SaveCode help your to collect your search by creating
                  component in your library and faster copy past in your project
                </Text>
              </Box>
            </Flex>

            {/**********************************************************************third Element*/}
          </Stack>
          <Stack
            bg="#FFF"
            isInline
            rounded="lg"
            spacing={15}
            mb={5}
            p={5}
            shadow="lg"
            color="#000"
          >
            {" "}
            {/*************************************************************************second Element*/}
            <Box flex="1">
              <Heading my={2} p={5} fontSize="25px" h="70px" color="#308c77">
                Build apps fast
              </Heading>
              <Text p={5}>
                SaveCode gives you functionality like manage your search ,
                editing your elements in your library.
              </Text>
            </Box>
            <Box flex="1">
              <Heading my={2} p={5} fontSize="25px" h="70px" color="#308c77">
                One platform, with products that work better together
              </Heading>
              <Text p={5}>
                Firebase products work great individually but share data and ,
                so they work even better together.
              </Text>
            </Box>
            <Box
              // size="40px"

              flex="1"
            >
              <Heading mt={3} p={5} fontSize="25px" h="70px" color="#308c77">
                Trusted by top apps
              </Heading>
              <Text p={5}>many partener trust us.</Text>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}

export default Landing;
