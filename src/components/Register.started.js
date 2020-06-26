import React from "react";
import { Stack, Box, Text } from "@chakra-ui/core";
import illus1 from "./../images/Back-ground/testing-default.svg";
import Register from "./Register";

export const RegisterStarted = (props) => {
  const { handleSubmit, loadindSignUp } = props;
  return (
    <>
      <Box
        flex="1"
        // borderRight="1px"

        borderColor="#000"
        py="30px"
        px="50px"
        roundedLeft="lg"
        w="100%"
      >
        <Register handleSubmit={handleSubmit} loadindSignUp={loadindSignUp} />
      </Box>
      <Box roundedRight="lg" px="10px" align="center">
        <Box>
          <Text
            textAlign="center"
            fontSize="30px"
            mb={4}
            fontWeight="600"
            lineHeight="60px"
            color="#000"
            minW="50%"
          >
            For better exeprience proceed for register
          </Text>
        </Box>
        <Box
          // borderWidth="4px"
          bgImage={`url('${illus1}')`}
          bgPos="center"
          bgSize="60%"
          bgRepeat="no-repeat"
          h="100%"
          w="100%"
        ></Box>
      </Box>
    </>
  );
};
