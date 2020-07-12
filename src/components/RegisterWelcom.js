import React from "react";
import { Box, Text, Heading } from "@chakra-ui/core";
import illus1 from "./../images/Back-ground/robot-illustration.svg";

const RegisterWelcom = () => {
  return (
    <>
      <Box
        // borderRight="1px"

        borderColor="#000"
        py="30px"
        px="50px"
        roundedLeft="lg"
        color="#777777"
        fontWeight="600"
        lineHeight="30px"
        w="50%"
      >
        <Heading color="#0297e0">
          {" "}
          Welcom {localStorage.getItem("name")}
        </Heading>
        <Text
          textAlign="left"
          fontSize="15px"
          my={4}
          fontWeight="600"
          lineHeight="30px"
          mb="200px"
        >
          Thank your for joining us . now we will create the first{" "}
          <Box as="span" color="#ff9e00" mr={2} textTransform="uppercase">
            code element
          </Box>
          for your App
        </Text>
        <Text textAlign="left" fontSize="30px" my={4} color="#0297e0">
          Go for next step please.
        </Text>

        {/* <Register handleSubmit={handleSubmit} /> */}
      </Box>
      <Box roundedRight="lg" px="10px" align="center" w="50%">
        <Box>
          {/* <Text
            textAlign="center"
            fontSize="30px"
            mb={4}
            p="50px"
            fontWeight="600"
            lineHeight="60px"
            color="#000"
         
          ></Text> */}
        </Box>
        <Box
          p={3}
          bgImage={`url('${illus1}')`}
          bgPos="center"
          bgSize="80%"
          bgRepeat="no-repeat"
          h="100%"
          w="100%"
        ></Box>
      </Box>
    </>
  );
};
export default RegisterWelcom;
