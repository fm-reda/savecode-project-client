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
    <Stack spacing={3} className="bg-started">
      {/* //container */}
      <Box
        mt="120px"
        width="1250px"
        mx="auto"
        pos="relative"
        //  borderWidth="1px"
      >
        <Flex align="center" justify="space-between" >
          {" "}
          {/*first Element*/}
          <Box
            bgImage={`url('${illus1}')`}
            bgPos="center"
            bgSize="70%"
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
              color="white"
              px="30px"
              textAlign="left"
              fontWeight="600"
              lineHeight="60px"
            >
              Savecode helps to save your search, and make a component for later
              use
            </Text>
            <Link to="/get-started">
              <Button
                p="25px"
                rounded="50px"
                w="30%"
                size="lg"
                mx="80px"
                bg="#FFF"
                variantColor="teal"
                variant="teal"
                textAlign="left"
                _hover={{ bg: "#b5626b", color: " #FFF" }}
              >
                Get started
              </Button>
            </Link>
          </Box>
          {/*illustration*/}
        </Flex>
        <Stack bg="#FFF" isInline rounded="lg" spacing={15} mb={5}>
          {" "}
          {/*************************************************************************second Element*/}
          <MotionBox
            // size="40px"
            bg="red.300"
            // drag="x"
            drag="x"
            dragConstraints={{ left: -400, right: 400 }}
            // drag1Constraints={{ left: -500, right: 500, }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            bg="#eff"
            m={5}
            borderWidth="1px"
            flex="1"
          >
            <Heading mt={3} p={5} fontSize="25px">
              Build apps fast, without managing infrastructure
            </Heading>
            <Text p={5} color="Teal">
              Firebase gives you functionality like analytics, databases,
              messaging and crash reporting so you can move quickly and focus on
              your users.
            </Text>
          </MotionBox>
          <MotionBox
            // size="40px"
            bg="red.300"
            // drag="x"
            drag="x"
            dragConstraints={{ left: -400, right: 400 }}
            // drag1Constraints={{ left: -500, right: 500, }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            bg="#eff"
            m={5}
            borderWidth="1px"
            flex="1"
          >
            <Heading mt={3} p={5} fontSize="25px">
              Build apps fast, without managing infrastructure
            </Heading>
            <Text p={5} color="Teal">
              Firebase gives you functionality like analytics, databases,
              messaging and crash reporting so you can move quickly and focus on
              your users.
            </Text>
          </MotionBox>
          <MotionBox
            // size="40px"
            bg="red.300"
            // drag="x"
            drag="x"
            dragConstraints={{ left: -400, right: 400 }}
            // drag1Constraints={{ left: -500, right: 500, }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            bg="#eff"
            m={5}
            borderWidth="1px"
            flex="1"
          >
            <Heading mt={3} p={5} fontSize="25px">
              Build apps fast, without managing infrastructure
            </Heading>
            <Text p={5} color="Teal">
              Firebase gives you functionality like analytics, databases,
              messaging and crash reporting so you can move quickly and focus on
              your users.
            </Text>
          </MotionBox>
        </Stack>
      </Box>
      <Stack bg="#FFF" spacing={15} mb={5}>
        <Box h="400px" bg="#FFF">
          <Text>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
            suscipit, maiores repudiandae voluptas magni officiis ut ab ipsa ea,
            expedita veniam quisquam iusto officia soluta aspernatur ullam
            dignissimos esse velit!
          </Text>
        </Box>

        {/**********************************************************************third Element*/}
      </Stack>
    </Stack>
  );
}

export default Landing;
