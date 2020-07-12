import React from "react";
import { Stack, Box, Text } from "@chakra-ui/core";
import illus1 from "./../images/illustration/register1.svg";
import Register from "./Register";

export const RegisterStarted = (props) => {
  const { loadindSignUp } = props;
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
        <Register loadindSignUp={loadindSignUp} />
      </Box>
      <Box roundedRight="lg" px="10px" align="center" mt="25px">
        <Box>
          <Text
            textAlign="center"
            fontSize="30px"
            fontWeight="600"
            lineHeight="60px"
            color="#000"
            mb={5}
            minW="50%"
          >
            For better experience proceed for register
          </Text>
        </Box>
        <Box
          // bg="#fff"
          // borderWidth="4px"
          bgImage={`url('${illus1}')`}
          bgPos="center"
          bgSize="150%"
          bgRepeat="no-repeat"
          h="50%"
          w="100%"
        ></Box>
      </Box>
    </>
  );
};
