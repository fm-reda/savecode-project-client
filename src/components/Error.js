import React from "react";
import { Stack, Box, Heading, Text, Button, Flex } from "@chakra-ui/core";
import bgImage from "./../images/Back-ground/15.png";
import { Link } from "react-router-dom";

export const Error = () => {
  return (
    <Flex isInline align="center" justify="center">
      <Box mt="120px" p="100px">
        <Heading as="h1" fontSize="80px" mb={5}>
          Whooops!
        </Heading>
        <Text color="gray.500" p={2} mb={5}>
          Sorry, the page your are looking for doesn't exist
        </Text>
        <Link to="/">
          <Button bg="orange.600" color="#FFF" rounded="lg" variantColor="red">
            Go Home
          </Button>
        </Link>
      </Box>
      <Box
        bgImage={`url('${bgImage}')`}
        bgPos="center"
        bgSize="100%"
        bgRepeat="no-repeat"
        w="50%"
        bg=""
        h="800px"
        p={5}
      ></Box>
      {/* <Box
        bgImage={`url('${bgImage}')`}
        bgPos="center"
        bgRepeat="no-repeat"
        w="100%"
        h="100vh"
        mt="50px"
        shadow="md"
        p={5}
        mx="auto"
        borderWidth="1px"
        rounded="md"
        align="center"
      >
        ;<Heading mb={5}>Oops!!</Heading>
        <Text>Page note found 404</Text>
      </Box> */}
    </Flex>
  );
};
